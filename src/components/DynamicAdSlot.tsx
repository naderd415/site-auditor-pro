import { useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/siteConfig';
import { useLanguage } from '@/lib/i18n';
import { validateAdCode } from '@/lib/adCodeValidator';

interface DynamicAdSlotProps {
  type: 'header' | 'sidebar' | 'footer' | 'inContent';
  className?: string;
}

export function DynamicAdSlot({ type, className = '' }: DynamicAdSlotProps) {
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [adCode, setAdCode] = useState('');
  const [shouldLoad, setShouldLoad] = useState(false);
  const [validationError, setValidationError] = useState('');

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
      
      // Validate ad code before setting
      const validation = validateAdCode(code);
      if (validation.isValid) {
        setAdCode(code);
        setValidationError('');
      } else {
        setAdCode('');
        setValidationError(validation.error || 'Invalid ad code');
        console.warn(`[DynamicAdSlot] Blocked invalid ad code for ${type}:`, validation.error);
      }
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
    
    // Execute only external scripts from validated trusted domains
    // Note: Inline scripts are already blocked by adCodeValidator
    const scripts = wrapper.querySelectorAll('script[src]');
    const scriptsToAppend: HTMLScriptElement[] = [];
    
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      
      // Copy attributes only
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Do NOT copy textContent - we only execute external scripts
      
      // Remove original script from wrapper
      script.remove();
      
      // Store script for later appending
      scriptsToAppend.push(newScript);
    });
    
    // Append the content first
    if (wrapper.innerHTML) {
      container.appendChild(wrapper);
    }
    
    // Then append external scripts
    scriptsToAppend.forEach(script => {
      container.appendChild(script);
    });
  }, [adCode]);

  // Log validation errors but don't show UI error
  if (validationError) {
    console.error(`[DynamicAdSlot ${type}] Validation error:`, validationError);
    return null;
  }

  // Show placeholder while loading for CLS prevention
  if (!adCode) {
    return (
      <div className={`my-4 ${className}`}>
        <div className="text-center mb-1">
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-muted-foreground/50 bg-muted/30 rounded-full">
            {isRTL ? 'مساحة إعلانية' : 'Ad Space'}
          </span>
        </div>
        <div 
          className={`flex justify-center items-center mx-auto rounded-lg overflow-hidden border border-dashed border-border/50 bg-muted/10 ${sizeClasses[type]}`}
          style={{ maxWidth: '100%' }}
        >
          <span className="text-xs text-muted-foreground/40">
            {isRTL ? 'قم بتكوين الإعلانات من لوحة الأدمن' : 'Configure ads in Admin panel'}
          </span>
        </div>
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
