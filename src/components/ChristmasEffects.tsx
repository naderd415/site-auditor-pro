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
        {Array.from({ length: 50 }).map((_, i) => (
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
              className="text-white/80"
              style={{
                fontSize: `${8 + Math.random() * 16}px`,
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
              }}
            >
              ❄
            </span>
          </div>
        ))}
      </div>
      
      {/* Corner Decorations */}
      <div className="fixed top-4 start-4 text-4xl animate-bounce pointer-events-none z-50">
        🎄
      </div>
      <div className="fixed top-4 end-4 text-4xl animate-bounce pointer-events-none z-50" style={{ animationDelay: '0.5s' }}>
        🎅
      </div>
      <div className="fixed bottom-4 start-4 text-3xl animate-pulse pointer-events-none z-50">
        ⛄
      </div>
      <div className="fixed bottom-4 end-4 text-3xl animate-pulse pointer-events-none z-50" style={{ animationDelay: '1s' }}>
        🎁
      </div>
    </>
  );
}
