import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { AdsterraTop } from '@/components/ads/AdsterraTop';
import { useLanguage } from '@/lib/i18n';
import { allTools } from '@/components/home/ToolsGrid';
import { ChevronRight } from 'lucide-react';

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

  const getToolName = (nameKey: string) => {
    const keys = nameKey.split('.');
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || nameKey;
  };

  // Group tools by category
  const toolsByCategory = useMemo(() => {
    const categories = ['image', 'pdf', 'text', 'color', 'calculator', 'qr', 'seo'];
    return categories.map(cat => ({
      id: cat,
      name: t.categories[cat as keyof typeof t.categories],
      tools: allTools.filter(tool => tool.category === cat),
    }));
  }, [t]);

  const categoryColors: Record<string, string> = {
    image: 'text-[hsl(180,100%,50%)]',
    pdf: 'text-[hsl(330,100%,60%)]',
    text: 'text-[hsl(145,80%,50%)]',
    color: 'text-[hsl(280,100%,60%)]',
    calculator: 'text-[hsl(25,100%,55%)]',
    qr: 'text-[hsl(55,100%,55%)]',
    seo: 'text-[hsl(200,100%,55%)]',
  };

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'جميع الأدوات المجانية المدعومة بالذكاء الاصطناعي - BestToolsHub' : 'All Free AI-Powered Tools - BestToolsHub'}</title>
        <meta name="description" content={isRTL 
          ? 'تصفح جميع الأدوات المجانية المدعومة بالذكاء الاصطناعي: أدوات الصور، PDF، النصوص، الألوان، الآلات الحاسبة، وأدوات QR. كلها تعمل من المتصفح مباشرة وبأفضل جودة.'
          : 'Browse all free AI-powered tools: Image tools, PDF, Text, Colors, Calculators, and QR tools. All work directly from your browser with best quality.'
        } />
        <meta name="keywords" content={isRTL 
          ? 'أدوات مجانية, ذكاء اصطناعي, محول صور, أدوات PDF, أدوات نصوص, منتقي ألوان, مولد QR, أدوات اونلاين'
          : 'free tools, AI-powered, image converter, PDF tools, text tools, color picker, QR generator, online tools'
        } />
        <link rel="canonical" href="/tools" />
      </Helmet>

      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Interactive Stars Background */}
        <div className="interactive-stars-bg" aria-hidden="true" />
        
        <Header onSearch={handleSearch} />

        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  {isRTL ? 'جميع الأدوات المجانية المدعومة بالذكاء الاصطناعي' : 'All Free AI-Powered Tools'}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                  {isRTL 
                    ? `${allTools.length} أداة مجانية مدعومة بالذكاء الاصطناعي تعمل مباشرة من متصفحك`
                    : `${allTools.length} free AI-powered tools that work directly from your browser`}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mb-8">
            <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
          </div>

          <div className="container mx-auto px-4 mb-8">
            <AdsterraTop />
          </div>

          {/* Tools List */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                {selectedCategory === 'all' ? (
                  // Show by category
                  <div className="space-y-8">
                    {toolsByCategory.map((category) => (
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
                ) : (
                  // Show filtered
                  filteredTools.length > 0 ? (
                    <div className="glass-card p-6 rounded-2xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
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
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">{t.common.noResults}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdsterraTop />
          </div>

          {/* Article Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <article className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl prose prose-lg dark:prose-invert">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {isRTL ? 'دليلك الشامل للأدوات المجانية عبر الإنترنت' : 'Your Complete Guide to Free Online Tools'}
                </h2>
                
                {isRTL ? (
                  <>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      في عالم اليوم الرقمي، أصبحت الأدوات عبر الإنترنت ضرورة للجميع سواء كنت مصمماً، مطوراً، طالباً، أو محترفاً في أي مجال. نقدم لك في BestToolsHub مجموعة متكاملة من الأدوات التي تغطي جميع احتياجاتك.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">أدوات الصور</h3>
                    <p className="text-muted-foreground mb-4">
                      تحويل الصور بين التنسيقات المختلفة (PNG, JPG, WebP)، ضغط الصور لتقليل حجمها، تغيير أبعاد الصور، قص الصور، وتحويل الصور إلى Base64 للاستخدام في الويب.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">أدوات PDF</h3>
                    <p className="text-muted-foreground mb-4">
                      دمج ملفات PDF متعددة في ملف واحد، تقسيم ملف PDF إلى صفحات منفصلة، ضغط ملفات PDF، وتحويل PDF إلى صور والعكس.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">أدوات النصوص</h3>
                    <p className="text-muted-foreground mb-4">
                      عداد الكلمات والحروف، تنسيق النصوص (أحرف كبيرة/صغيرة)، مقارنة النصوص، مولد النص العشوائي Lorem Ipsum، ومولد الروابط الصديقة للـ SEO.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">أدوات الألوان</h3>
                    <p className="text-muted-foreground mb-4">
                      منتقي الألوان، محول صيغ الألوان (HEX, RGB, HSL)، مولد التدرجات اللونية، ومولد لوحات الألوان المتناسقة.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">الآلات الحاسبة</h3>
                    <p className="text-muted-foreground">
                      حاسبة النسب المئوية، حاسبة العمر، حاسبة مؤشر كتلة الجسم BMI، ومحول الوحدات للمسافات والأوزان ودرجات الحرارة.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      In today's digital world, online tools have become essential for everyone - whether you're a designer, developer, student, or professional in any field. At BestToolsHub, we provide a comprehensive set of tools that cover all your needs.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Image Tools</h3>
                    <p className="text-muted-foreground mb-4">
                      Convert images between different formats (PNG, JPG, WebP), compress images to reduce file size, resize images, crop images, and convert images to Base64 for web use.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">PDF Tools</h3>
                    <p className="text-muted-foreground mb-4">
                      Merge multiple PDF files into one, split PDF files into separate pages, compress PDF files, and convert PDF to images and vice versa.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Text Tools</h3>
                    <p className="text-muted-foreground mb-4">
                      Word and character counter, text formatting (uppercase/lowercase), text comparison, Lorem Ipsum generator, and SEO-friendly slug generator.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Color Tools</h3>
                    <p className="text-muted-foreground mb-4">
                      Color picker, color format converter (HEX, RGB, HSL), gradient generator, and harmonious color palette generator.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Calculators</h3>
                    <p className="text-muted-foreground">
                      Percentage calculator, age calculator, BMI calculator, and unit converter for distances, weights, and temperatures.
                    </p>
                  </>
                )}
              </article>
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdsterraTop />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Tools;
