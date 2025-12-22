import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Layers } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

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
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary-foreground" />
              </div>
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
