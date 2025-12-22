import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { ToolCard } from '@/components/home/ToolCard';
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

        {/* Article Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {isRTL ? 'أدوات مجانية احترافية تعمل من متصفحك' : 'Professional Free Tools That Work From Your Browser'}
              </h2>
              
              {isRTL ? (
                <>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    مرحباً بك في BestToolsHub - وجهتك الأولى للأدوات المجانية عبر الإنترنت. نقدم لك مجموعة شاملة من الأدوات الاحترافية التي تعمل مباشرة من متصفحك دون الحاجة لتحميل أي برامج أو التسجيل.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">لماذا تختار أدواتنا؟</h3>
                  <ul className="text-muted-foreground space-y-3 mb-6 list-disc list-inside">
                    <li><strong>خصوصية كاملة:</strong> جميع الملفات تُعالج محلياً على جهازك</li>
                    <li><strong>سرعة فائقة:</strong> لا انتظار للتحميل أو المعالجة على الخادم</li>
                    <li><strong>مجانية 100%:</strong> جميع الأدوات متاحة مجاناً بدون قيود</li>
                    <li><strong>سهولة الاستخدام:</strong> واجهة بسيطة للمستخدمين من جميع المستويات</li>
                  </ul>

                  <p className="text-muted-foreground">
                    نقدم أكثر من {allTools.length} أداة مجانية تشمل: تحويل وضغط الصور، دمج وتقسيم ملفات PDF، أدوات النصوص والألوان، الآلات الحاسبة، ومولدات رموز QR.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Welcome to BestToolsHub - your go-to destination for free online tools. We offer a comprehensive collection of professional tools that work directly from your browser without downloading any software or signing up.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Choose Our Tools?</h3>
                  <ul className="text-muted-foreground space-y-3 mb-6 list-disc list-inside">
                    <li><strong>Complete Privacy:</strong> All files are processed locally on your device</li>
                    <li><strong>Lightning Fast:</strong> No waiting for uploads or server processing</li>
                    <li><strong>100% Free:</strong> All tools are available for free with no limitations</li>
                    <li><strong>Easy to Use:</strong> Simple interface for users of all skill levels</li>
                  </ul>

                  <p className="text-muted-foreground">
                    We offer over {allTools.length} free tools including: image conversion and compression, PDF merging and splitting, text and color tools, calculators, and QR code generators.
                  </p>
                </>
              )}
            </article>
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
