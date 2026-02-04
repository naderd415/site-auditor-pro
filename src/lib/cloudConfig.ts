// Cloud Configuration System - Stores settings in Supabase for global access
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SiteConfig, defaultConfig } from './siteConfig';

const CONFIG_ID = 'main';

// Fallback values for production environments
const FALLBACK_BACKEND_URL = "https://vqvjtyhzwynabivlgrvb.supabase.co";
const FALLBACK_BACKEND_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmp0eWh6d3luYWJpdmxncnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzQ0MDAsImV4cCI6MjA4MjE1MDQwMH0.gicKNWV_x5tWlRe4ne9suIiySGoc9V-jreXkOES0eoQ";

// Get Supabase client with fallback support
function getCloudClient(): SupabaseClient | null {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_BACKEND_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
                import.meta.env.VITE_SUPABASE_ANON_KEY || 
                FALLBACK_BACKEND_KEY;
    
    if (!url || !key) {
      console.warn('[CloudConfig] No backend configuration available');
      return null;
    }
    
    return createClient(url, key);
  } catch (e) {
    console.error('[CloudConfig] Failed to create client:', e);
    return null;
  }
}

// Cache for config to avoid constant DB calls
let configCache: SiteConfig | null = null;
let lastFetch: number = 0;
const CACHE_TTL = 5000; // 5 seconds

// Fetch config from Supabase
export const fetchCloudConfig = async (): Promise<SiteConfig> => {
  // Check cache first
  if (configCache && Date.now() - lastFetch < CACHE_TTL) {
    return configCache;
  }

  const client = getCloudClient();
  if (!client) {
    console.warn('[CloudConfig] No client available, using local config');
    return getLocalConfig();
  }

  try {
    const { data, error } = await client
      .from('site_config')
      .select('config')
      .eq('id', CONFIG_ID)
      .maybeSingle();

    if (error) {
      console.warn('[CloudConfig] Error fetching config:', error.message);
      // Fall back to localStorage
      return getLocalConfig();
    }

    if (data?.config && typeof data.config === 'object') {
      const cloudData = data.config as Record<string, unknown>;
      configCache = { ...defaultConfig, ...cloudData } as SiteConfig;
      lastFetch = Date.now();
      return configCache;
    }
  } catch (e) {
    console.error('[CloudConfig] Fetch error:', e);
  }

  return getLocalConfig();
};

// Save config to Supabase (upsert)
export const saveCloudConfig = async (config: SiteConfig): Promise<boolean> => {
  const client = getCloudClient();
  if (!client) {
    console.warn('[CloudConfig] No client available, saving locally only');
    saveLocalConfig(config);
    return false;
  }

  try {
    // First try to update
    const { error: updateError } = await client
      .from('site_config')
      .update({ config: config as any })
      .eq('id', CONFIG_ID);

    if (updateError) {
      // If update fails, try insert
      const { error: insertError } = await client
        .from('site_config')
        .insert({ id: CONFIG_ID, config: config as any });

      if (insertError) {
        console.error('[CloudConfig] Save error:', insertError.message);
        // Fall back to localStorage
        saveLocalConfig(config);
        return false;
      }
    }

    // Update cache
    configCache = config;
    lastFetch = Date.now();

    // Also save to localStorage as backup
    saveLocalConfig(config);

    return true;
  } catch (e) {
    console.error('[CloudConfig] Save error:', e);
    saveLocalConfig(config);
    return false;
  }
};

// Local storage fallbacks
const CONFIG_KEY = 'bth_site_config';

const getLocalConfig = (): SiteConfig => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      return { ...defaultConfig, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('[CloudConfig] Error loading local config:', e);
  }
  return defaultConfig;
};

const saveLocalConfig = (config: SiteConfig): void => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('[CloudConfig] Error saving local config:', e);
  }
};

// Clear cache (useful when you know config changed)
export const clearConfigCache = (): void => {
  configCache = null;
  lastFetch = 0;
};

// Subscribe to config changes (real-time)
export const subscribeToConfigChanges = (callback: (config: SiteConfig) => void) => {
  const client = getCloudClient();
  if (!client) {
    console.warn('[CloudConfig] No client available for real-time subscription');
    return () => {}; // Return empty cleanup function
  }

  const channel = client
    .channel('site_config_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'site_config',
        filter: `id=eq.${CONFIG_ID}`
      },
      (payload) => {
        if (payload.new && (payload.new as any).config) {
          const newConfig = { ...defaultConfig, ...(payload.new as any).config } as SiteConfig;
          configCache = newConfig;
          lastFetch = Date.now();
          callback(newConfig);
        }
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
};
