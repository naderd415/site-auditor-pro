import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Layers, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t, language, setLanguage } = useLanguage();

  const footerLinks = [
    { href: '/about', label: t.nav.about },
    { href: '/privacy', label: t.nav.privacy },
    { href: '/terms', label: t.nav.terms },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="relative z-10 mt-20">
      <div className="glass-card mx-4 mb-4 rounded-2xl border-none p-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="/assets/logo.png" 
                alt="BestToolsHub" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-bold text-xl text-foreground">
                Best<span className="text-primary">Tools</span>Hub
              </span>
            </Link>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Toggle + GDPR */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="text-xs px-2 py-1 h-7"
                >
                  English
                </Button>
                <Button
                  variant={language === 'ar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('ar')}
                  className="text-xs px-2 py-1 h-7"
                >
                  عربي
                </Button>
                <Button
                  variant={language === 'fr' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('fr')}
                  className="text-xs px-2 py-1 h-7"
                >
                  Français
                </Button>
              </div>
            </div>
            <span className="text-muted-foreground">|</span>
            <Link 
              to="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              GDPR Privacy Policy
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} BestToolsHub. {t.footer.rights}
            </p>
            <p className="text-muted-foreground text-sm">
              {t.footer.madeWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
