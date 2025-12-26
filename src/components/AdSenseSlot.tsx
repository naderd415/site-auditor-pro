import { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSenseSlot({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = ''
}: AdSenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only load ad once
    if (isLoaded.current) return;
    
    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.log('AdSense not loaded:', error);
    }
  }, []);

  // Don't render in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg p-4 text-center ${className}`}>
        <p className="text-xs text-muted-foreground">Ad Space - Slot: {slot}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Pre-configured ad components for different placements
export function HeaderAd() {
  return (
    <AdSenseSlot 
      slot="HEADER_AD_SLOT_ID" // Replace with actual slot ID
      format="horizontal"
      className="w-full max-w-4xl mx-auto my-2"
    />
  );
}

export function SidebarAd() {
  return (
    <AdSenseSlot 
      slot="SIDEBAR_AD_SLOT_ID" // Replace with actual slot ID
      format="vertical"
      className="w-full"
    />
  );
}

export function FooterAd() {
  return (
    <AdSenseSlot 
      slot="FOOTER_AD_SLOT_ID" // Replace with actual slot ID
      format="horizontal"
      className="w-full max-w-4xl mx-auto my-4"
    />
  );
}

export function InContentAd() {
  return (
    <AdSenseSlot 
      slot="IN_CONTENT_AD_SLOT_ID" // Replace with actual slot ID
      format="rectangle"
      className="w-full max-w-md mx-auto my-6"
    />
  );
}
