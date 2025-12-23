import { useState, useRef, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Download, Copy, Link2, Wifi, Mail, Phone, MessageSquare, 
  FileText, Sparkles, Palette, Settings2, Upload,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { toast } from 'sonner';
import { qrCategories, getRandomTemplate, getAllTemplates, type QRTemplate } from '@/lib/qr/templates';

type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms';
type QRPattern = 'squares' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded' | 'diamond' | 'star' | 'heart' | 'hexagon';

interface QRSettings {
  size: number;
  margin: number;
  darkColor: string;
  lightColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  gradient: boolean;
  gradientColor: string;
  transparentBg: boolean;
  quality: number;
  pattern: QRPattern;
  logo: string | null;
}

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

const QRGenerator = () => {
  const { t, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [qrType, setQrType] = useState<QRType>('url');
  const [activeTab, setActiveTab] = useState('content');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showGradientPicker, setShowGradientPicker] = useState(false);
  
  const [history, setHistory] = useState<QRSettings[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const [urlInput, setUrlInput] = useState('https://');
  const [textInput, setTextInput] = useState('');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  const [settings, setSettings] = useState<QRSettings>({
    size: 300,
    margin: 2,
    darkColor: '#000000',
    lightColor: '#ffffff',
    errorCorrection: 'H',
    gradient: false,
    gradientColor: '#667eea',
    transparentBg: false,
    quality: 500,
    pattern: 'squares',
    logo: null,
  });

  const [darkHSL, setDarkHSL] = useState(hexToHSL('#000000'));
  const [gradientHSL, setGradientHSL] = useState(hexToHSL('#667eea'));

  const getQRData = useCallback((): string => {
    switch (qrType) {
      case 'url': return urlInput && urlInput !== 'https://' ? urlInput : '';
      case 'text': return textInput;
      case 'wifi': return wifiSSID ? `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;` : '';
      case 'email': return emailTo ? `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}` : '';
      case 'phone': return phoneNumber ? `tel:${phoneNumber}` : '';
      case 'sms': return smsNumber ? `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}` : '';
      default: return '';
    }
  }, [qrType, urlInput, textInput, wifiSSID, wifiPassword, wifiEncryption, emailTo, emailSubject, emailBody, phoneNumber, smsNumber, smsMessage]);

  const generateQR = useCallback(async () => {
    const data = getQRData();
    if (!data) return;

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const actualSize = settings.quality;

      await QRCode.toCanvas(canvas, data, {
        width: actualSize,
        margin: settings.margin,
        color: {
          dark: settings.darkColor,
          light: settings.transparentBg ? '#00000000' : settings.lightColor,
        },
        errorCorrectionLevel: settings.errorCorrection,
      });

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

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
        
        const moduleSize = actualSize / (25 + settings.margin * 2);
        
        for (let y = 0; y < canvas.height; y += moduleSize) {
          for (let x = 0; x < canvas.width; x += moduleSize) {
            const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
            const isDark = pixelData[pixelIndex] < 128;
            
            if (isDark) {
              tempCtx.fillStyle = settings.darkColor;
              const padding = moduleSize * 0.08;
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

      if (settings.gradient) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        
        const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : { r: 0, g: 0, b: 0 };
        };
        
        const startRgb = hexToRgb(settings.darkColor);
        const endRgb = hexToRgb(settings.gradientColor);
        
        for (let i = 0; i < pixelData.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          const ratio = (x + y) / (canvas.width + canvas.height);
          
          if (pixelData[i + 3] > 0 && (pixelData[i] < 200 || pixelData[i + 1] < 200 || pixelData[i + 2] < 200)) {
            pixelData[i] = Math.round(startRgb.r + (endRgb.r - startRgb.r) * ratio);
            pixelData[i + 1] = Math.round(startRgb.g + (endRgb.g - startRgb.g) * ratio);
            pixelData[i + 2] = Math.round(startRgb.b + (endRgb.b - startRgb.b) * ratio);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      if (settings.logo) {
        const logo = new Image();
        logo.onload = () => {
          const logoSize = actualSize * 0.25;
          const logoX = (canvas.width - logoSize) / 2;
          const logoY = (canvas.height - logoSize) / 2;
          
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        };
        logo.src = settings.logo;
      }
    } catch (error) {
      console.error('QR generation error:', error);
    }
  }, [getQRData, settings]);

  useEffect(() => {
    if (getQRData()) generateQR();
  }, [getQRData, settings, generateQR]);

  const saveToHistory = (newSettings: QRSettings) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...newSettings });
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSettings(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSettings(history[historyIndex + 1]);
    }
  };

  const updateSettings = (newSettings: Partial<QRSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveToHistory(updated);
  };

  const updateDarkColorFromHSL = (h: number, s: number, l: number) => {
    setDarkHSL({ h, s, l });
    updateSettings({ darkColor: hslToHex(h, s, l) });
  };

  const updateGradientColorFromHSL = (h: number, s: number, l: number) => {
    setGradientHSL({ h, s, l });
    updateSettings({ gradientColor: hslToHex(h, s, l) });
  };

  const applyTemplate = (template: QRTemplate) => {
    setSelectedTemplate(template);
    setDarkHSL(hexToHSL(template.primaryColor));
    if (template.secondaryColor) setGradientHSL(hexToHSL(template.secondaryColor));
    
    updateSettings({
      darkColor: template.primaryColor,
      gradient: template.gradient || false,
      gradientColor: template.secondaryColor || template.primaryColor,
      pattern: template.pattern || 'squares',
    });
    
    toast.success(isRTL ? `تم تطبيق قالب ${template.nameAr}` : `Applied ${template.name} template`);
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
        toast.success(isRTL ? 'تم إضافة اللوجو!' : 'Logo added!');
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = (format: 'png' | 'svg' | 'jpg') => {
    const canvas = canvasRef.current;
    const data = getQRData();
    if (!canvas || !data) return;

    if (format === 'svg') {
      QRCode.toString(data, {
        type: 'svg',
        width: settings.size,
        margin: settings.margin,
        color: { dark: settings.darkColor, light: settings.transparentBg ? 'transparent' : settings.lightColor },
      }).then((svg) => {
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.svg';
        link.click();
        URL.revokeObjectURL(url);
      });
      return;
    }

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
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const qrTypes = [
    { id: 'url', label: isRTL ? 'رابط' : 'URL', icon: Link2 },
    { id: 'text', label: isRTL ? 'نص' : 'Text', icon: FileText },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'email', label: isRTL ? 'بريد' : 'Email', icon: Mail },
    { id: 'phone', label: isRTL ? 'هاتف' : 'Phone', icon: Phone },
    { id: 'sms', label: 'SMS', icon: MessageSquare },
  ];

  const patterns: { id: QRPattern; label: string; labelAr: string }[] = [
    { id: 'squares', label: 'Squares', labelAr: 'مربعات' },
    { id: 'dots', label: 'Dots', labelAr: 'نقاط' },
    { id: 'rounded', label: 'Rounded', labelAr: 'مدور' },
    { id: 'classy', label: 'Classy', labelAr: 'أنيق' },
    { id: 'classy-rounded', label: 'Classy+', labelAr: 'أنيق+' },
    { id: 'extra-rounded', label: 'Circle', labelAr: 'دائري' },
    { id: 'diamond', label: 'Diamond', labelAr: 'ماسي' },
    { id: 'star', label: 'Star', labelAr: 'نجمة' },
    { id: 'heart', label: 'Heart', labelAr: 'قلب' },
    { id: 'hexagon', label: 'Hexagon', labelAr: 'سداسي' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? getAllTemplates() 
    : qrCategories.find(c => c.id === selectedCategory)?.templates || [];

  const hasData = !!getQRData();

  const ColorPickerPopup = ({ 
    hsl, 
    onHSLChange, 
    open, 
    onOpenChange,
    color 
  }: { 
    hsl: { h: number; s: number; l: number }; 
    onHSLChange: (h: number, s: number, l: number) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    color: string;
  }) => (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="w-10 h-10 rounded-lg border-2 border-border shadow-sm hover:scale-105 transition-transform"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <div 
            className="w-full h-32 rounded-lg cursor-crosshair relative overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, white, transparent, black), 
                          linear-gradient(to right, #ccc, hsl(${hsl.h}, 100%, 50%))`,
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
              onHSLChange(hsl.h, Math.round(x * 100), Math.round((1 - y) * 100));
            }}
          >
            <div 
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${hsl.s}%`, top: `${100 - hsl.l}%`, backgroundColor: color }}
            />
          </div>
          <div 
            className="h-4 rounded-full cursor-pointer relative"
            style={{ background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              onHSLChange(Math.round(x * 360), hsl.s, hsl.l);
            }}
          >
            <div 
              className="absolute w-4 h-4 bg-white border-2 border-gray-400 rounded-full shadow -translate-x-1/2 pointer-events-none top-0"
              style={{ left: `${(hsl.h / 360) * 100}%` }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <ToolPageLayout
      title={t.tools.qrGenerator.name}
      description={t.tools.qrGenerator.description}
      article={t.tools.qrGenerator.article}
      keywords="QR code, QR generator, create QR, WiFi QR, URL QR, مولد QR, رمز QR"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6">
        {/* Left: QR Preview - Fixed */}
        <div className="lg:sticky lg:top-24 lg:h-fit space-y-4">
          <div className="glass-card p-4 rounded-2xl">
            <div 
              className="relative rounded-xl p-3 flex items-center justify-center mx-auto border border-border"
              style={{
                background: settings.transparentBg 
                  ? 'repeating-conic-gradient(#e0e0e0 0% 25%, #ffffff 0% 50%) 50% / 12px 12px'
                  : settings.lightColor,
                aspectRatio: '1',
              }}
            >
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full"
                style={{ display: hasData ? 'block' : 'none' }}
              />
              {!hasData && (
                <p className="text-muted-foreground text-center px-4 text-sm">
                  {isRTL ? 'أدخل البيانات لإنشاء QR' : 'Enter data to generate QR'}
                </p>
              )}
            </div>

            {hasData && (
              <div className="flex gap-2 mt-3 flex-wrap justify-center">
                <Button onClick={() => downloadQR('png')} size="sm" variant="outline">
                  <Download className="w-3 h-3 me-1" /> PNG
                </Button>
                <Button onClick={() => downloadQR('svg')} size="sm" variant="outline">
                  <Download className="w-3 h-3 me-1" /> SVG
                </Button>
                <Button onClick={copyToClipboard} size="sm" variant="outline">
                  <Copy className="w-3 h-3 me-1" /> {isRTL ? 'نسخ' : 'Copy'}
                </Button>
              </div>
            )}
          </div>

          {/* Quick Settings */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{isRTL ? 'الألوان' : 'Colors'}</span>
              <div className="flex items-center gap-2">
                <ColorPickerPopup 
                  hsl={darkHSL} 
                  onHSLChange={updateDarkColorFromHSL}
                  open={showColorPicker}
                  onOpenChange={setShowColorPicker}
                  color={settings.darkColor}
                />
                {settings.gradient && (
                  <ColorPickerPopup 
                    hsl={gradientHSL} 
                    onHSLChange={updateGradientColorFromHSL}
                    open={showGradientPicker}
                    onOpenChange={setShowGradientPicker}
                    color={settings.gradientColor}
                  />
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">{isRTL ? 'تدرج' : 'Gradient'}</span>
              <Switch checked={settings.gradient} onCheckedChange={(gradient) => updateSettings({ gradient })} />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">{isRTL ? 'شفاف' : 'Transparent'}</span>
              <Switch checked={settings.transparentBg} onCheckedChange={(transparentBg) => updateSettings({ transparentBg })} />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{isRTL ? 'الجودة' : 'Quality'}</span>
                <span className="text-muted-foreground">{settings.quality}px</span>
              </div>
              <Slider
                value={[settings.quality]}
                onValueChange={([quality]) => updateSettings({ quality })}
                min={200}
                max={1000}
                step={50}
              />
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="glass-card p-5 rounded-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'المحتوى' : 'Content'}</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-1">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'القوالب' : 'Templates'}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings2 className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'الإعدادات' : 'Settings'}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {qrTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setQrType(type.id as QRType)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      qrType === type.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-muted/50 hover:border-primary/50'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="text-xs">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {qrType === 'url' && (
                  <Input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="https://example.com" dir="ltr" />
                )}
                {qrType === 'text' && (
                  <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder={isRTL ? 'أدخل النص...' : 'Enter text...'} rows={3} />
                )}
                {qrType === 'wifi' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder={isRTL ? 'اسم الشبكة' : 'Network name'} dir="ltr" />
                    <Input type="password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder={isRTL ? 'كلمة المرور' : 'Password'} dir="ltr" />
                    <div className="flex gap-1 sm:col-span-2">
                      {['WPA', 'WEP', 'nopass'].map((enc) => (
                        <button key={enc} onClick={() => setWifiEncryption(enc as any)} className={`flex-1 px-3 py-1.5 rounded-lg text-sm ${wifiEncryption === enc ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {enc === 'nopass' ? (isRTL ? 'بدون' : 'None') : enc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {qrType === 'email' && (
                  <div className="space-y-2">
                    <Input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} placeholder="example@email.com" dir="ltr" />
                    <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder={isRTL ? 'الموضوع' : 'Subject'} />
                    <Textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder={isRTL ? 'الرسالة' : 'Message'} rows={2} />
                  </div>
                )}
                {qrType === 'phone' && (
                  <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" dir="ltr" />
                )}
                {qrType === 'sms' && (
                  <div className="space-y-2">
                    <Input type="tel" value={smsNumber} onChange={(e) => setSmsNumber(e.target.value)} placeholder="+1234567890" dir="ltr" />
                    <Textarea value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} placeholder={isRTL ? 'الرسالة' : 'Message'} rows={2} />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={luckyPick} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Sparkles className="w-4 h-4 me-2" /> {isRTL ? '🎲 ضربة حظ' : '🎲 Lucky Pick'}
                </Button>
                <Button onClick={undo} variant="outline" size="icon" disabled={historyIndex <= 0}><ChevronLeft className="w-4 h-4" /></Button>
                <Button onClick={redo} variant="outline" size="icon" disabled={historyIndex >= history.length - 1}><ChevronRight className="w-4 h-4" /></Button>
              </div>

              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {isRTL ? 'الكل' : 'All'}
                  </button>
                  {qrCategories.map((cat) => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1 ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <span>{cat.icon}</span>
                      <span>{isRTL ? cat.nameAr : cat.name}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>

              <ScrollArea className="h-[250px]">
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 p-1">
                  {filteredTemplates.map((template) => {
                    const patternIcon = template.pattern === 'dots' ? '●' : template.pattern === 'rounded' ? '▢' : template.pattern === 'diamond' ? '◆' : template.pattern === 'star' ? '★' : template.pattern === 'heart' ? '♥' : '';
                    return (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className={`aspect-square rounded-lg border-2 transition-transform hover:scale-110 relative overflow-hidden ${
                          selectedTemplate?.id === template.id ? 'border-primary ring-2 ring-primary/50' : 'border-transparent'
                        }`}
                        style={{ background: template.gradient && template.secondaryColor ? `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})` : template.primaryColor }}
                        title={isRTL ? template.nameAr : template.name}
                      >
                        {patternIcon && <span className="absolute bottom-0.5 right-0.5 text-[8px] opacity-70 text-white drop-shadow">{patternIcon}</span>}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{isRTL ? 'نمط الـ QR' : 'QR Pattern'}</label>
                <div className="grid grid-cols-5 gap-2">
                  {patterns.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => updateSettings({ pattern: p.id })}
                      className={`flex flex-col items-center gap-0.5 p-2 rounded-lg border transition-all ${
                        settings.pattern === p.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center text-[10px]">
                        {p.id === 'squares' && <div className="w-4 h-4 bg-current" />}
                        {p.id === 'dots' && <div className="w-4 h-4 bg-current rounded-full" />}
                        {p.id === 'rounded' && <div className="w-4 h-4 bg-current rounded-md" />}
                        {p.id === 'classy' && <div className="w-4 h-4 bg-current rounded-tl-full rounded-br-full" />}
                        {p.id === 'classy-rounded' && <div className="w-4 h-4 bg-current rounded-tl-xl rounded-br-xl" />}
                        {p.id === 'extra-rounded' && <div className="w-5 h-5 bg-current rounded-full" />}
                        {p.id === 'diamond' && <div className="w-3.5 h-3.5 bg-current rotate-45" />}
                        {p.id === 'star' && '★'}
                        {p.id === 'heart' && '♥'}
                        {p.id === 'hexagon' && '⬡'}
                      </div>
                      <span className="text-[9px]">{isRTL ? p.labelAr : p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{isRTL ? 'إضافة لوجو' : 'Add Logo'}</label>
                <div className="flex gap-2">
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <Button variant="outline" onClick={() => logoInputRef.current?.click()} className="flex-1">
                    <Upload className="w-4 h-4 me-2" />
                    {settings.logo ? (isRTL ? 'تغيير' : 'Change') : (isRTL ? 'رفع لوجو' : 'Upload')}
                  </Button>
                  {settings.logo && (
                    <Button variant="destructive" size="icon" onClick={() => updateSettings({ logo: null })}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {settings.logo && (
                  <div className="mt-2 flex justify-center">
                    <img src={settings.logo} alt="Logo" className="h-12 w-12 object-contain rounded" />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
