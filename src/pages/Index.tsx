import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { allTools } from '@/components/home/ToolsGrid';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return allTools;
    
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool => {
      const toolKey = tool.nameKey.split('.')[1];
      const toolTrans = t.tools[toolKey as keyof typeof t.tools];
      const translatedName = toolTrans?.name?.toLowerCase() || '';
      const translatedDesc = toolTrans?.description?.toLowerCase() || '';
      
      return translatedName.includes(query) || translatedDesc.includes(query) || tool.id.includes(query);
    });
  }, [searchQuery, t]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getToolName = (nameKey: string) => {
    const keys = nameKey.split('.');
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || nameKey;
  };

  // Group tools by category
  const categories = [
    { id: 'image', name: t.categories.image, tools: allTools.filter(t => t.category === 'image') },
    { id: 'pdf', name: t.categories.pdf, tools: allTools.filter(t => t.category === 'pdf') },
    { id: 'text', name: t.categories.text, tools: allTools.filter(t => t.category === 'text') },
    { id: 'color', name: t.categories.color, tools: allTools.filter(t => t.category === 'color') },
    { id: 'calculator', name: t.categories.calculator, tools: allTools.filter(t => t.category === 'calculator') },
    { id: 'qr', name: t.categories.qr, tools: allTools.filter(t => t.category === 'qr') },
  ];

  const categoryColors: Record<string, string> = {
    image: 'text-[hsl(180,100%,50%)]',
    pdf: 'text-[hsl(330,100%,60%)]',
    text: 'text-[hsl(145,80%,50%)]',
    color: 'text-[hsl(280,100%,60%)]',
    calculator: 'text-[hsl(25,100%,55%)]',
    qr: 'text-[hsl(55,100%,55%)]',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      <main className="flex-grow relative z-10">
        <HeroSection onSearch={handleSearch} />

        <div className="container mx-auto px-4 mb-8">
          <AdSpace type="horizontal" />
        </div>

        {/* Tools List by Category - Clean Design */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {searchQuery.trim() ? (
                // Search results
                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    {isRTL ? `نتائج البحث (${filteredTools.length})` : `Search Results (${filteredTools.length})`}
                  </h2>
                  {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {filteredTools.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                          <Link
                            key={tool.id}
                            to={tool.href}
                            className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/50 group"
                          >
                            <IconComponent className={`w-5 h-5 flex-shrink-0 ${categoryColors[tool.category]}`} />
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {getToolName(tool.nameKey)}
                            </span>
                            <ChevronRight className={`w-4 h-4 text-muted-foreground ${isRTL ? 'mr-auto rotate-180' : 'ml-auto'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">{t.common.noResults}</p>
                  )}
                </div>
              ) : (
                // Categories view
                <div className="space-y-8">
                  {categories.map((category) => (
                    <div key={category.id} className="glass-card p-6 rounded-2xl">
                      <h2 className={`text-xl font-bold mb-4 ${categoryColors[category.id]}`}>
                        {category.name}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                        {category.tools.map((tool) => {
                          const IconComponent = tool.icon;
                          return (
                            <Link
                              key={tool.id}
                              to={tool.href}
                              className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/50 group"
                            >
                              <IconComponent className={`w-5 h-5 flex-shrink-0 ${categoryColors[tool.category]}`} />
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {getToolName(tool.nameKey)}
                              </span>
                              <ChevronRight className={`w-4 h-4 text-muted-foreground ${isRTL ? 'mr-auto rotate-180' : 'ml-auto'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 my-12">
          <AdSpace type="horizontal" />
        </div>

        {/* Article Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl prose prose-lg dark:prose-invert">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {isRTL ? 'أدوات مجانية احترافية تعمل من متصفحك' : 'Professional Free Tools That Work From Your Browser'}
              </h2>
              
              {isRTL ? (
                <>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    مرحباً بك في BestToolsHub - وجهتك الأولى للأدوات المجانية عبر الإنترنت. نقدم لك مجموعة شاملة من الأدوات الاحترافية التي تعمل مباشرة من متصفحك دون الحاجة لتحميل أي برامج أو التسجيل.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">لماذا تختار أدواتنا؟</h3>
                  <ul className="text-muted-foreground space-y-3 mb-6">
                    <li><strong>خصوصية كاملة:</strong> جميع الملفات تُعالج محلياً على جهازك - لا نرفع أي ملفات لخوادمنا</li>
                    <li><strong>سرعة فائقة:</strong> لا انتظار للتحميل أو المعالجة على الخادم</li>
                    <li><strong>مجانية 100%:</strong> جميع الأدوات متاحة مجاناً بدون قيود</li>
                    <li><strong>سهولة الاستخدام:</strong> واجهة بسيطة وسهلة للمستخدمين من جميع المستويات</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">أدواتنا المميزة</h3>
                  <p className="text-muted-foreground mb-4">
                    نقدم أكثر من {allTools.length} أداة مجانية تشمل: تحويل وضغط الصور، دمج وتقسيم ملفات PDF، أدوات النصوص والألوان، الآلات الحاسبة، ومولدات رموز QR. كل أداة مصممة لتوفير أفضل تجربة مستخدم مع الحفاظ على أعلى معايير الجودة.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">كيف تعمل أدواتنا؟</h3>
                  <p className="text-muted-foreground">
                    تستخدم أدواتنا تقنيات المتصفح الحديثة لمعالجة ملفاتك محلياً. هذا يعني أن ملفاتك لا تغادر جهازك أبداً، مما يضمن أقصى درجات الخصوصية والأمان. ما عليك سوى اختيار الأداة، رفع ملفك، وتحميل النتيجة!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Welcome to BestToolsHub - your go-to destination for free online tools. We offer a comprehensive collection of professional tools that work directly from your browser without downloading any software or signing up.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Choose Our Tools?</h3>
                  <ul className="text-muted-foreground space-y-3 mb-6">
                    <li><strong>Complete Privacy:</strong> All files are processed locally on your device - we never upload your files to our servers</li>
                    <li><strong>Lightning Fast:</strong> No waiting for uploads or server processing</li>
                    <li><strong>100% Free:</strong> All tools are available for free with no limitations</li>
                    <li><strong>Easy to Use:</strong> Simple interface for users of all skill levels</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Featured Tools</h3>
                  <p className="text-muted-foreground mb-4">
                    We offer over {allTools.length} free tools including: image conversion and compression, PDF merging and splitting, text and color tools, calculators, and QR code generators. Each tool is designed to provide the best user experience while maintaining the highest quality standards.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">How Do Our Tools Work?</h3>
                  <p className="text-muted-foreground">
                    Our tools use modern browser technologies to process your files locally. This means your files never leave your device, ensuring maximum privacy and security. Simply choose a tool, upload your file, and download the result!
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
