import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FAQ } from '@/components/FAQ';
import { useLanguage } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, Shield, Zap, Lock } from 'lucide-react';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  article: string;
  keywords: string;
  children: ReactNode;
}

export function ToolPageLayout({ title, description, article, keywords, children }: ToolPageLayoutProps) {
  const { isRTL, t, language } = useLanguage();
  const location = useLocation();
  const currentUrl = `https://besttoolshub.com${location.pathname}`;

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": currentUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": language === 'ar' ? 'ar' : language === 'fr' ? 'fr' : 'en',
    "provider": {
      "@type": "Organization",
      "name": "BestToolsHub",
      "url": "https://besttoolshub.com"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t.nav.home,
        "item": "https://besttoolshub.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t.nav.tools,
        "item": "https://besttoolshub.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": currentUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title} - BestToolsHub</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${title} - BestToolsHub`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BestToolsHub" />
        <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : language === 'fr' ? 'fr_FR' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - BestToolsHub`} />
        <meta name="twitter:description" content={description} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="BestToolsHub" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          {/* Breadcrumb */}
          <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>{isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</li>
              <li>
                <Link to="/tools" className="hover:text-foreground transition-colors">
                  {t.nav.tools}
                </Link>
              </li>
              <li>{isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</li>
              <li>
                <span className="text-foreground" aria-current="page">{title}</span>
              </li>
            </ol>
          </nav>

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

          {/* Top Ad Placeholder */}
          <div className="container mx-auto px-4 mb-8">
            <div id="ad-top" className="min-h-[90px] flex items-center justify-center">
              {/* Google AdSense will be inserted here */}
            </div>
          </div>

          {/* Tool Content */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </div>
          </section>

          {/* Trust Badges */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 rounded-xl text-center">
                    <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-bold text-foreground mb-1">
                      {isRTL ? '100% آمن وخاص' : '100% Safe & Private'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'معالجة في المتصفح - لا رفع بيانات' : 'Browser-side processing - No data upload'}
                    </p>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-bold text-foreground mb-1">
                      {isRTL ? 'سريع ومجاني' : 'Fast & Free'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'بدون تسجيل - بدون قيود' : 'No registration - No limits'}
                    </p>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <Lock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-bold text-foreground mb-1">
                      {isRTL ? 'بدون علامات مائية' : 'No Watermarks'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'نتائج نظيفة واحترافية' : 'Clean, professional results'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Ad Placeholder */}
          <div className="container mx-auto px-4 flex justify-center">
            <div id="ad-sidebar" className="min-h-[250px]">
              {/* Google AdSense will be inserted here */}
            </div>
          </div>

          {/* Bottom Ad Placeholder */}
          <div className="container mx-auto px-4 my-8">
            <div id="ad-bottom" className="min-h-[90px]">
              {/* Google AdSense will be inserted here */}
            </div>
          </div>

          {/* Article Section - SEO Content */}
          <article className="py-12">
            <div className="container mx-auto px-4">
              <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {isRTL ? 'عن هذه الأداة' : language === 'fr' ? 'À Propos de Cet Outil' : 'About This Tool'}
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {article.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Additional SEO Content */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {isRTL ? 'لماذا تختار أداتنا؟' : language === 'fr' ? 'Pourquoi Choisir Notre Outil?' : 'Why Choose Our Tool?'}
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{isRTL ? 'معالجة 100% في المتصفح - بياناتك لا تغادر جهازك أبداً' : '100% browser-based processing - your data never leaves your device'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{isRTL ? 'مجاني تماماً بدون إعلانات مزعجة أو قيود' : 'Completely free with no annoying ads or limitations'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{isRTL ? 'لا حاجة للتسجيل أو تنزيل برامج' : 'No registration or software download required'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{isRTL ? 'يعمل على جميع الأجهزة والمتصفحات' : 'Works on all devices and browsers'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <div className="container mx-auto px-4 my-8">
            <div id="ad-bottom-2" className="min-h-[90px]">
              {/* Google AdSense will be inserted here */}
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />
        </main>

        <Footer />
      </div>
    </>
  );
}
