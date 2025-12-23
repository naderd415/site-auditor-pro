import { useState, useRef, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, Copy, Upload, X, Sparkles, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { qrCategories, getRandomTemplate, type QRTemplate } from '@/lib/qr/templates';

type QRPattern = 'squares' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded' | 'diamond' | 'star' | 'heart' | 'hexagon';

interface QRSettings {
  size: number;
  darkColor: string;
  lightColor: string;
  transparentBg: boolean;
  pattern: QRPattern;
  logo: string | null;
}

// تحويل hex إلى HSL
const hexToHSL = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 100, l: 50 };
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// تحويل HSL إلى hex
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// مكون اختيار اللون
const ColorPicker = ({ color, onChange, label }: { color: string; onChange: (color: string) => void; label: string }) => {
  const hsl = hexToHSL(color);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-8 h-8 rounded-md border border-border shadow-sm hover:scale-110 transition-transform cursor-pointer"
          style={{ backgroundColor: color }}
          title={label}
        />
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="start">
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          
          {/* مربع الإشباع والإضاءة */}
          <div 
            className="w-full h-28 rounded-md relative cursor-crosshair"
            style={{
              background: `linear-gradient(to bottom, white, transparent, black), 
                           linear-gradient(to right, gray, hsl(${hsl.h}, 100%, 50%))`
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
              onChange(hslToHex(hsl.h, Math.round(x * 100), Math.round((1 - y) * 100)));
            }}
          >
            <div 
              className="absolute w-3 h-3 border-2 border-white rounded-full shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${hsl.s}%`, top: `${100 - hsl.l}%`, backgroundColor: color }}
            />
          </div>
          
          {/* شريط الـ Hue */}
          <div 
            className="w-full h-3 rounded-full cursor-pointer relative"
            style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              onChange(hslToHex(Math.round(x * 360), hsl.s, hsl.l));
            }}
          >
            <div 
              className="absolute w-3 h-3 border-2 border-white rounded-full shadow -translate-x-1/2 top-0 pointer-events-none"
              style={{ left: `${(hsl.h / 360) * 100}%`, backgroundColor: `hsl(${hsl.h}, 100%, 50%)` }}
            />
          </div>
          
          <Input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono text-xs h-8"
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

// قائمة الأنماط
const patterns: { id: QRPattern; name: string; nameAr: string }[] = [
  { id: 'squares', name: 'Squares', nameAr: 'مربعات' },
  { id: 'dots', name: 'Dots', nameAr: 'نقاط' },
  { id: 'rounded', name: 'Rounded', nameAr: 'دائري' },
  { id: 'classy', name: 'Classy', nameAr: 'أنيق' },
  { id: 'classy-rounded', name: 'Classy Rounded', nameAr: 'أنيق دائري' },
  { id: 'extra-rounded', name: 'Extra Rounded', nameAr: 'دائري جداً' },
  { id: 'diamond', name: 'Diamond', nameAr: 'ماسي' },
  { id: 'star', name: 'Star', nameAr: 'نجمة' },
  { id: 'heart', name: 'Heart', nameAr: 'قلب' },
  { id: 'hexagon', name: 'Hexagon', nameAr: 'سداسي' },
];

const QRGenerator = () => {
  const { t, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [inputValue, setInputValue] = useState('https://example.com');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<QRSettings>({
    size: 400,
    darkColor: '#000000',
    lightColor: '#ffffff',
    transparentBg: false,
    pattern: 'squares',
    logo: null,
  });

  // توليد الـ QR
  const generateQR = useCallback(async () => {
    if (!inputValue.trim() || !canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const actualSize = settings.size;

      await QRCode.toCanvas(canvas, inputValue, {
        width: actualSize,
        margin: 2,
        color: {
          dark: settings.darkColor,
          light: settings.transparentBg ? '#00000000' : settings.lightColor,
        },
        errorCorrectionLevel: 'H',
      });

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // تطبيق النمط
      if (settings.pattern !== 'squares') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d')!;
        
        if (settings.transparentBg) {
          tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        } else {
          tempCtx.fillStyle = settings.lightColor;
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }
        
        const moduleSize = actualSize / 29;
        
        for (let y = 0; y < canvas.height; y += moduleSize) {
          for (let x = 0; x < canvas.width; x += moduleSize) {
            const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
            const isDark = pixelData[pixelIndex] < 128;
            
            if (isDark) {
              tempCtx.fillStyle = settings.darkColor;
              const padding = moduleSize * 0.1;
              const size = moduleSize - padding * 2;
              const cx = x + moduleSize / 2;
              const cy = y + moduleSize / 2;
              
              switch (settings.pattern) {
                case 'dots':
                  tempCtx.beginPath();
                  tempCtx.arc(cx, cy, size / 2, 0, Math.PI * 2);
                  tempCtx.fill();
                  break;
                case 'rounded':
                  tempCtx.beginPath();
                  tempCtx.roundRect(x + padding, y + padding, size, size, size * 0.3);
                  tempCtx.fill();
                  break;
                case 'classy':
                  tempCtx.beginPath();
                  tempCtx.roundRect(x + padding, y + padding, size, size, [size * 0.5, 0, size * 0.5, 0]);
                  tempCtx.fill();
                  break;
                case 'classy-rounded':
                  tempCtx.beginPath();
                  tempCtx.roundRect(x + padding, y + padding, size, size, [size * 0.6, size * 0.1, size * 0.6, size * 0.1]);
                  tempCtx.fill();
                  break;
                case 'extra-rounded':
                  tempCtx.beginPath();
                  tempCtx.arc(cx, cy, size / 2.2, 0, Math.PI * 2);
                  tempCtx.fill();
                  break;
                case 'diamond':
                  tempCtx.beginPath();
                  tempCtx.moveTo(cx, y + padding);
                  tempCtx.lineTo(x + padding + size, cy);
                  tempCtx.lineTo(cx, y + padding + size);
                  tempCtx.lineTo(x + padding, cy);
                  tempCtx.closePath();
                  tempCtx.fill();
                  break;
                case 'star':
                  const spikes = 4;
                  const outerRadius = size / 2;
                  const innerRadius = size / 4;
                  tempCtx.beginPath();
                  for (let i = 0; i < spikes * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / spikes - Math.PI / 2;
                    const px = cx + Math.cos(angle) * radius;
                    const py = cy + Math.sin(angle) * radius;
                    i === 0 ? tempCtx.moveTo(px, py) : tempCtx.lineTo(px, py);
                  }
                  tempCtx.closePath();
                  tempCtx.fill();
                  break;
                case 'heart':
                  const hs = size * 0.5;
                  tempCtx.beginPath();
                  tempCtx.moveTo(cx, cy + hs * 0.4);
                  tempCtx.bezierCurveTo(cx - hs, cy - hs * 0.5, cx - hs * 0.5, cy - hs, cx, cy - hs * 0.3);
                  tempCtx.bezierCurveTo(cx + hs * 0.5, cy - hs, cx + hs, cy - hs * 0.5, cx, cy + hs * 0.4);
                  tempCtx.fill();
                  break;
                case 'hexagon':
                  const hexSize = size / 2;
                  tempCtx.beginPath();
                  for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3 - Math.PI / 2;
                    const px = cx + Math.cos(angle) * hexSize;
                    const py = cy + Math.sin(angle) * hexSize;
                    i === 0 ? tempCtx.moveTo(px, py) : tempCtx.lineTo(px, py);
                  }
                  tempCtx.closePath();
                  tempCtx.fill();
                  break;
              }
            }
          }
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
      }

      // إضافة اللوجو
      if (settings.logo) {
        const logo = new Image();
        logo.onload = () => {
          const logoSize = actualSize * 0.2;
          const logoX = (canvas.width - logoSize) / 2;
          const logoY = (canvas.height - logoSize) / 2;
          
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8, 8);
          ctx.fill();
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        };
        logo.src = settings.logo;
      }
    } catch (error) {
      console.error('QR generation error:', error);
    }
  }, [inputValue, settings]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  const updateSettings = (newSettings: Partial<QRSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const applyTemplate = (template: QRTemplate) => {
    updateSettings({
      darkColor: template.primaryColor,
      pattern: template.pattern || 'squares',
    });
    toast.success(isRTL ? `تم تطبيق ${template.nameAr}` : `Applied ${template.name}`);
  };

  const luckyPick = () => {
    applyTemplate(getRandomTemplate());
    toast.success(isRTL ? '🎲 ضربة حظ!' : '🎲 Lucky pick!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateSettings({ logo: reader.result as string });
        toast.success(isRTL ? 'تم إضافة الشعار!' : 'Logo added!');
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = (format: 'png' | 'jpg') => {
    const canvas = canvasRef.current;
    if (!canvas || !inputValue) return;

    let dataUrl: string;
    if (format === 'jpg') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = settings.lightColor;
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(canvas, 0, 0);
        dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
      } else return;
    } else {
      dataUrl = canvas.toDataURL('image/png');
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `qrcode.${format}`;
    link.click();
    toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch (error) {
      toast.error(isRTL ? 'فشل النسخ' : 'Copy failed');
    }
  };

  const filteredCategories = selectedCategory 
    ? qrCategories.filter(c => c.id === selectedCategory)
    : qrCategories;

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد QR Code' : 'QR Code Generator'}
      description={isRTL ? 'أنشئ رموز QR مخصصة بأنماط وألوان مختلفة' : 'Create custom QR codes with various patterns and colors'}
      keywords="qr code, generator, qr maker"
      article={isRTL 
        ? 'أدخل الرابط أو النص، اختر القالب والنمط، ثم حمّل الرمز. يمكنك تخصيص الألوان والأنماط المختلفة لإنشاء رموز QR فريدة.'
        : 'Enter your URL or text, choose a template and pattern, then download your code. You can customize colors and patterns to create unique QR codes.'
      }
    >
      <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
        {/* الجانب الأيسر - المعاينة */}
        <div className="lg:w-[350px] flex-shrink-0">
          <div className="bg-card rounded-xl border border-border p-4 sticky top-4">
            <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center mb-4">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-lg"
                style={{ 
                  maxWidth: '280px', 
                  maxHeight: '280px',
                  backgroundColor: settings.transparentBg ? 'transparent' : settings.lightColor
                }}
              />
            </div>
            
            {/* أزرار التحميل والنسخ */}
            <div className="flex gap-2">
              <Button onClick={() => downloadQR('png')} className="flex-1 gap-2" size="sm">
                <Download className="w-4 h-4" />
                PNG
              </Button>
              <Button onClick={() => downloadQR('jpg')} variant="outline" className="flex-1 gap-2" size="sm">
                <Download className="w-4 h-4" />
                JPG
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن - الأدوات */}
        <div className="flex-1 space-y-4">
          {/* إدخال الرابط */}
          <div className="bg-card rounded-xl border border-border p-4">
            <label className="text-sm font-medium text-foreground mb-2 block">
              {isRTL ? 'أدخل الرابط أو النص' : 'Enter URL or Text'}
            </label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://example.com"
              className="text-base"
            />
          </div>

          {/* الإعدادات */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {isRTL ? 'الإعدادات' : 'Settings'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* الحجم */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  {isRTL ? 'الحجم' : 'Size'}: {settings.size}px
                </label>
                <Slider
                  value={[settings.size]}
                  onValueChange={([v]) => updateSettings({ size: v })}
                  min={200}
                  max={800}
                  step={50}
                  className="w-full"
                />
              </div>
              
              {/* الألوان */}
              <div className="flex items-end gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    {isRTL ? 'الأمامي' : 'Foreground'}
                  </label>
                  <ColorPicker
                    color={settings.darkColor}
                    onChange={(c) => updateSettings({ darkColor: c })}
                    label={isRTL ? 'لون الأمامي' : 'Foreground Color'}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    {isRTL ? 'الخلفية' : 'Background'}
                  </label>
                  <ColorPicker
                    color={settings.lightColor}
                    onChange={(c) => updateSettings({ lightColor: c })}
                    label={isRTL ? 'لون الخلفية' : 'Background Color'}
                  />
                </div>
                <Button
                  variant={settings.transparentBg ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSettings({ transparentBg: !settings.transparentBg })}
                  className="text-xs h-8"
                >
                  {isRTL ? 'شفاف' : 'Transparent'}
                </Button>
              </div>
            </div>

            {/* النمط */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {isRTL ? 'النمط' : 'Pattern'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {patterns.map((p) => (
                  <Button
                    key={p.id}
                    variant={settings.pattern === p.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSettings({ pattern: p.id })}
                    className="text-xs h-7 px-2"
                  >
                    {isRTL ? p.nameAr : p.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* رفع اللوجو */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {isRTL ? 'الشعار (اختياري)' : 'Logo (optional)'}
              </label>
              <div className="flex gap-2">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logoInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {isRTL ? 'رفع شعار' : 'Upload Logo'}
                </Button>
                {settings.logo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateSettings({ logo: null })}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* القوالب */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                {isRTL ? 'القوالب' : 'Templates'}
              </h3>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                      {selectedCategory 
                        ? qrCategories.find(c => c.id === selectedCategory)?.icon + ' ' + (isRTL ? qrCategories.find(c => c.id === selectedCategory)?.nameAr : qrCategories.find(c => c.id === selectedCategory)?.name)
                        : (isRTL ? 'كل الفئات' : 'All Categories')
                      }
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-1" align="end">
                    <Button
                      variant={selectedCategory === null ? 'secondary' : 'ghost'}
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => setSelectedCategory(null)}
                    >
                      {isRTL ? 'كل الفئات' : 'All Categories'}
                    </Button>
                    {qrCategories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? 'secondary' : 'ghost'}
                        size="sm"
                        className="w-full justify-start text-xs gap-2"
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        <span>{cat.icon}</span>
                        {isRTL ? cat.nameAr : cat.name}
                      </Button>
                    ))}
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm" onClick={luckyPick} className="gap-1 text-xs h-7">
                  <Sparkles className="w-3 h-3" />
                  {isRTL ? 'عشوائي' : 'Random'}
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[200px]">
              <div className="space-y-3">
                {filteredCategories.map((category) => (
                  <div key={category.id}>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <span>{category.icon}</span>
                      {isRTL ? category.nameAr : category.name}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.templates.slice(0, 8).map((template) => (
                        <button
                          key={template.id}
                          onClick={() => applyTemplate(template)}
                          className="w-6 h-6 rounded-md border border-border hover:scale-125 transition-transform"
                          style={{ 
                            backgroundColor: template.primaryColor,
                            background: template.gradient && template.secondaryColor
                              ? `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})`
                              : template.primaryColor
                          }}
                          title={isRTL ? template.nameAr : template.name}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
