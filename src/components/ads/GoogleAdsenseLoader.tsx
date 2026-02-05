import { useEffect, useRef, useState } from 'react';
import { injectGoogleAdsense, isValidAdsenseClientId } from '@/lib/siteConfig';
import { useCloudConfig } from '@/hooks/useCloudConfig';

/**
 * GoogleAdsenseLoader - Loads Google AdSense script if enabled in config
 * This component uses Cloud config for real-time admin control
 */
export function GoogleAdsenseLoader() {
  const { config, isLoading } = useCloudConfig();
  const [injected, setInjected] = useState(false);

  useEffect(() => {
    if (isLoading || injected) return;
    
    // Check if Google AdSense is enabled and has a valid client ID
    if (config.ads?.googleAdsenseEnabled && config.ads?.googleAdsenseClientId) {
      const clientId = config.ads.googleAdsenseClientId.trim();
      
      if (isValidAdsenseClientId(clientId)) {
        injectGoogleAdsense(clientId);
        setInjected(true);
        console.log('[GoogleAdsense] Script loaded with client:', clientId);
      } else {
        console.warn('[GoogleAdsense] Invalid client ID format:', clientId);
      }
    }
  }, [config.ads?.googleAdsenseEnabled, config.ads?.googleAdsenseClientId, isLoading, injected]);

  // This component doesn't render anything
  return null;
}

/**
 * GoogleAdsenseAd - Renders a Google AdSense ad unit
 * Place this component wherever you want to display an ad
 */
interface GoogleAdsenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export function GoogleAdsenseAd({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '' 
}: GoogleAdsenseAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const { config, isLoading } = useCloudConfig();

  useEffect(() => {
    // Only push ad if AdSense is enabled
    if (isLoading || !config.ads?.googleAdsenseEnabled || !config.ads?.googleAdsenseClientId) {
      return;
    }

    // Push ad to adsbygoogle after script loads
    if (!pushed.current && adRef.current) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.error('[GoogleAdsense] Error pushing ad:', e);
      }
    }
  }, [config.ads?.googleAdsenseEnabled, config.ads?.googleAdsenseClientId, isLoading]);
  
  // Don't render if AdSense is disabled or still loading
  if (isLoading || !config.ads?.googleAdsenseEnabled || !config.ads?.googleAdsenseClientId) {
    return null;
  }

  return (
    <div className={`google-adsense-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={config.ads.googleAdsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
