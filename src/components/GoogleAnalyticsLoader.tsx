import { useEffect, useRef } from 'react';
import { getConfig, injectGoogleAnalytics, isValidGAId } from '@/lib/siteConfig';

/**
 * GoogleAnalyticsLoader - Loads Google Analytics script if configured
 * This component should be placed once in the app (e.g., in App.tsx or main.tsx)
 */
export function GoogleAnalyticsLoader() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    
    const config = getConfig();
    const gaId = config.analytics?.googleId;
    
    // Check if Google Analytics ID is configured and valid
    if (gaId && isValidGAId(gaId.trim())) {
      injectGoogleAnalytics(gaId.trim());
      injected.current = true;
      console.log('[GoogleAnalytics] Script loaded with ID:', gaId);
    }
  }, []);

  // This component doesn't render anything
  return null;
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
