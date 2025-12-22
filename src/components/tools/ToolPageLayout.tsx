import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  article: string;
  keywords: string;
  children: ReactNode;
}

export function ToolPageLayout({ title, description, article, keywords, children }: ToolPageLayoutProps) {
  const { isRTL, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{title} - BestToolsHub</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Link to="/tools" className="hover:text-foreground transition-colors">
                {t.nav.tools}
              </Link>
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="text-foreground">{title}</span>
            </nav>
          </div>

          {/* Tool Header */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mb-8">
            <AdSpace type="horizontal" />
          </div>

          {/* Tool Content */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-8">
            <AdSpace type="horizontal" />
          </div>

          {/* Article Section - SEO Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {isRTL ? 'عن هذه الأداة' : 'About This Tool'}
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="leading-relaxed">{article}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-8">
            <AdSpace type="horizontal" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
