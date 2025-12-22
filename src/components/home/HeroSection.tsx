import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <section className="relative z-10 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
            <span className="text-foreground">{isRTL ? 'مجموعتك الرقمية المثالية.' : 'Your Ultimate Digital Toolkit.'}</span>
            <br />
            <span className="text-foreground">{isRTL ? 'سهلة. آمنة. ' : 'Effortless. Secure. '}</span>
            <span className="text-neon-green">{isRTL ? 'مجانية.' : 'Free.'}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-2 rounded-xl">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full bg-muted/50 border-0 rounded-lg ps-12 pe-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
