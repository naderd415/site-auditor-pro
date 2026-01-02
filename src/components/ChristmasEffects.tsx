import { useEffect, useState } from 'react';
import { getConfig } from '@/lib/siteConfig';

export function ChristmasEffects() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    const checkChristmasMode = () => {
      const config = getConfig();
      setIsEnabled(config.christmasMode);
    };
    
    checkChristmasMode();
    
    // Check periodically for config changes
    const interval = setInterval(checkChristmasMode, 1000);
    return () => clearInterval(interval);
  }, []);
  
  if (!isEnabled) return null;
  
  return (
    <>
      {/* Snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <span 
              className="text-white/70"
              style={{
                fontSize: `${8 + Math.random() * 14}px`,
                filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))'
              }}
            >
              ❄
            </span>
          </div>
        ))}
      </div>
      
      {/* Corner Decorations - Smaller and less intrusive */}
      <div className="fixed top-16 start-3 text-2xl sm:text-3xl animate-bounce pointer-events-none z-40" style={{ animationDuration: '2s' }}>
        🎄
      </div>
      <div className="fixed top-16 end-3 text-2xl sm:text-3xl animate-bounce pointer-events-none z-40" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
        🎅
      </div>
      <div className="fixed bottom-20 start-3 text-xl sm:text-2xl animate-pulse pointer-events-none z-40">
        ⛄
      </div>
      <div className="fixed bottom-20 end-3 text-xl sm:text-2xl animate-pulse pointer-events-none z-40" style={{ animationDelay: '1s' }}>
        🎁
      </div>
    </>
  );
}
