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
import { 
  Download, Copy, Link2, Wifi, Mail, Phone, MessageSquare, 
  FileText, Sparkles, Palette, Settings2, Upload,
  ChevronLeft, ChevronRight, Square, Circle, RectangleHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import { qrCategories, getRandomTemplate, getAllTemplates, getTemplateGradient, QRTemplate } from '@/lib/qr/templates';

type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms';
type QRPattern = 'squares' | 'dots' | 'rounded';

interface QRSettings {
  size: number;
  margin: number;
  darkColor: string;
  lightColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  gradient: boolean;
  gradientColor: string;
  transparentBg: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  pattern: QRPattern;
  logo: string | null;
}

const qualitySettings = {
  low: { size: 200 },
  medium: { size: 300 },
  high: { size: 500 },
  ultra: { size: 800 },
};

// Color sliders helper
const hexToHSL = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  
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
  
  // History for undo/redo
  const [history, setHistory] = useState<QRSettings[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // QR Content fields
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

  // QR Settings
  const [settings, setSettings] = useState<QRSettings>({
    size: 300,
    margin: 2,
    darkColor: '#000000',
    lightColor: '#ffffff',
    errorCorrection: 'H',
    gradient: false,
    gradientColor: '#667eea',
    transparentBg: false,
    quality: 'high',
    pattern: 'squares',
    logo: null,
  });

  // Color HSL values for sliders
  const [darkHSL, setDarkHSL] = useState(hexToHSL('#000000'));
  const [gradientHSL, setGradientHSL] = useState(hexToHSL('#667eea'));

  // Get QR data based on type
  const getQRData = useCallback((): string => {
    switch (qrType) {
      case 'url':
        return urlInput && urlInput !== 'https://' ? urlInput : '';
      case 'text':
        return textInput;
      case 'wifi':
        return wifiSSID ? `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;` : '';
      case 'email':
        return emailTo ? `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}` : '';
      case 'phone':
        return phoneNumber ? `tel:${phoneNumber}` : '';
      case 'sms':
        return smsNumber ? `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}` : '';
      default:
        return '';
    }
  }, [qrType, urlInput, textInput, wifiSSID, wifiPassword, wifiEncryption, emailTo, emailSubject, emailBody, phoneNumber, smsNumber, smsMessage]);

  // Generate QR code
  const generateQR = useCallback(async () => {
    const data = getQRData();
    if (!data) return;

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const qualitySize = qualitySettings[settings.quality].size;
      const actualSize = Math.max(settings.size, qualitySize);

      // Generate basic QR
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

      // Apply pattern modifications
      if (settings.pattern !== 'squares') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Create a temporary canvas for pattern effect
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d')!;
        
        // Clear with background or transparent
        if (settings.transparentBg) {
          tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        } else {
          tempCtx.fillStyle = settings.lightColor;
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }
        
        // Calculate module size (approximate)
        const moduleSize = actualSize / (25 + settings.margin * 2);
        
        for (let y = 0; y < canvas.height; y += moduleSize) {
          for (let x = 0; x < canvas.width; x += moduleSize) {
            const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
            const isDark = data[pixelIndex] < 128;
            
            if (isDark) {
              tempCtx.fillStyle = settings.darkColor;
              const padding = moduleSize * 0.1;
              const size = moduleSize - padding * 2;
              
              if (settings.pattern === 'dots') {
                tempCtx.beginPath();
                tempCtx.arc(x + moduleSize / 2, y + moduleSize / 2, size / 2, 0, Math.PI * 2);
                tempCtx.fill();
              } else if (settings.pattern === 'rounded') {
                const radius = size * 0.3;
                tempCtx.beginPath();
                tempCtx.roundRect(x + padding, y + padding, size, size, radius);
                tempCtx.fill();
              }
            }
          }
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
      }

      // Apply gradient if enabled
      if (settings.gradient) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
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
        
        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          const ratio = (x + y) / (canvas.width + canvas.height);
          
          // Only apply to non-transparent dark pixels
          if (data[i + 3] > 0 && (data[i] < 200 || data[i + 1] < 200 || data[i + 2] < 200)) {
            data[i] = Math.round(startRgb.r + (endRgb.r - startRgb.r) * ratio);
            data[i + 1] = Math.round(startRgb.g + (endRgb.g - startRgb.g) * ratio);
            data[i + 2] = Math.round(startRgb.b + (endRgb.b - startRgb.b) * ratio);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      // Add logo if present
      if (settings.logo) {
        const logo = new Image();
        logo.onload = () => {
          const logoSize = actualSize * 0.25;
          const logoX = (canvas.width - logoSize) / 2;
          const logoY = (canvas.height - logoSize) / 2;
          
          // Draw white background for logo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
          
          // Draw logo
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        };
        logo.src = settings.logo;
      }
    } catch (error) {
      console.error('QR generation error:', error);
    }
  }, [getQRData, settings]);

  // Auto-generate QR when data or settings change
  useEffect(() => {
    const data = getQRData();
    if (data) {
      generateQR();
    }
  }, [getQRData, settings, generateQR]);

  // Save to history when settings change significantly
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

  // Update color from HSL sliders
  const updateDarkColorFromHSL = (h: number, s: number, l: number) => {
    const hex = hslToHex(h, s, l);
    setDarkHSL({ h, s, l });
    updateSettings({ darkColor: hex });
  };

  const updateGradientColorFromHSL = (h: number, s: number, l: number) => {
    const hex = hslToHex(h, s, l);
    setGradientHSL({ h, s, l });
    updateSettings({ gradientColor: hex });
  };

  // Apply template
  const applyTemplate = (template: QRTemplate) => {
    setSelectedTemplate(template);
    const newDarkHSL = hexToHSL(template.primaryColor);
    setDarkHSL(newDarkHSL);
    
    if (template.secondaryColor) {
      const newGradientHSL = hexToHSL(template.secondaryColor);
      setGradientHSL(newGradientHSL);
    }
    
    updateSettings({
      darkColor: template.primaryColor,
      gradient: template.gradient || false,
      gradientColor: template.secondaryColor || template.primaryColor,
      pattern: template.pattern || 'squares',
    });
    
    toast.success(isRTL ? `تم تطبيق قالب ${template.nameAr}` : `Applied ${template.name} template`);
  };

  // Lucky pick
  const luckyPick = () => {
    const template = getRandomTemplate();
    applyTemplate(template);
    toast.success(isRTL ? '🎲 ضربة حظ!' : '🎲 Lucky pick!');
  };

  // Handle logo upload
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

  const removeLogo = () => {
    updateSettings({ logo: null });
    toast.success(isRTL ? 'تم إزالة اللوجو' : 'Logo removed');
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
        color: {
          dark: settings.darkColor,
          light: settings.transparentBg ? 'transparent' : settings.lightColor,
        },
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
    let filename: string;

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
        filename = 'qrcode.jpg';
      } else {
        return;
      }
    } else {
      dataUrl = canvas.toDataURL('image/png');
      filename = 'qrcode.png';
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
    
    toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
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

  const patterns: { id: QRPattern; label: string; labelAr: string; icon: React.ElementType }[] = [
    { id: 'squares', label: 'Squares', labelAr: 'مربعات', icon: Square },
    { id: 'dots', label: 'Dots', labelAr: 'نقاط', icon: Circle },
    { id: 'rounded', label: 'Rounded', labelAr: 'مدور', icon: RectangleHorizontal },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? getAllTemplates() 
    : qrCategories.find(c => c.id === selectedCategory)?.templates || [];

  const hasData = !!getQRData();

  return (
    <ToolPageLayout
      title={t.tools.qrGenerator.name}
      description={t.tools.qrGenerator.description}
      article={t.tools.qrGenerator.article}
      keywords="QR code, QR generator, create QR, WiFi QR, URL QR, مولد QR, رمز QR"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* QR Preview - Always Visible at Top */}
        <div className="flex flex-col items-center">
          <div 
            className="relative rounded-2xl p-6 flex items-center justify-center"
            style={{
              background: settings.transparentBg 
                ? 'repeating-conic-gradient(#e0e0e0 0% 25%, #ffffff 0% 50%) 50% / 16px 16px'
                : settings.lightColor,
              minHeight: '280px',
              minWidth: '280px',
            }}
          >
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[260px]"
              style={{ display: hasData ? 'block' : 'none' }}
            />
            {!hasData && (
              <p className="text-muted-foreground text-center px-8">
                {isRTL ? 'أدخل البيانات لإنشاء QR' : 'Enter data to generate QR'}
              </p>
            )}
          </div>

          {/* Quick Actions */}
          {hasData && (
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              <Button onClick={() => downloadQR('png')} size="sm" variant="outline">
                <Download className="w-4 h-4 me-1" /> PNG
              </Button>
              <Button onClick={() => downloadQR('svg')} size="sm" variant="outline">
                <Download className="w-4 h-4 me-1" /> SVG
              </Button>
              <Button onClick={copyToClipboard} size="sm" variant="outline">
                <Copy className="w-4 h-4 me-1" /> {isRTL ? 'نسخ' : 'Copy'}
              </Button>
            </div>
          )}
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
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

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4 mt-4">
            {/* QR Type Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {qrTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setQrType(type.id as QRType)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                    qrType === type.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </div>

            {/* Content Input */}
            <div className="space-y-3">
              {qrType === 'url' && (
                <Input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  dir="ltr"
                />
              )}

              {qrType === 'text' && (
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={isRTL ? 'أدخل النص هنا...' : 'Enter your text here...'}
                  rows={3}
                />
              )}

              {qrType === 'wifi' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={wifiSSID}
                    onChange={(e) => setWifiSSID(e.target.value)}
                    placeholder={isRTL ? 'اسم الشبكة' : 'Network name'}
                    dir="ltr"
                  />
                  <Input
                    type="password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder={isRTL ? 'كلمة المرور' : 'Password'}
                    dir="ltr"
                  />
                  <div className="flex gap-1 sm:col-span-2">
                    {['WPA', 'WEP', 'nopass'].map((enc) => (
                      <button
                        key={enc}
                        onClick={() => setWifiEncryption(enc as any)}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-sm ${
                          wifiEncryption === enc
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {enc === 'nopass' ? (isRTL ? 'بدون' : 'None') : enc}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {qrType === 'email' && (
                <div className="space-y-2">
                  <Input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  <Input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder={isRTL ? 'الموضوع' : 'Subject'}
                  />
                  <Textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder={isRTL ? 'الرسالة' : 'Message'}
                    rows={2}
                  />
                </div>
              )}

              {qrType === 'phone' && (
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                  dir="ltr"
                />
              )}

              {qrType === 'sms' && (
                <div className="space-y-2">
                  <Input
                    type="tel"
                    value={smsNumber}
                    onChange={(e) => setSmsNumber(e.target.value)}
                    placeholder="+1234567890"
                    dir="ltr"
                  />
                  <Textarea
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    placeholder={isRTL ? 'الرسالة' : 'Message'}
                    rows={2}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4 mt-4">
            {/* Lucky & Undo Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={luckyPick} 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="w-4 h-4 me-2" />
                {isRTL ? '🎲 ضربة حظ' : '🎲 Lucky Pick'}
              </Button>
              <Button onClick={undo} variant="outline" size="icon" disabled={historyIndex <= 0}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button onClick={redo} variant="outline" size="icon" disabled={historyIndex >= history.length - 1}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Category Filter */}
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isRTL ? 'الكل' : 'All'}
                </button>
                {qrCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1 ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{isRTL ? cat.nameAr : cat.name}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* Templates Grid */}
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 p-1">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className={`aspect-square rounded-lg border-2 transition-transform hover:scale-110 ${
                      selectedTemplate?.id === template.id
                        ? 'border-primary ring-2 ring-primary/50'
                        : 'border-transparent'
                    }`}
                    style={{ background: getTemplateGradient(template) }}
                    title={isRTL ? template.nameAr : template.name}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4 mt-4">
            {/* Pattern Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'نمط الـ QR' : 'QR Pattern'}
              </label>
              <div className="flex gap-2">
                {patterns.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => updateSettings({ pattern: p.id })}
                    className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                      settings.pattern === p.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-muted/50'
                    }`}
                  >
                    <p.icon className="w-5 h-5" />
                    <span className="text-xs">{isRTL ? p.labelAr : p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'إضافة لوجو' : 'Add Logo'}
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
                  onClick={() => logoInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 me-2" />
                  {settings.logo ? (isRTL ? 'تغيير اللوجو' : 'Change Logo') : (isRTL ? 'رفع لوجو' : 'Upload Logo')}
                </Button>
                {settings.logo && (
                  <Button variant="destructive" size="icon" onClick={removeLogo}>
                    ✕
                  </Button>
                )}
              </div>
              {settings.logo && (
                <div className="mt-2 flex justify-center">
                  <img src={settings.logo} alt="Logo" className="h-12 w-12 object-contain rounded" />
                </div>
              )}
            </div>

            {/* Quality & Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{isRTL ? 'الجودة' : 'Quality'}</label>
                <div className="flex gap-1">
                  {(['medium', 'high', 'ultra'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => updateSettings({ quality: q })}
                      className={`flex-1 py-1.5 rounded text-xs ${
                        settings.quality === q
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {q === 'medium' ? (isRTL ? 'متوسط' : 'Med') :
                       q === 'high' ? (isRTL ? 'عالي' : 'High') : (isRTL ? 'فائق' : 'Ultra')}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'الحجم' : 'Size'}: {settings.size}px
                </label>
                <Slider
                  value={[settings.size]}
                  onValueChange={([size]) => updateSettings({ size })}
                  min={150}
                  max={600}
                  step={10}
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <label className="text-sm">{isRTL ? 'تدرج الألوان' : 'Gradient'}</label>
                <Switch
                  checked={settings.gradient}
                  onCheckedChange={(gradient) => updateSettings({ gradient })}
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <label className="text-sm">{isRTL ? 'خلفية شفافة' : 'Transparent'}</label>
                <Switch
                  checked={settings.transparentBg}
                  onCheckedChange={(transparentBg) => updateSettings({ transparentBg })}
                />
              </div>
            </div>

            {/* Color Sliders */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'لون الـ QR' : 'QR Color'}
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: settings.darkColor }}
                    />
                    <span className="text-xs text-muted-foreground w-16">H: {darkHSL.h}°</span>
                    <Slider
                      value={[darkHSL.h]}
                      onValueChange={([h]) => updateDarkColorFromHSL(h, darkHSL.s, darkHSL.l)}
                      min={0}
                      max={360}
                      className="flex-1"
                      style={{
                        background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16">S: {darkHSL.s}%</span>
                    <Slider
                      value={[darkHSL.s]}
                      onValueChange={([s]) => updateDarkColorFromHSL(darkHSL.h, s, darkHSL.l)}
                      min={0}
                      max={100}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16">L: {darkHSL.l}%</span>
                    <Slider
                      value={[darkHSL.l]}
                      onValueChange={([l]) => updateDarkColorFromHSL(darkHSL.h, darkHSL.s, l)}
                      min={0}
                      max={100}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {settings.gradient && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'لون التدرج' : 'Gradient Color'}
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: settings.gradientColor }}
                      />
                      <span className="text-xs text-muted-foreground w-16">H: {gradientHSL.h}°</span>
                      <Slider
                        value={[gradientHSL.h]}
                        onValueChange={([h]) => updateGradientColorFromHSL(h, gradientHSL.s, gradientHSL.l)}
                        min={0}
                        max={360}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-16">S: {gradientHSL.s}%</span>
                      <Slider
                        value={[gradientHSL.s]}
                        onValueChange={([s]) => updateGradientColorFromHSL(gradientHSL.h, s, gradientHSL.l)}
                        min={0}
                        max={100}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-16">L: {gradientHSL.l}%</span>
                      <Slider
                        value={[gradientHSL.l]}
                        onValueChange={([l]) => updateGradientColorFromHSL(gradientHSL.h, gradientHSL.s, l)}
                        min={0}
                        max={100}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
