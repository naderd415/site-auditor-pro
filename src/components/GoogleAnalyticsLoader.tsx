import { useEffect, useRef, useState } from 'react';
import { getConfig, injectGoogleAnalytics, isValidGAId } from '@/lib/siteConfig';
import { useCloudConfig } from '@/hooks/useCloudConfig';

/**
 * GoogleAnalyticsLoader - Loads Google Analytics script if configured
 * This component should be placed once in the app (e.g., in App.tsx)
 * It checks the cloud config for the analytics ID and only injects the script
 * when a valid ID is configured. Respects the admin panel toggle.
 */
export function GoogleAnalyticsLoader() {
  const injected = useRef(false);
  const { config, isLoading } = useCloudConfig();
  const [gaId, setGaId] = useState<string | null>(null);

  useEffect(() => {
    // Wait for cloud config to load
    if (isLoading) return;
    if (injected.current) return;
    
    // Get GA ID from cloud config or local config
    const analyticsId = config?.analytics?.googleId || getConfig().analytics?.googleId;
    
    // Check if Google Analytics ID is configured and valid
    if (analyticsId && isValidGAId(analyticsId.trim())) {
      setGaId(analyticsId.trim());
      injectGoogleAnalytics(analyticsId.trim());
      injected.current = true;
      console.log('[GoogleAnalytics] Script loaded with ID:', analyticsId);
    } else {
      // Remove existing GA scripts if no valid ID
      removeGoogleAnalytics();
    }
  }, [config, isLoading]);

  // This component doesn't render anything
  return null;
}

/**
 * Remove Google Analytics scripts from the document
 */
function removeGoogleAnalytics() {
  const gaScript = document.getElementById('ga-script');
  const gaInlineScript = document.getElementById('ga-inline-script');
  
  if (gaScript) {
    gaScript.remove();
    console.log('[GoogleAnalytics] Script removed');
  }
  if (gaInlineScript) {
    gaInlineScript.remove();
  }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackGAEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

/**
 * Track a page view in Google Analytics
 */
export function trackGAPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', getConfig().analytics?.googleId, {
      page_path: path,
      page_title: title
    });
  }
}
