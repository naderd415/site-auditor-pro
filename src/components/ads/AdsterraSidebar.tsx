import { useEffect, useRef, useState } from 'react';
import { useCloudConfig } from '@/hooks/useCloudConfig';

export function AdsterraSidebar({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { config, isLoading } = useCloudConfig();

  // Get enabled state from cloud config - default to FALSE
  const isEnabled = config.ads?.adsterraSidebarEnabled === true;

  // Delayed loading - wait 4 seconds or first scroll
  useEffect(() => {
    if (!isEnabled) return;
    
    const timer = setTimeout(() => setShouldLoad(true), 4000);
    
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
    
    // Set atOptions on window
    (window as any).atOptions = {
      'key': '8b0e1dd08124380543b4fdc9051f7a05',
      'format': 'iframe',
      'height': 250,
      'width': 300,
      'params': {}
    };

    // Create and append the script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.highperformanceformat.com/8b0e1dd08124380543b4fdc9051f7a05/invoke.js';
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
    <div className={`flex justify-center min-h-[250px] min-w-[300px] ${className}`}>
      <div 
        ref={containerRef}
        className="flex justify-center items-center w-[300px] h-[250px] overflow-hidden rounded-lg bg-muted/20"
      />
    </div>
  );
}
