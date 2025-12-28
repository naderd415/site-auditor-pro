import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit, trackUniqueVisitor, getConfig, injectGoogleAnalytics, injectFavicon } from '@/lib/siteConfig';

export const useVisitorTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page visit
    trackVisit(location.pathname);
    
    // Track unique visitor (only once per browser)
    trackUniqueVisitor();
    
    // Load and apply config
    const config = getConfig();
    
    // Inject Google Analytics if configured
    if (config.analytics.googleId) {
      injectGoogleAnalytics(config.analytics.googleId);
    }
    
    // Inject custom favicon if configured
    if (config.siteIdentity.faviconUrl) {
      injectFavicon(config.siteIdentity.faviconUrl);
    }
  }, [location.pathname]);
};

export default useVisitorTracking;
