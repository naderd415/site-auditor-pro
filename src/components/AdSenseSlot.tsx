import { useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/siteConfig';

interface AdSlotProps {
  type: 'header' | 'sidebar' | 'footer' | 'inContent';
  className?: string;
  fallbackText?: string;
}

export const AdSlot = ({ type, className = '', fallbackText }: AdSlotProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adCode, setAdCode] = useState<string>('');

  useEffect(() => {
    const config = getConfig();
    let code = '';
    
    switch (type) {
      case 'header':
        code = config.ads.headerAdCode;
        break;
      case 'sidebar':
        code = config.ads.sidebarAdCode;
        break;
      case 'footer':
        code = config.ads.footerAdCode;
        break;
      case 'inContent':
        code = config.ads.inContentAdCode;
        break;
    }
    
    setAdCode(code);
  }, [type]);

  useEffect(() => {
    if (adCode && containerRef.current) {
      containerRef.current.innerHTML = adCode;
      
      // Execute any scripts in the ad code
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        script.parentNode?.replaceChild(newScript, script);
      });
    }
  }, [adCode]);

  if (!adCode) {
    if (fallbackText) {
      return (
        <div className={`ad-space ${className}`}>
          <span className="text-muted-foreground text-sm">{fallbackText}</span>
        </div>
      );
    }
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`ad-slot ad-slot-${type} ${className}`}
    />
  );
};

// Legacy components for backward compatibility
export const HeaderAd = ({ className = '' }: { className?: string }) => (
  <AdSlot type="header" className={`ad-space-horizontal ${className}`} />
);

export const SidebarAd = ({ className = '' }: { className?: string }) => (
  <AdSlot type="sidebar" className={`ad-space-vertical ${className}`} />
);

export const FooterAd = ({ className = '' }: { className?: string }) => (
  <AdSlot type="footer" className={`ad-space-horizontal ${className}`} />
);

export const InContentAd = ({ className = '' }: { className?: string }) => (
  <AdSlot type="inContent" className={`ad-space-square ${className}`} />
);

export default AdSlot;
