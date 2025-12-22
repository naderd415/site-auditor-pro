import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Search, Globe, Moon, Sun } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const languages = [
    { code: 'ar' as const, name: 'العربية' },
    { code: 'en' as const, name: 'English' },
    { code: 'fr' as const, name: 'Français' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold gradient-text">Best Tools Hub</h1>
          
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
              >
                {lang.name}
              </Button>
            ))}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            {t.hero.title}
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${dir === 'rtl' ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              placeholder={t.hero.searchPlaceholder}
              className={`w-full h-12 rounded-full bg-background text-foreground ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} focus:outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="container py-4">
        <div className="ad-space-horizontal">{t.ads.placeholder}</div>
      </div>

      {/* Categories */}
      <section className="container py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {Object.entries(t.categories).map(([key, value]) => (
            <Button key={key} variant={key === 'all' ? 'default' : 'outline'} className="rounded-full">
              {value}
            </Button>
          ))}
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(t.tools).slice(0, 8).map(([key, tool]) => (
            <div key={key} className="tool-card">
              <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
              <p className="text-muted-foreground text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space */}
      <div className="container py-4">
        <div className="ad-space-horizontal">{t.ads.placeholder}</div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Best Tools Hub. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
