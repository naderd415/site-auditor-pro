import { useState, useRef, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Download, Copy, Link2, Wifi, Mail, Phone, MessageSquare, 
  FileText, Sparkles, Upload, X
} from 'lucide-react';
import { toast } from 'sonner';
import { qrCategories, getRandomTemplate, type QRTemplate } from '@/lib/qr/templates';

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

// Color Picker Component
const ColorPicker = ({ 
  color, 
  onChange, 
  label 
}: { 
  color: string; 
  onChange: (color: string) => void; 
  label: string;
}) => {
  const hsl = hexToHSL(color);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-10 h-10 rounded-lg border-2 border-border shadow-sm hover:scale-105 transition-transform"
          style={{ backgroundColor: color }}
          title={label}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <p className="text-sm font-medium">{label}</p>
          
          {/* Saturation/Lightness Box */}
          <div 
            className="w-full h-32 rounded-lg relative cursor-crosshair"
            style={{
              background: `linear-gradient(to bottom, white, transparent, black), 
                           linear-gradient(to right, gray, hsl(${hsl.h}, 100%, 50%))`
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
              const newS = Math.round(x * 100);
              const newL = Math.round((1 - y) * 100);
              onChange(hslToHex(hsl.h, newS, newL));
            }}
          >
            <div 
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ 
                left: `${hsl.s}%`, 
                top: `${100 - hsl.l}%`,
                backgroundColor: color
              }}
            />
          </div>
          
          {/* Hue Slider */}
          <div 
            className="w-full h-4 rounded-full cursor-pointer relative"
            style={{
              background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const newH = Math.round(x * 360);
              onChange(hslToHex(newH, hsl.s, hsl.l));
            }}
          >
            <div 
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg -translate-x-1/2 top-0 pointer-events-none"
              style={{ 
                left: `${(hsl.h / 360) * 100}%`,
                backgroundColor: `hsl(${hsl.h}, 100%, 50%)`
              }}
            />
          </div>
          
          {/* Hex Input */}
          <Input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono text-sm"
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const QRGenerator = () => {
  const { t, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [qrType, setQrType] = useState<QRType>('url');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Input states
  const [urlInput, setUrlInput] = useState('https://example.com');
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

  const getQRData = useCallback((): string => {
    switch (qrType) {
      case 'url': return urlInput || '';
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

      // Apply pattern
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

      // Apply gradient
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

      // Add logo
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

  const updateSettings = (newSettings: Partial<QRSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const applyTemplate = (template: QRTemplate) => {
    updateSettings({
      darkColor: template.primaryColor,
      gradient: template.gradient || false,
      gradientColor: template.secondaryColor || template.primaryColor,
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

  const patterns: { id: QRPattern; label: string }[] = [
    { id: 'squares', label: '▪️' },
    { id: 'dots', label: '●' },
    { id: 'rounded', label: '▢' },
    { id: 'classy', label: '◆' },
    { id: 'classy-rounded', label: '◇' },
    { id: 'extra-rounded', label: '○' },
    { id: 'diamond', label: '◈' },
    { id: 'star', label: '★' },
    { id: 'heart', label: '♥' },
    { id: 'hexagon', label: '⬡' },
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? qrCategories 
    : qrCategories.filter(c => c.id === selectedCategory);

  const articleContent = isRTL 
    ? `مولد رموز QR المجاني هو أداة قوية لإنشاء رموز QR مخصصة بأنماط وألوان متعددة.

يمكنك إنشاء رموز QR للروابط والنصوص وشبكات WiFi والبريد الإلكتروني وأرقام الهواتف والرسائل النصية.

اختر من بين أكثر من 200 قالب جاهز أو خصص الألوان والأنماط حسب ذوقك.`
    : `Our free QR Code Generator is a powerful tool for creating customized QR codes with various patterns and colors.

You can generate QR codes for URLs, text, WiFi networks, email, phone numbers, and SMS messages.

Choose from over 200 ready-made templates or customize colors and patterns to your liking.`;

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد QR Code' : 'QR Code Generator'}
      description={isRTL ? 'أنشئ رموز QR مخصصة بأنماط وألوان متعددة' : 'Create customized QR codes with various patterns and colors'}
      article={articleContent}
      keywords={isRTL ? 'مولد qr, رمز qr, باركود, كيو ار كود' : 'qr generator, qr code, barcode, qr maker'}
    >
      <div className={`flex flex-col lg:flex-row gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Left Side - QR Preview */}
        <div className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
            {/* QR Display */}
            <div 
              className="flex items-center justify-center rounded-xl p-4 mb-4"
              style={{ 
                backgroundColor: settings.transparentBg ? 'transparent' : settings.lightColor,
                backgroundImage: settings.transparentBg ? 'repeating-conic-gradient(#e5e5e5 0% 25%, transparent 0% 50%) 50% / 16px 16px' : 'none'
              }}
            >
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto"
                style={{ width: '200px', height: '200px' }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <Button onClick={() => downloadQR('png')} className="flex-1" size="sm">
                <Download className="w-4 h-4 mr-1" /> PNG
              </Button>
              <Button onClick={() => downloadQR('svg')} variant="outline" className="flex-1" size="sm">
                SVG
              </Button>
              <Button onClick={() => downloadQR('jpg')} variant="outline" className="flex-1" size="sm">
                JPG
              </Button>
            </div>
            
            <Button onClick={copyToClipboard} variant="secondary" className="w-full" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              {isRTL ? 'نسخ' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Right Side - Settings */}
        <div className="lg:w-2/3 space-y-4">
          
          {/* Content Type */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-medium mb-3 text-sm">{isRTL ? 'نوع المحتوى' : 'Content Type'}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {qrTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setQrType(type.id as QRType)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    qrType === type.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>

            {/* Input Fields */}
            {qrType === 'url' && (
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
              />
            )}
            {qrType === 'text' && (
              <Textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={isRTL ? 'أدخل النص...' : 'Enter text...'}
                rows={3}
              />
            )}
            {qrType === 'wifi' && (
              <div className="space-y-2">
                <Input placeholder="SSID" value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} />
                <Input placeholder={isRTL ? 'كلمة المرور' : 'Password'} type="password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} />
              </div>
            )}
            {qrType === 'email' && (
              <div className="space-y-2">
                <Input placeholder={isRTL ? 'البريد الإلكتروني' : 'Email'} value={emailTo} onChange={(e) => setEmailTo(e.target.value)} />
                <Input placeholder={isRTL ? 'الموضوع' : 'Subject'} value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
              </div>
            )}
            {qrType === 'phone' && (
              <Input placeholder={isRTL ? 'رقم الهاتف' : 'Phone number'} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            )}
            {qrType === 'sms' && (
              <div className="space-y-2">
                <Input placeholder={isRTL ? 'رقم الهاتف' : 'Phone number'} value={smsNumber} onChange={(e) => setSmsNumber(e.target.value)} />
                <Input placeholder={isRTL ? 'الرسالة' : 'Message'} value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} />
              </div>
            )}
          </div>

          {/* Patterns */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-medium mb-3 text-sm">{isRTL ? 'النمط' : 'Pattern'}</h3>
            <div className="flex flex-wrap gap-2">
              {patterns.map(p => (
                <button
                  key={p.id}
                  onClick={() => updateSettings({ pattern: p.id })}
                  className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-all ${
                    settings.pattern === p.id 
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  title={p.id}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-medium mb-3 text-sm">{isRTL ? 'الألوان' : 'Colors'}</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{isRTL ? 'أساسي' : 'Primary'}</span>
                <ColorPicker 
                  color={settings.darkColor} 
                  onChange={(c) => updateSettings({ darkColor: c })}
                  label={isRTL ? 'اللون الأساسي' : 'Primary Color'}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{isRTL ? 'خلفية' : 'Background'}</span>
                <ColorPicker 
                  color={settings.lightColor} 
                  onChange={(c) => updateSettings({ lightColor: c })}
                  label={isRTL ? 'لون الخلفية' : 'Background Color'}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.transparentBg}
                  onCheckedChange={(c) => updateSettings({ transparentBg: c })}
                />
                <span className="text-xs">{isRTL ? 'شفاف' : 'Transparent'}</span>
              </div>
            </div>

            {/* Gradient */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">{isRTL ? 'تدرج' : 'Gradient'}</span>
                <Switch
                  checked={settings.gradient}
                  onCheckedChange={(c) => updateSettings({ gradient: c })}
                />
              </div>
              {settings.gradient && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{isRTL ? 'لون التدرج' : 'Gradient'}</span>
                  <ColorPicker 
                    color={settings.gradientColor} 
                    onChange={(c) => updateSettings({ gradientColor: c })}
                    label={isRTL ? 'لون التدرج' : 'Gradient Color'}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quality & Size */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-medium mb-3 text-sm">{isRTL ? 'الجودة والحجم' : 'Quality & Size'}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>{isRTL ? 'الجودة' : 'Quality'}</span>
                  <span>{settings.quality}px</span>
                </div>
                <Slider
                  value={[settings.quality]}
                  onValueChange={([v]) => updateSettings({ quality: v })}
                  min={200}
                  max={1000}
                  step={100}
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>{isRTL ? 'الهامش' : 'Margin'}</span>
                  <span>{settings.margin}</span>
                </div>
                <Slider
                  value={[settings.margin]}
                  onValueChange={([v]) => updateSettings({ margin: v })}
                  min={0}
                  max={6}
                  step={1}
                />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-medium mb-3 text-sm">{isRTL ? 'الشعار' : 'Logo'}</h3>
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
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

          {/* Templates */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">{isRTL ? 'القوالب' : 'Templates'}</h3>
              <Button onClick={luckyPick} variant="ghost" size="sm">
                <Sparkles className="w-4 h-4 mr-1" />
                {isRTL ? 'عشوائي' : 'Random'}
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {isRTL ? 'الكل' : 'All'}
              </button>
              {qrCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {cat.icon} {isRTL ? cat.nameAr : cat.name}
                </button>
              ))}
            </div>

            {/* Templates Grid */}
            <ScrollArea className="h-48">
              <div className="space-y-4">
                {filteredCategories.map(category => (
                  <div key={category.id}>
                    <p className="text-xs text-muted-foreground mb-2">
                      {category.icon} {isRTL ? category.nameAr : category.name}
                    </p>
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                      {category.templates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => applyTemplate(template)}
                          className="w-8 h-8 rounded-lg border border-border hover:scale-110 transition-transform relative overflow-hidden"
                          style={{
                            background: template.gradient && template.secondaryColor
                              ? `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})`
                              : template.primaryColor
                          }}
                          title={isRTL ? template.nameAr : template.name}
                        >
                          {template.pattern && template.pattern !== 'squares' && (
                            <span className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">
                              {patterns.find(p => p.id === template.pattern)?.label}
                            </span>
                          )}
                        </button>
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
