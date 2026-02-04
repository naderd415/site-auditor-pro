// Hook for using cloud-stored configuration
import { useState, useEffect, useCallback } from 'react';
import { SiteConfig, defaultConfig } from '@/lib/siteConfig';
import { fetchCloudConfig, saveCloudConfig, subscribeToConfigChanges, clearConfigCache } from '@/lib/cloudConfig';

interface UseCloudConfigReturn {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  saveConfig: () => Promise<boolean>;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useCloudConfig(): UseCloudConfigReturn {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load config on mount
  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const cloudConfig = await fetchCloudConfig();
        setConfig(cloudConfig);
      } catch (e) {
        setError('Failed to load config');
        console.error('[useCloudConfig] Load error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    const unsubscribe = subscribeToConfigChanges((newConfig) => {
      setConfig(newConfig);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Save config to cloud
  const saveConfig = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      const success = await saveCloudConfig(config);
      if (!success) {
        setError('Failed to save to cloud, saved locally');
      }
      return success;
    } catch (e) {
      setError('Failed to save config');
      console.error('[useCloudConfig] Save error:', e);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [config]);

  // Refresh config from cloud
  const refresh = useCallback(async () => {
    clearConfigCache();
    setIsLoading(true);
    try {
      const cloudConfig = await fetchCloudConfig();
      setConfig(cloudConfig);
    } catch (e) {
      console.error('[useCloudConfig] Refresh error:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    config,
    setConfig,
    saveConfig,
    isLoading,
    isSaving,
    error,
    refresh
  };
}
