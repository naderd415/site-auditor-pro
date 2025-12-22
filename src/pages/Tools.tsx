import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ToolCard } from '@/components/home/ToolCard';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { allTools } from '@/components/home/ToolsGrid';

const Tools = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    let tools = selectedCategory === 'all' 
      ? allTools 
      : allTools.filter(tool => tool.category === selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => {
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

  // Group tools by category
  const toolsByCategory = useMemo(() => {
    const categories = ['image', 'pdf', 'text', 'color', 'calculator', 'qr'];
    return categories.map(cat => ({
      id: cat,
      name: t.categories[cat as keyof typeof t.categories],
      tools: allTools.filter(tool => tool.category === cat),
    }));
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'جميع الأدوات المجانية - BestToolsHub' : 'All Free Tools - BestToolsHub'}</title>
        <meta name="description" content={isRTL 
          ? 'تصفح جميع الأدوات المجانية: أدوات الصور، PDF، النصوص، الألوان، الآلات الحاسبة، وأدوات QR. كلها تعمل من المتصفح مباشرة.'
          : 'Browse all free tools: Image tools, PDF, Text, Colors, Calculators, and QR tools. All work directly from your browser.'
        } />
        <meta name="keywords" content="free tools, image converter, PDF tools, text tools, color picker, QR generator, online tools" />
        <link rel="canonical" href="/tools" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />

        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {isRTL ? 'جميع الأدوات المجانية' : 'All Free Tools'}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {isRTL 
                    ? `${allTools.length} أداة مجانية تعمل مباشرة من متصفحك`
                    : `${allTools.length} free tools that work directly from your browser`}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mb-8">
            <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
          </div>

          <div className="container mx-auto px-4 mb-8">
            <AdSpace type="horizontal" />
          </div>

          {/* Tools Grid */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              {selectedCategory === 'all' ? (
                // Show by category
                <div className="space-y-12">
                  {toolsByCategory.map((category) => (
                    <div key={category.id}>
                      <h2 className="text-2xl font-bold text-foreground mb-6">
                        {category.name}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {category.tools.map((tool) => (
                          <ToolCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show filtered
                filteredTools.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">{t.common.noResults}</p>
                  </div>
                )
              )}
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

export default Tools;
