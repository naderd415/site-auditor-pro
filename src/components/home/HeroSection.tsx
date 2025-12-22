import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // AI search will be implemented with Lovable Cloud
    onSearch?.(searchQuery);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-foreground">Your Ultimate </span>
            <span className="text-neon-cyan">Digital Toolkit.</span>
            <br />
            <span className="text-foreground">Effortless. Secure. </span>
            <span className="text-neon-green">Free.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>

          {/* Search Box with AI */}
          <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-2 rounded-2xl glow-cyan">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder={t.hero.searchPlaceholder}
                    className="w-full bg-muted/50 border-0 rounded-xl ps-12 pe-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="btn-primary flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.hero.cta}</span>
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
