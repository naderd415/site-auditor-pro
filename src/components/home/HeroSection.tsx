import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Search, Sparkles, Send, ArrowRight } from 'lucide-react';
import { smartSearch } from '@/utils/smartSearch';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<ReturnType<typeof smartSearch> | null>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleSmartSearch = () => {
    if (!searchQuery.trim()) return;
    
    const result = smartSearch(searchQuery, isRTL);
    setSearchResult(result);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSmartSearch();
    }
  };

  const handleToolClick = () => {
    if (searchResult?.toolPath) {
      navigate(searchResult.toolPath);
    }
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

          {/* Smart Search Badge */}
          <div className="flex justify-center mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {isRTL ? 'البحث الذكي' : 'Smart Search'}
              </span>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="ai-search-box p-1 rounded-2xl">
              <div className="relative flex items-center gap-2 bg-background/80 backdrop-blur-xl rounded-xl p-1">
                <div className="flex-1 relative">
                  <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isRTL ? 'ابحث عن أي أداة...' : 'Search for any tool...'}
                    className="w-full bg-transparent border-0 rounded-lg ps-12 pe-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSmartSearch}
                  disabled={!searchQuery.trim()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Smart Search Badge */}
            <div className="flex justify-center mt-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>{isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}</span>
              </div>
            </div>
          </div>

          {/* Search Result */}
          {searchResult && (
            <div className="mt-6 max-w-xl mx-auto animate-fade-in">
              <div className="glass-card p-4 rounded-xl text-start border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {isRTL ? 'نتيجة البحث' : 'Search Result'}
                  </span>
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-3">
                  {searchResult.response}
                </p>
                {searchResult.toolPath && (
                  <button
                    onClick={handleToolClick}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    {searchResult.toolName}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
