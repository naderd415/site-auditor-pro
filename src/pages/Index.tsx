import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ToolsGrid } from '@/components/home/ToolsGrid';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          <HeroSection />

          <div className="container mx-auto px-4 mb-8">
            <AdSpace type="horizontal" />
          </div>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
              </div>
              <ToolsGrid category={selectedCategory as any} />
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdSpace type="horizontal" />
          </div>

          <FeaturesSection />

          <section className="relative z-10 py-16">
            <div className="container mx-auto px-4">
              <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {isRTL ? 'مهمتنا' : 'Our Mission'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {isRTL 
                    ? 'نؤمن بأن الجميع يستحق الوصول إلى أدوات احترافية مجانية. ملفاتك لا تغادر جهازك أبداً.'
                    : 'We believe everyone deserves access to professional free tools. Your files never leave your device.'}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdSpace type="horizontal" />
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Index;