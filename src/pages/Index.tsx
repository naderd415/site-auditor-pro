import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ToolCard } from '@/components/home/ToolCard';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { allTools } from '@/components/home/ToolsGrid';

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    let tools = selectedCategory === 'all' 
      ? allTools 
      : allTools.filter(tool => tool.category === selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => {
        const name = t.tools[tool.id.replace(/-/g, '') as keyof typeof t.tools] 
          ? (t.tools[tool.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) as keyof typeof t.tools] as any)?.name?.toLowerCase() || ''
          : tool.nameKey.toLowerCase();
        const desc = t.tools[tool.id.replace(/-/g, '') as keyof typeof t.tools]
          ? (t.tools[tool.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) as keyof typeof t.tools] as any)?.description?.toLowerCase() || ''
          : tool.descriptionKey.toLowerCase();
        
        // Get actual translated name and description
        const toolKey = tool.nameKey.split('.')[1];
        const toolTrans = t.tools[toolKey as keyof typeof t.tools];
        const translatedName = toolTrans?.name?.toLowerCase() || '';
        const translatedDesc = toolTrans?.description?.toLowerCase() || '';
        
        return translatedName.includes(query) || translatedDesc.includes(query) || tool.id.includes(query);
      });
    }

    return tools;
  }, [selectedCategory, searchQuery, t]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      <main className="flex-grow relative z-10">
        <HeroSection onSearch={handleSearch} />

        <div className="container mx-auto px-4 mb-8">
          <AdSpace type="horizontal" />
        </div>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
            </div>
            
            {/* Tools Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t.common.noResults}</p>
              </div>
            )}
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
                  ? 'نؤمن بأن الجميع يستحق الوصول إلى أدوات احترافية مجانية. جميع الأدوات تعمل مباشرة من المتصفح - ملفاتك لا تغادر جهازك أبداً.'
                  : 'We believe everyone deserves access to professional free tools. All tools work directly from your browser - your files never leave your device.'}
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
