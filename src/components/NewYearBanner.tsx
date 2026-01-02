import { useEffect, useState } from 'react';
import { getConfig } from '@/lib/siteConfig';
import { useLanguage } from '@/lib/i18n';
import { X, PartyPopper, Sparkles } from 'lucide-react';

export function NewYearBanner() {
  const { isRTL } = useLanguage();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
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

  // Trigger confetti once when enabled
  useEffect(() => {
    if (isEnabled && !isDismissed) {
      const hasSeenConfetti = sessionStorage.getItem('newYearConfettiShown');
      if (!hasSeenConfetti) {
        setShowConfetti(true);
        sessionStorage.setItem('newYearConfettiShown', 'true');
        
        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  }, [isEnabled, isDismissed]);
  
  if (!isEnabled || isDismissed) return null;
  
  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            >
              <span 
                style={{
                  display: 'block',
                  width: `${8 + Math.random() * 8}px`,
                  height: `${8 + Math.random() * 8}px`,
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][Math.floor(Math.random() * 8)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-amber-500 via-red-500 to-pink-500 text-white overflow-hidden">
        {/* Animated sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkles
              key={i}
              className="absolute animate-pulse text-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${12 + Math.random() * 12}px`,
                height: `${12 + Math.random() * 12}px`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-3 relative z-10">
          <div className="flex items-center justify-center gap-3 text-center">
            <PartyPopper className="w-6 h-6 animate-bounce hidden sm:block" />
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold animate-glow">
                {isRTL ? '🎉 سنة جديدة سعيدة 2026!' : '🎉 Happy New Year 2026!'}
              </span>
              <span className="text-sm sm:text-base opacity-90">
                {isRTL 
                  ? 'مرحباً بك في عام من الأدوات الأفضل!' 
                  : 'Welcome to a year of better tools!'}
              </span>
            </div>
            <PartyPopper className="w-6 h-6 animate-bounce hidden sm:block" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Dismiss button */}
        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute top-1/2 end-2 sm:end-4 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
