import { useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/siteConfig';
import { useLanguage } from '@/lib/i18n';

interface DynamicAdSlotProps {
  type: 'header' | 'sidebar' | 'footer' | 'inContent';
  className?: string;
}

export function DynamicAdSlot({ type, className = '' }: DynamicAdSlotProps) {
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [adCode, setAdCode] = useState('');
  const [shouldLoad, setShouldLoad] = useState(false);

  // Fixed sizes to prevent CLS (Cumulative Layout Shift)
  const sizeClasses = {
    header: 'min-h-[90px] max-w-[728px]',
    sidebar: 'min-h-[250px] max-w-[300px]',
    footer: 'min-h-[90px] max-w-[728px]',
    inContent: 'min-h-[250px] max-w-full',
  };

  // Delayed loading - wait 5 seconds or first scroll for better performance
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 5000);
    
    const handleScroll = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', handleScroll);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    
    const loadAdCode = () => {
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
    };

    loadAdCode();
    
    // Check for config changes periodically
    const interval = setInterval(loadAdCode, 2000);
    return () => clearInterval(interval);
  }, [type, shouldLoad]);

  useEffect(() => {
    if (!containerRef.current || !adCode) return;

    const container = containerRef.current;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create a wrapper for the ad
    const wrapper = document.createElement('div');
    wrapper.innerHTML = adCode;
    
    // Execute any scripts in the ad code
    const scripts = wrapper.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      
      // Copy attributes
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Copy content
      newScript.textContent = script.textContent;
      
      // Remove original script
      script.remove();
      
      // Append the rest of the content first
      container.appendChild(wrapper);
      
      // Then append the script
      container.appendChild(newScript);
    });
    
    // If no scripts, just append the content
    if (scripts.length === 0 && wrapper.innerHTML) {
      container.appendChild(wrapper);
    }
  }, [adCode]);

  // Show placeholder while loading for CLS prevention
  if (!adCode) {
    return (
      <div className={`my-4 ${className}`}>
        <div 
          className={`flex justify-center items-center mx-auto rounded-lg overflow-hidden bg-muted/20 ${sizeClasses[type]}`}
          style={{ maxWidth: '100%' }}
        />
      </div>
    );
  }

  return (
    <div className={`my-4 ${className}`}>
      <div className="text-center mb-1">
        <span className="inline-block px-2 py-0.5 text-xs font-medium text-muted-foreground bg-muted/50 rounded-full">
          {isRTL ? 'إعلان' : 'Ad'}
        </span>
      </div>
      <div 
        ref={containerRef}
        className={`flex justify-center items-center mx-auto rounded-lg overflow-hidden ${sizeClasses[type]}`}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}
