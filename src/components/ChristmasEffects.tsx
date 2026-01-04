import { useEffect, useState, memo } from 'react';
import { getConfig } from '@/lib/siteConfig';

// Memoized snowflake for better performance
const Snowflake = memo(({ delay, duration, left, size }: { delay: number; duration: number; left: number; size: number }) => (
  <div
    className="absolute animate-snowfall will-change-transform"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      transform: 'translateZ(0)', // GPU acceleration
    }}
  >
    <span 
      className="text-white/70"
      style={{
        fontSize: `${size}px`,
        filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))'
      }}
    >
      ❄
    </span>
  </div>
));

Snowflake.displayName = 'Snowflake';

// Pre-generate snowflake positions for consistency
const snowflakes = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 10,
  size: 8 + Math.random() * 14,
}));

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
      {/* Snowflakes - GPU accelerated */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden will-change-transform">
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            left={flake.left}
            delay={flake.delay}
            duration={flake.duration}
            size={flake.size}
          />
        ))}
      </div>
      
      {/* Corner Decorations - Smaller and less intrusive with GPU acceleration */}
      <div 
        className="fixed top-16 start-3 text-2xl sm:text-3xl animate-bounce pointer-events-none z-40 will-change-transform" 
        style={{ animationDuration: '2s', transform: 'translateZ(0)' }}
      >
        🎄
      </div>
      <div 
        className="fixed top-16 end-3 text-2xl sm:text-3xl animate-bounce pointer-events-none z-40 will-change-transform" 
        style={{ animationDelay: '0.5s', animationDuration: '2s', transform: 'translateZ(0)' }}
      >
        🎅
      </div>
      <div 
        className="fixed bottom-20 start-3 text-xl sm:text-2xl animate-pulse pointer-events-none z-40 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        ⛄
      </div>
      <div 
        className="fixed bottom-20 end-3 text-xl sm:text-2xl animate-pulse pointer-events-none z-40 will-change-transform" 
        style={{ animationDelay: '1s', transform: 'translateZ(0)' }}
      >
        🎁
      </div>
    </>
  );
}
