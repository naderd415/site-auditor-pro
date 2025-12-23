import { useState, useRef, useCallback, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, Link2, FileText, Mail, Phone, Upload, X, 
  Shuffle, Undo2, Palette, Image, Shapes, Layers, Star
} from 'lucide-react';
import { toast } from 'sonner';

// أنواع النقاط والزوايا
type DotsType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
type CornersType = 'square' | 'dot' | 'extra-rounded';
type ContentType = 'url' | 'text' | 'email' | 'phone';

interface QRState {
  data: string;
  dotsType: DotsType;
  cornersType: CornersType;
  cornersDotType: 'square' | 'dot';
  color1: string;
  color2: string;
  bg: string;
  logo: string | null;
  gradientType: 'linear' | 'radial';
  transparentBg: boolean;
}

interface Template {
  id: number;
  cat: string;
  name: string;
  nameAr: string;
  color1: string;
  color2: string;
  bg: string;
  dots: DotsType;
  corner: CornersType;
  icon: string;
}

// القوالب الجاهزة
const templates: Template[] = [
  { id: 1, cat: 'social', name: 'Facebook', nameAr: 'فيسبوك', color1: '#1877F2', color2: '#1877F2', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '📘' },
  { id: 2, cat: 'social', name: 'Instagram', nameAr: 'انستغرام', color1: '#833AB4', color2: '#FD1D1D', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '📸' },
  { id: 3, cat: 'social', name: 'Twitter', nameAr: 'تويتر', color1: '#1DA1F2', color2: '#1DA1F2', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '🐦' },
  { id: 4, cat: 'social', name: 'WhatsApp', nameAr: 'واتساب', color1: '#25D366', color2: '#128C7E', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '💬' },
  { id: 5, cat: 'business', name: 'Corporate', nameAr: 'شركات', color1: '#2c3e50', color2: '#34495e', bg: '#ecf0f1', dots: 'square', corner: 'square', icon: '🏢' },
  { id: 6, cat: 'business', name: 'Gold Luxury', nameAr: 'ذهبي فاخر', color1: '#D4AF37', color2: '#C5A028', bg: '#000000', dots: 'classy', corner: 'extra-rounded', icon: '👑' },
  { id: 7, cat: 'love', name: 'Love', nameAr: 'حب', color1: '#e91e63', color2: '#ff4081', bg: '#ffebee', dots: 'dots', corner: 'dot', icon: '❤️' },
  { id: 8, cat: 'love', name: 'Romantic Night', nameAr: 'ليلة رومانسية', color1: '#ff6b81', color2: '#ff4757', bg: '#fff0f5', dots: 'rounded', corner: 'extra-rounded', icon: '💕' },
  { id: 9, cat: 'fun', name: 'Neon', nameAr: 'نيون', color1: '#00ff00', color2: '#ccff00', bg: '#000000', dots: 'square', corner: 'square', icon: '⚡' },
  { id: 10, cat: 'tech', name: 'Cyber', nameAr: 'سايبر', color1: '#00d2ff', color2: '#3a7bd5', bg: '#000000', dots: 'square', corner: 'square', icon: '🔌' },
  { id: 11, cat: 'food', name: 'Restaurant', nameAr: 'مطعم', color1: '#e67e22', color2: '#d35400', bg: '#fff3e0', dots: 'rounded', corner: 'extra-rounded', icon: '🍽️' },
  { id: 12, cat: 'food', name: 'Coffee Shop', nameAr: 'كافيه', color1: '#6f4e37', color2: '#8B4513', bg: '#FFF8DC', dots: 'classy', corner: 'extra-rounded', icon: '☕' },
  { id: 13, cat: 'sport', name: 'Gym', nameAr: 'جيم', color1: '#00b894', color2: '#00cec9', bg: '#e0f7fa', dots: 'rounded', corner: 'extra-rounded', icon: '💪' },
  { id: 14, cat: 'sport', name: 'Football', nameAr: 'كرة قدم', color1: '#0984e3', color2: '#6c5ce7', bg: '#e3f2fd', dots: 'dots', corner: 'dot', icon: '⚽' },
  { id: 15, cat: 'tech', name: 'Matrix', nameAr: 'ماتريكس', color1: '#00ff00', color2: '#008800', bg: '#000000', dots: 'square', corner: 'square', icon: '💻' },
  { id: 16, cat: 'business', name: 'Minimal', nameAr: 'بسيط', color1: '#000000', color2: '#333333', bg: '#ffffff', dots: 'square', corner: 'square', icon: '⬛' },
  { id: 17, cat: 'fun', name: 'Rainbow', nameAr: 'قوس قزح', color1: '#ff0000', color2: '#0000ff', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '🌈' },
  { id: 18, cat: 'love', name: 'Valentine', nameAr: 'عيد الحب', color1: '#c0392b', color2: '#e74c3c', bg: '#ffffff', dots: 'extra-rounded', corner: 'extra-rounded', icon: '💝' },
  { id: 19, cat: 'food', name: 'Pizza', nameAr: 'بيتزا', color1: '#ff6b35', color2: '#f7c815', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🍕' },
  { id: 20, cat: 'sport', name: 'Basketball', nameAr: 'كرة سلة', color1: '#ff6b00', color2: '#ff8c00', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '🏀' },
];

// الفئات
const categories = [
  { id: 'all', name: 'All', nameAr: 'الكل' },
  { id: 'sport', name: 'Sport', nameAr: 'رياضي' },
  { id: 'food', name: 'Food', nameAr: 'أكل ومطاعم' },
  { id: 'love', name: 'Love', nameAr: 'حب ورومانسي' },
  { id: 'tech', name: 'Tech', nameAr: 'تكنولوجيا' },
  { id: 'business', name: 'Business', nameAr: 'أعمال' },
  { id: 'fun', name: 'Fun', nameAr: 'ترفيه' },
  { id: 'social', name: 'Social', nameAr: 'سوشيال ميديا' },
];

const dotsTypes: { id: DotsType; name: string; nameAr: string }[] = [
  { id: 'square', name: 'Square', nameAr: 'مربع' },
  { id: 'dots', name: 'Dots', nameAr: 'دائري' },
  { id: 'rounded', name: 'Rounded', nameAr: 'منحني' },
  { id: 'extra-rounded', name: 'Smooth', nameAr: 'ناعم' },
  { id: 'classy', name: 'Classic', nameAr: 'كلاسيك' },
  { id: 'classy-rounded', name: 'Classic Rounded', nameAr: 'كلاسيك منحني' },
];

const cornerTypes: { id: CornersType; name: string; nameAr: string }[] = [
  { id: 'square', name: 'Square', nameAr: 'مربع' },
  { id: 'dot', name: 'Dot', nameAr: 'دائري' },
  { id: 'extra-rounded', name: 'Smooth', nameAr: 'ناعم' },
];

const QRGenerator = () => {
  const { t, isRTL } = useLanguage();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  
  const [contentType, setContentType] = useState<ContentType>('url');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quality, setQuality] = useState(1000);
  const [historyStack, setHistoryStack] = useState<QRState[]>([]);
  
  const [qrState, setQrState] = useState<QRState>({
    data: 'https://besttoolshub.com',
    dotsType: 'square',
    cornersType: 'square',
    cornersDotType: 'square',
    color1: '#000000',
    color2: '#000000',
    bg: '#ffffff',
    logo: null,
    gradientType: 'linear',
    transparentBg: false,
  });

  // إنشاء QR Code
  useEffect(() => {
    if (!qrRef.current) return;
    
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'svg',
      data: qrState.data || 'https://besttoolshub.com',
      image: qrState.logo || undefined,
      dotsOptions: {
        type: qrState.dotsType,
        gradient: {
          type: qrState.gradientType,
          colorStops: [
            { offset: 0, color: qrState.color1 },
            { offset: 1, color: qrState.color2 }
          ]
        }
      },
      backgroundOptions: {
        color: qrState.transparentBg ? 'transparent' : qrState.bg
      },
      cornersSquareOptions: {
        type: qrState.cornersType
      },
      cornersDotOptions: {
        type: qrState.cornersDotType
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10
      }
    });

    qrRef.current.innerHTML = '';
    qrCode.append(qrRef.current);
    qrCodeRef.current = qrCode;
  }, [qrState]);

  const updateQrState = (updates: Partial<QRState>) => {
    setQrState(prev => ({ ...prev, ...updates }));
  };

  const saveToHistory = () => {
    setHistoryStack(prev => {
      const newStack = [...prev, { ...qrState }];
      if (newStack.length > 10) newStack.shift();
      return newStack;
    });
  };

  const undoTemplate = () => {
    if (historyStack.length === 0) return;
    const prev = historyStack[historyStack.length - 1];
    setHistoryStack(prev => prev.slice(0, -1));
    setQrState(prev);
    toast.success(isRTL ? 'تم التراجع' : 'Undone');
  };

  const applyTemplate = (template: Template) => {
    saveToHistory();
    updateQrState({
      color1: template.color1,
      color2: template.color2,
      bg: template.bg,
      dotsType: template.dots,
      cornersType: template.corner,
      cornersDotType: template.corner === 'square' ? 'square' : 'dot',
      transparentBg: false,
    });
    toast.success(isRTL ? `تم تطبيق ${template.nameAr}` : `Applied ${template.name}`);
  };

  const applyRandomTemplate = () => {
    const random = templates[Math.floor(Math.random() * templates.length)];
    applyTemplate(random);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateQrState({ logo: reader.result as string });
        toast.success(isRTL ? 'تم رفع الشعار!' : 'Logo uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateQrState({ logo: null });
    if (logoInputRef.current) logoInputRef.current.value = '';
    toast.success(isRTL ? 'تم إزالة الشعار' : 'Logo removed');
  };

  const downloadQR = async (format: 'png' | 'svg') => {
    if (!qrCodeRef.current) return;
    
    qrCodeRef.current.update({ width: quality, height: quality });
    await qrCodeRef.current.download({ name: 'qr_code', extension: format });
    qrCodeRef.current.update({ width: 300, height: 300 });
    toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
  };

  const handleBulkGeneration = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const rows = text.trim().split(/\r?\n/).map(row => row.split(','));
    
    const zip = new JSZip();
    const folder = zip.folder('qr_codes');

    toast.loading(isRTL ? 'جاري إنشاء الأكواد...' : 'Generating QR codes...');

    try {
      for (let i = 0; i < rows.length; i++) {
        const [value, name] = rows[i];
        if (!value) continue;
        
        const fileName = (name || `qr_${i + 1}`).trim().replace(/[^a-z0-9]/gi, '_');
        
        const tempQR = new QRCodeStyling({
          width: quality,
          height: quality,
          data: value,
          image: qrState.logo || undefined,
          dotsOptions: {
            type: qrState.dotsType,
            gradient: {
              type: qrState.gradientType,
              colorStops: [
                { offset: 0, color: qrState.color1 },
                { offset: 1, color: qrState.color2 }
              ]
            }
          },
          cornersSquareOptions: { type: qrState.cornersType },
          cornersDotOptions: { type: qrState.cornersDotType },
          backgroundOptions: {
            color: qrState.transparentBg ? 'transparent' : qrState.bg
          },
          imageOptions: { crossOrigin: 'anonymous', margin: 10 }
        });

        const blob = await tempQR.getRawData('png');
        if (blob && folder) {
          folder.file(`${fileName}.png`, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'qr_bulk_codes.zip');
      toast.dismiss();
      toast.success(isRTL ? 'تم إنشاء الملف!' : 'ZIP file created!');
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error(isRTL ? 'حدث خطأ' : 'Error occurred');
    }
  };

  const getPlaceholder = () => {
    switch (contentType) {
      case 'url': return 'https://www.example.com';
      case 'text': return isRTL ? 'اكتب النص هنا...' : 'Enter your text...';
      case 'email': return 'name@example.com';
      case 'phone': return '+201234567890';
    }
  };

  const getLabel = () => {
    switch (contentType) {
      case 'url': return isRTL ? 'رابط الموقع (URL)' : 'Website URL';
      case 'text': return isRTL ? 'النص' : 'Text';
      case 'email': return isRTL ? 'البريد الإلكتروني' : 'Email';
      case 'phone': return isRTL ? 'رقم الهاتف' : 'Phone Number';
    }
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.cat === selectedCategory);

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد QR Code الاحترافي' : 'Professional QR Code Generator'}
      description={isRTL ? 'أداة توليد QR Code احترافية ومجانية. أضف شعارك، غير الألوان، واختر التصميم المناسب.' : 'Professional and free QR Code generator. Add your logo, change colors, and choose the right design.'}
      keywords="qr code, generator, qr maker, barcode"
      article={isRTL 
        ? 'مولد QR Code في BestToolsHub هو أداة مجانية تساعدك على إنشاء رمز QR بسرعة وبشكل احترافي، سواء كنت تريد وضعه على بطاقة عمل، إعلان مطبوع، منيو مطعم، أو رابط حسابات التواصل الاجتماعي. يمكنك تخصيص الألوان والتصميم وإضافة شعار في المنتصف.'
        : 'QR Code Generator at BestToolsHub is a free tool that helps you create QR codes quickly and professionally. Whether you want to put it on a business card, printed ad, restaurant menu, or social media link. You can customize colors, design, and add a logo in the center.'
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* لوحة الإعدادات (يسار/أعلى) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-2xl">📱</span>
              {isRTL ? 'مولد QR Code الاحترافي' : 'Professional QR Code Generator'}
            </h1>
            
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1">
                <TabsTrigger value="content" className="gap-2 text-xs">
                  <Link2 className="w-3.5 h-3.5" />
                  {isRTL ? 'المحتوى' : 'Content'}
                </TabsTrigger>
                <TabsTrigger value="templates" className="gap-2 text-xs">
                  <Star className="w-3.5 h-3.5" />
                  {isRTL ? 'القوالب' : 'Templates'}
                </TabsTrigger>
                <TabsTrigger value="colors" className="gap-2 text-xs">
                  <Palette className="w-3.5 h-3.5" />
                  {isRTL ? 'الألوان' : 'Colors'}
                </TabsTrigger>
                <TabsTrigger value="logo" className="gap-2 text-xs">
                  <Image className="w-3.5 h-3.5" />
                  {isRTL ? 'الشعار' : 'Logo'}
                </TabsTrigger>
                <TabsTrigger value="design" className="gap-2 text-xs">
                  <Shapes className="w-3.5 h-3.5" />
                  {isRTL ? 'التصميم' : 'Design'}
                </TabsTrigger>
                <TabsTrigger value="bulk" className="gap-2 text-xs">
                  <Layers className="w-3.5 h-3.5" />
                  {isRTL ? 'بالجملة' : 'Bulk'}
                </TabsTrigger>
              </TabsList>

              {/* تبويب المحتوى */}
              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { type: 'url' as ContentType, icon: Link2, label: 'URL' },
                    { type: 'text' as ContentType, icon: FileText, label: isRTL ? 'نص' : 'Text' },
                    { type: 'email' as ContentType, icon: Mail, label: isRTL ? 'إيميل' : 'Email' },
                    { type: 'phone' as ContentType, icon: Phone, label: isRTL ? 'هاتف' : 'Phone' },
                  ].map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => setContentType(type)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                        contentType === type 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{getLabel()}</label>
                  <Input
                    value={qrState.data}
                    onChange={(e) => updateQrState({ data: e.target.value })}
                    placeholder={getPlaceholder()}
                    className="text-base"
                  />
                </div>
              </TabsContent>

              {/* تبويب القوالب */}
              <TabsContent value="templates" className="space-y-4 mt-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {isRTL ? cat.nameAr : cat.name}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={applyRandomTemplate} className="flex-1 gap-2">
                    <Shuffle className="w-4 h-4" />
                    {isRTL ? 'عشوائي' : 'Random'}
                  </Button>
                  <Button onClick={undoTemplate} variant="outline" className="gap-2" disabled={historyStack.length === 0}>
                    <Undo2 className="w-4 h-4" />
                    {isRTL ? 'تراجع' : 'Undo'}
                  </Button>
                </div>

                <ScrollArea className="h-[280px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
                    {filteredTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className="p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center gap-2 bg-card"
                        style={{
                          background: `linear-gradient(135deg, ${template.bg} 60%, ${template.color1} 100%)`
                        }}
                      >
                        <span className="text-2xl">{template.icon}</span>
                        <span className="text-xs font-medium" style={{ color: template.bg === '#000000' ? '#fff' : '#000' }}>
                          {isRTL ? template.nameAr : template.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* تبويب الألوان */}
              <TabsContent value="colors" className="space-y-6 mt-4">
                <div className="space-y-4">
                  <h3 className="font-bold text-sm">{isRTL ? 'لون الخلفية' : 'Background Color'}</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={qrState.bg}
                      onChange={(e) => updateQrState({ bg: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                      disabled={qrState.transparentBg}
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={qrState.transparentBg}
                        onCheckedChange={(checked) => updateQrState({ transparentBg: checked })}
                      />
                      <span className="text-sm">{isRTL ? 'خلفية شفافة' : 'Transparent'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-sm">{isRTL ? 'لون الرمز' : 'QR Color'}</h3>
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-xs mb-1">{isRTL ? 'لون 1' : 'Color 1'}</label>
                      <input
                        type="color"
                        value={qrState.color1}
                        onChange={(e) => updateQrState({ color1: e.target.value })}
                        className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">{isRTL ? 'لون 2 (تدرج)' : 'Color 2 (Gradient)'}</label>
                      <input
                        type="color"
                        value={qrState.color2}
                        onChange={(e) => updateQrState({ color2: e.target.value })}
                        className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">{isRTL ? 'نوع التدرج' : 'Gradient Type'}</label>
                    <div className="flex gap-2">
                      {(['linear', 'radial'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => updateQrState({ gradientType: type })}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            qrState.gradientType === type
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {type === 'linear' ? (isRTL ? 'خطي' : 'Linear') : (isRTL ? 'دائري' : 'Radial')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* تبويب الشعار */}
              <TabsContent value="logo" className="space-y-4 mt-4">
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">{isRTL ? 'اضغط لرفع شعار (PNG, JPG)' : 'Click to upload logo (PNG, JPG)'}</p>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
                
                {qrState.logo && (
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <img src={qrState.logo} alt="Logo" className="w-12 h-12 object-contain" />
                    <Button variant="destructive" size="sm" onClick={removeLogo}>
                      <X className="w-4 h-4 mr-2" />
                      {isRTL ? 'إزالة الشعار' : 'Remove Logo'}
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* تبويب التصميم */}
              <TabsContent value="design" className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-3">{isRTL ? 'شكل النقاط' : 'Dots Shape'}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {dotsTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateQrState({ dotsType: type.id })}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          qrState.dotsType === type.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {isRTL ? type.nameAr : type.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">{isRTL ? 'إطار العيون' : 'Eye Frame'}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {cornerTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateQrState({ cornersType: type.id })}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          qrState.cornersType === type.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {isRTL ? type.nameAr : type.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">{isRTL ? 'كرة العيون' : 'Eye Ball'}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'square' as const, name: 'Square', nameAr: 'مربع' },
                      { id: 'dot' as const, name: 'Dot', nameAr: 'دائري' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateQrState({ cornersDotType: type.id })}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          qrState.cornersDotType === type.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {isRTL ? type.nameAr : type.name}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* تبويب إنشاء بالجملة */}
              <TabsContent value="bulk" className="space-y-4 mt-4">
                <div
                  onClick={() => csvInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <Layers className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-2">{isRTL ? 'ارفع ملف CSV يحتوي على البيانات' : 'Upload CSV file with data'}</p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'العمود الأول = القيمة، العمود الثاني = اسم الملف (اختياري)' : 'Column 1 = Value, Column 2 = Filename (optional)'}
                  </p>
                  <input
                    ref={csvInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleBulkGeneration}
                    className="hidden"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* لوحة المعاينة (يمين/أسفل) */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
            <div 
              ref={qrRef}
              className="flex justify-center mb-6 bg-white p-4 rounded-xl shadow-sm mx-auto w-fit min-h-[300px]"
            />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-sm whitespace-nowrap">{isRTL ? 'الجودة:' : 'Quality:'}</label>
                <Slider
                  value={[quality]}
                  onValueChange={([v]) => setQuality(v)}
                  min={300}
                  max={2000}
                  step={100}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16">{quality}px</span>
              </div>
              
              <Button onClick={() => downloadQR('png')} className="w-full gap-2">
                <Download className="w-4 h-4" />
                {isRTL ? 'تحميل PNG' : 'Download PNG'}
              </Button>
              <Button onClick={() => downloadQR('svg')} variant="outline" className="w-full">
                {isRTL ? 'تحميل SVG' : 'Download SVG'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
