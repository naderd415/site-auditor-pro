import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

interface AdsterraBannerProps {
  className?: string;
}

export function AdsterraBanner({ className = '' }: AdsterraBannerProps) {
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Delayed loading - wait 5 seconds or first scroll
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
    // Only inject after delay/scroll and once
    if (!shouldLoad || scriptLoaded.current || !containerRef.current) return;

    const container = containerRef.current;
    const adContainer = document.createElement('div');
    adContainer.id = 'container-211c84be1763d6af2ae9730074655855';
    container.appendChild(adContainer);

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl28380371.effectivegatecpm.com/211c84be1763d6af2ae9730074655855/invoke.js';
    container.appendChild(script);

    scriptLoaded.current = true;

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [shouldLoad]);

  return (
    <div className={`my-6 ${className}`}>
      <div className="text-center">
        <span className="inline-block px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50 rounded-full mb-2">
          {isRTL ? 'مُوصى به' : 'Sponsored'}
        </span>
      </div>
      <div 
        ref={containerRef}
        className="flex justify-center items-center min-h-[100px] max-w-full overflow-hidden rounded-lg"
      />
    </div>
  );
}
