import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { allTools } from '@/components/home/ToolsGrid';
import { 
  Image, 
  FileText, 
  Type, 
  Palette, 
  Calculator, 
  QrCode,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

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

  // Category configurations with icons and colors
  const categories = [
    { 
      id: 'image', 
      name: t.categories.image, 
      icon: Image,
      colorClass: 'category-card-cyan',
      iconBg: 'bg-[hsl(180,100%,50%/0.15)]',
      iconColor: 'text-[hsl(180,100%,50%)]',
      linkHover: 'hover:text-[hsl(180,100%,50%)]'
    },
    { 
      id: 'pdf', 
      name: t.categories.pdf, 
      icon: FileText,
      colorClass: 'category-card-pink',
      iconBg: 'bg-[hsl(330,100%,60%/0.15)]',
      iconColor: 'text-[hsl(330,100%,60%)]',
      linkHover: 'hover:text-[hsl(330,100%,60%)]'
    },
    { 
      id: 'text', 
      name: t.categories.text, 
      icon: Type,
      colorClass: 'category-card-green',
      iconBg: 'bg-[hsl(145,80%,50%/0.15)]',
      iconColor: 'text-[hsl(145,80%,50%)]',
      linkHover: 'hover:text-[hsl(145,80%,50%)]'
    },
    { 
      id: 'color', 
      name: t.categories.color, 
      icon: Palette,
      colorClass: 'category-card-purple',
      iconBg: 'bg-[hsl(280,100%,60%/0.15)]',
      iconColor: 'text-[hsl(280,100%,60%)]',
      linkHover: 'hover:text-[hsl(280,100%,60%)]'
    },
    { 
      id: 'calculator', 
      name: t.categories.calculator, 
      icon: Calculator,
      colorClass: 'category-card-orange',
      iconBg: 'bg-[hsl(25,100%,55%/0.15)]',
      iconColor: 'text-[hsl(25,100%,55%)]',
      linkHover: 'hover:text-[hsl(25,100%,55%)]'
    },
    { 
      id: 'qr', 
      name: t.categories.qr, 
      icon: QrCode,
      colorClass: 'category-card-yellow',
      iconBg: 'bg-[hsl(55,100%,50%/0.15)]',
      iconColor: 'text-[hsl(55,100%,50%)]',
      linkHover: 'hover:text-[hsl(55,100%,50%)]'
    },
  ];

  // Filter tools based on search
  const getFilteredToolsForCategory = (categoryId: string) => {
    let tools = allTools.filter(tool => tool.category === categoryId);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => {
        const toolKey = tool.nameKey.split('.')[1];
        const toolTrans = t.tools[toolKey as keyof typeof t.tools];
        const translatedName = toolTrans?.name?.toLowerCase() || '';
        return translatedName.includes(query) || tool.id.includes(query);
      });
    }
    
    return tools;
  };

  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      <main className="flex-grow relative z-10">
        <HeroSection onSearch={handleSearch} />

        <div className="container mx-auto px-4 mb-8">
          <AdSpace type="horizontal" />
        </div>

        {/* Category Blocks */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const tools = getFilteredToolsForCategory(category.id);
                
                if (searchQuery && tools.length === 0) return null;
                
                return (
                  <div 
                    key={category.id} 
                    className={`category-card ${category.colorClass} p-6 rounded-2xl`}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${category.iconBg} flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${category.iconColor}`} />
                      </div>
                      <h2 className={`text-xl font-bold ${category.iconColor}`}>
                        {category.name}
                      </h2>
                    </div>
                    
                    {/* Tools List */}
                    <div className="space-y-1">
                      {tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        return (
                          <Link
                            key={tool.id}
                            to={tool.href}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all duration-300 hover:bg-muted/50 group ${category.linkHover}`}
                          >
                            <ToolIcon className={`w-4 h-4 ${category.iconColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
                            <span className="text-foreground group-hover:translate-x-1 transition-transform font-medium">
                              {getToolName(tool.nameKey)}
                            </span>
                            <Arrow className={`w-4 h-4 ${isRTL ? 'mr-auto' : 'ml-auto'} opacity-0 group-hover:opacity-100 transition-opacity ${category.iconColor}`} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
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
