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
  QrCode
} from 'lucide-react';

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getToolName = (nameKey: string) => {
    const parts = nameKey.split('.');
    if (parts.length >= 2) {
      const toolKey = parts[1];
      const toolTrans = t.tools[toolKey as keyof typeof t.tools];
      return toolTrans?.name || nameKey;
    }
    return nameKey;
  };

  const getToolDescription = (descKey: string) => {
    const parts = descKey.split('.');
    if (parts.length >= 2) {
      const toolKey = parts[1];
      const toolTrans = t.tools[toolKey as keyof typeof t.tools];
      return toolTrans?.description || '';
    }
    return '';
  };

  // Category configurations
  const categories = [
    { 
      id: 'image', 
      name: t.categories.image, 
      icon: Image,
      colorClass: 'category-card-cyan',
      textColor: 'text-[hsl(180,100%,45%)]',
      darkTextColor: 'dark:text-[hsl(180,100%,55%)]'
    },
    { 
      id: 'pdf', 
      name: t.categories.pdf, 
      icon: FileText,
      colorClass: 'category-card-pink',
      textColor: 'text-[hsl(330,90%,50%)]',
      darkTextColor: 'dark:text-[hsl(330,100%,65%)]'
    },
    { 
      id: 'text', 
      name: t.categories.text, 
      icon: Type,
      colorClass: 'category-card-green',
      textColor: 'text-[hsl(145,70%,40%)]',
      darkTextColor: 'dark:text-[hsl(145,80%,55%)]'
    },
    { 
      id: 'color', 
      name: t.categories.color, 
      icon: Palette,
      colorClass: 'category-card-purple',
      textColor: 'text-[hsl(280,80%,50%)]',
      darkTextColor: 'dark:text-[hsl(280,100%,65%)]'
    },
    { 
      id: 'calculator', 
      name: t.categories.calculator, 
      icon: Calculator,
      colorClass: 'category-card-orange',
      textColor: 'text-[hsl(25,90%,45%)]',
      darkTextColor: 'dark:text-[hsl(25,100%,60%)]'
    },
    { 
      id: 'qr', 
      name: t.categories.qr, 
      icon: QrCode,
      colorClass: 'category-card-yellow',
      textColor: 'text-[hsl(45,90%,40%)]',
      darkTextColor: 'dark:text-[hsl(55,100%,55%)]'
    },
  ];

  const getFilteredToolsForCategory = (categoryId: string) => {
    let tools = allTools.filter(tool => tool.category === categoryId);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => {
        const name = getToolName(tool.nameKey).toLowerCase();
        const desc = getToolDescription(tool.descriptionKey).toLowerCase();
        return name.includes(query) || desc.includes(query) || tool.id.includes(query);
      });
    }
    
    return tools;
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const tools = getFilteredToolsForCategory(category.id);
                
                if (searchQuery && tools.length === 0) return null;
                
                return (
                  <div 
                    key={category.id} 
                    className={`category-card ${category.colorClass} p-5 rounded-xl`}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                      <IconComponent className={`w-5 h-5 ${category.textColor} ${category.darkTextColor}`} />
                      <h2 className={`text-lg font-bold ${category.textColor} ${category.darkTextColor}`}>
                        {category.name}
                      </h2>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        {tools.length}
                      </span>
                    </div>
                    
                    {/* Tools List */}
                    <div className="space-y-2">
                      {tools.map((tool) => (
                        <Link
                          key={tool.id}
                          to={tool.href}
                          className="block p-3 rounded-lg transition-all duration-300 hover:bg-muted/60 group"
                        >
                          <div className="flex items-start gap-3">
                            <tool.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${category.textColor} ${category.darkTextColor} opacity-70 group-hover:opacity-100`} />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                                {getToolName(tool.nameKey)}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {getToolDescription(tool.descriptionKey)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
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
                    مرحباً بك في BestToolsHub - وجهتك الأولى للأدوات المجانية عبر الإنترنت. نقدم لك مجموعة شاملة من الأدوات الاحترافية التي تعمل مباشرة من متصفحك.
                  </p>
                  <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                    <li><strong>خصوصية كاملة:</strong> جميع الملفات تُعالج محلياً على جهازك</li>
                    <li><strong>سرعة فائقة:</strong> لا انتظار للتحميل أو المعالجة</li>
                    <li><strong>مجانية 100%:</strong> جميع الأدوات متاحة مجاناً</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Welcome to BestToolsHub - your go-to destination for free online tools. Professional tools that work directly from your browser.
                  </p>
                  <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                    <li><strong>Complete Privacy:</strong> All files are processed locally</li>
                    <li><strong>Lightning Fast:</strong> No waiting for uploads</li>
                    <li><strong>100% Free:</strong> All tools available for free</li>
                  </ul>
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
