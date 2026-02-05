import { useEffect, useRef, useState } from 'react';
import { useCloudConfig } from '@/hooks/useCloudConfig';

export function AdsterraTop({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { config, isLoading } = useCloudConfig();

  // Get enabled state from cloud config - default to FALSE
  const isEnabled = config.ads?.adsterraTopEnabled === true;

  // Delayed loading - wait 3 seconds or first scroll
  useEffect(() => {
    if (!isEnabled) return;
    
    const timer = setTimeout(() => setShouldLoad(true), 3000);
    
    const handleScroll = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', handleScroll);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!shouldLoad || scriptLoaded.current || !containerRef.current || !isEnabled) return;

    const container = containerRef.current;
    
    // Create the ad container div
    const adContainer = document.createElement('div');
    adContainer.id = 'container-211c84be1763d6af2ae9730074655855';
    container.appendChild(adContainer);

    // Create and append the script
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
  }, [shouldLoad, isEnabled]);

  // Don't render if disabled or still loading config
  if (isLoading || !isEnabled) return null;

  return (
    <div className={`w-full flex justify-center min-h-[90px] ${className}`}>
      <div 
        ref={containerRef}
        className="flex justify-center items-center w-full max-w-[728px] overflow-hidden"
      />
    </div>
  );
}
