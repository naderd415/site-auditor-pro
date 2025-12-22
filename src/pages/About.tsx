import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { Shield, Zap, Globe, Heart, Users, Award } from 'lucide-react';

const About = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: isRTL ? 'آمن 100%' : '100% Secure',
      description: isRTL 
        ? 'جميع العمليات تتم محلياً على جهازك. ملفاتك لا تُرفع على أي سيرفر.'
        : 'All processing happens locally on your device. Your files never leave your computer.',
    },
    {
      icon: Zap,
      title: isRTL ? 'سريع جداً' : 'Lightning Fast',
      description: isRTL
        ? 'أدوات محسّنة للعمل بأقصى سرعة مباشرة من متصفحك.'
        : 'Optimized tools that work at maximum speed directly from your browser.',
    },
    {
      icon: Globe,
      title: isRTL ? 'متعدد اللغات' : 'Multi-language',
      description: isRTL
        ? 'دعم كامل للعربية والإنجليزية والفرنسية.'
        : 'Full support for Arabic, English, and French.',
    },
    {
      icon: Heart,
      title: isRTL ? 'مجاني بالكامل' : 'Completely Free',
      description: isRTL
        ? 'جميع الأدوات مجانية تماماً بدون أي قيود أو اشتراكات.'
        : 'All tools are completely free without any limits or subscriptions.',
    },
    {
      icon: Users,
      title: isRTL ? 'سهل الاستخدام' : 'Easy to Use',
      description: isRTL
        ? 'واجهة بسيطة وسهلة للجميع، لا تحتاج أي خبرة تقنية.'
        : 'Simple and easy interface for everyone, no technical experience needed.',
    },
    {
      icon: Award,
      title: isRTL ? 'جودة عالية' : 'High Quality',
      description: isRTL
        ? 'نتائج احترافية وعالية الجودة في كل أداة.'
        : 'Professional and high-quality results in every tool.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'من نحن - BestToolsHub' : 'About Us - BestToolsHub'}</title>
        <meta name="description" content={isRTL 
          ? 'تعرف على BestToolsHub - منصة أدوات مجانية عبر الإنترنت. جميع الأدوات تعمل من المتصفح مباشرة بأمان كامل.'
          : 'Learn about BestToolsHub - free online tools platform. All tools work directly from your browser with complete security.'
        } />
        <meta name="keywords" content="about, BestToolsHub, free tools, online tools, image converter, PDF tools" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t.about.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.about.description}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mb-12">
            <AdSpace type="horizontal" />
          </div>

          {/* Features Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                {isRTL ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="glass-card p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdSpace type="horizontal" />
          </div>

          {/* Mission Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                  {isRTL ? 'مهمتنا' : 'Our Mission'}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    {isRTL 
                      ? 'نؤمن بأن الجميع يستحق الوصول إلى أدوات احترافية مجانية. لهذا السبب أنشأنا BestToolsHub - منصة شاملة توفر جميع الأدوات التي تحتاجها في مكان واحد.'
                      : 'We believe everyone deserves access to professional free tools. That\'s why we created BestToolsHub - a comprehensive platform that provides all the tools you need in one place.'}
                  </p>
                  <p>
                    {isRTL
                      ? 'جميع أدواتنا تعمل مباشرة من متصفحك، مما يعني أن ملفاتك تبقى على جهازك ولا تُرفع إلى أي سيرفر خارجي. خصوصيتك هي أولويتنا.'
                      : 'All our tools work directly from your browser, meaning your files stay on your device and are never uploaded to any external server. Your privacy is our priority.'}
                  </p>
                  <p>
                    {isRTL
                      ? 'نسعى دائماً لإضافة أدوات جديدة وتحسين الأدوات الحالية لنقدم لك أفضل تجربة ممكنة.'
                      : 'We are always working to add new tools and improve existing ones to give you the best possible experience.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdSpace type="horizontal" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
