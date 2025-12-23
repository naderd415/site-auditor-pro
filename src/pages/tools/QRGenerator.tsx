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
  Download, Copy, RefreshCw, Link2, Wifi, Mail, Phone, MessageSquare, 
  FileText, Sparkles, Undo2, Palette, Settings2, Image, Trash2, 
  Shuffle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { qrCategories, getRandomTemplate, getAllTemplates, getTemplateGradient, QRTemplate } from '@/lib/qr/templates';

type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms';

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
}

const qualitySettings = {
  low: { size: 200, margin: 1 },
  medium: { size: 300, margin: 2 },
  high: { size: 500, margin: 2 },
  ultra: { size: 800, margin: 3 },
};

const QRGenerator = () => {
  const { t, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrData, setQrData] = useState('');
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate | null>(null);
  
  // History for undo
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
    errorCorrection: 'M',
    gradient: false,
    gradientColor: '#667eea',
    transparentBg: false,
    quality: 'medium',
  });

  // Save to history when settings change
  const saveToHistory = (newSettings: QRSettings) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...newSettings });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSettings(history[historyIndex - 1]);
      if (generated) generateQR();
    }
  };

  // Redo function (for forward navigation in history)
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSettings(history[historyIndex + 1]);
      if (generated) generateQR();
    }
  };

  const updateSettings = (newSettings: Partial<QRSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveToHistory(updated);
  };

  const getQRData = useCallback((): string => {
    switch (qrType) {
      case 'url':
        return urlInput;
      case 'text':
        return textInput;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNumber}`;
      case 'sms':
        return `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
      default:
        return '';
    }
  }, [qrType, urlInput, textInput, wifiSSID, wifiPassword, wifiEncryption, emailTo, emailSubject, emailBody, phoneNumber, smsNumber, smsMessage]);

  const generateQR = async () => {
    const data = getQRData();
    if (!data || data === 'https://') {
      toast.error(isRTL ? 'يرجى إدخال البيانات' : 'Please enter data');
      return;
    }

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
          light: settings.transparentBg ? 'rgba(0,0,0,0)' : settings.lightColor,
        },
        errorCorrectionLevel: settings.errorCorrection,
      });

      // Apply gradient if enabled
      if (settings.gradient) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          
          // Parse colors
          const startColor = settings.darkColor;
          const endColor = settings.gradientColor;
          
          // Convert hex to RGB
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
          };
          
          const startRgb = hexToRgb(startColor);
          const endRgb = hexToRgb(endColor);
          
          // Apply gradient to dark pixels
          for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            const ratio = (x + y) / (canvas.width + canvas.height);
            
            // Only apply to dark pixels
            if (data[i] < 128 && data[i + 3] > 0) {
              data[i] = Math.round(startRgb.r + (endRgb.r - startRgb.r) * ratio);
              data[i + 1] = Math.round(startRgb.g + (endRgb.g - startRgb.g) * ratio);
              data[i + 2] = Math.round(startRgb.b + (endRgb.b - startRgb.b) * ratio);
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
        }
      }

      setQrData(data);
      setGenerated(true);
      toast.success(isRTL ? 'تم إنشاء QR بنجاح!' : 'QR code generated!');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء الإنشاء' : 'Error generating QR code');
    }
  };

  // Apply template
  const applyTemplate = (template: QRTemplate) => {
    setSelectedTemplate(template);
    const newSettings: Partial<QRSettings> = {
      darkColor: template.primaryColor,
      gradient: template.gradient || false,
      gradientColor: template.secondaryColor || template.primaryColor,
    };
    updateSettings(newSettings);
    
    if (generated) {
      setTimeout(generateQR, 100);
    }
    
    toast.success(isRTL ? `تم تطبيق قالب ${template.nameAr}` : `Applied ${template.name} template`);
  };

  // Lucky button - random template
  const luckyPick = () => {
    const template = getRandomTemplate();
    applyTemplate(template);
    toast.success(isRTL ? '🎲 ضربة حظ!' : '🎲 Lucky pick!');
  };

  const downloadQR = (format: 'png' | 'svg' | 'jpg') => {
    const canvas = canvasRef.current;
    if (!canvas || !generated) return;

    let dataUrl: string;
    let filename: string;

    if (format === 'svg') {
      QRCode.toString(qrData, {
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
    if (!canvas || !generated) return;

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

  // Get filtered templates
  const filteredTemplates = selectedCategory === 'all' 
    ? getAllTemplates() 
    : qrCategories.find(c => c.id === selectedCategory)?.templates || [];

  return (
    <ToolPageLayout
      title={t.tools.qrGenerator.name}
      description={t.tools.qrGenerator.description}
      article={t.tools.qrGenerator.article}
      keywords="QR code, QR generator, create QR, WiFi QR, URL QR, مولد QR, رمز QR"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input Section */}
          <div className="space-y-6">
            {/* Tabs for different sections */}
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
              <TabsContent value="content" className="space-y-6 mt-6">
                {/* QR Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {isRTL ? 'نوع المحتوى' : 'Content Type'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {qrTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setQrType(type.id as QRType)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                          qrType === type.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Input based on type */}
                <div className="space-y-4">
                  {qrType === 'url' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {isRTL ? 'الرابط' : 'URL'}
                      </label>
                      <Input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com"
                        className="text-start"
                        dir="ltr"
                      />
                    </div>
                  )}

                  {qrType === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {isRTL ? 'النص' : 'Text'}
                      </label>
                      <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder={isRTL ? 'أدخل النص هنا...' : 'Enter your text here...'}
                        rows={4}
                      />
                    </div>
                  )}

                  {qrType === 'wifi' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'اسم الشبكة (SSID)' : 'Network Name (SSID)'}
                        </label>
                        <Input
                          value={wifiSSID}
                          onChange={(e) => setWifiSSID(e.target.value)}
                          placeholder="MyWiFi"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'كلمة المرور' : 'Password'}
                        </label>
                        <Input
                          type="password"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="••••••••"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'نوع التشفير' : 'Encryption'}
                        </label>
                        <div className="flex gap-2">
                          {['WPA', 'WEP', 'nopass'].map((enc) => (
                            <button
                              key={enc}
                              onClick={() => setWifiEncryption(enc as any)}
                              className={`px-4 py-2 rounded-lg text-sm ${
                                wifiEncryption === enc
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                            >
                              {enc === 'nopass' ? (isRTL ? 'بدون' : 'None') : enc}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {qrType === 'email' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <Input
                          type="email"
                          value={emailTo}
                          onChange={(e) => setEmailTo(e.target.value)}
                          placeholder="example@email.com"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'الموضوع' : 'Subject'}
                        </label>
                        <Input
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder={isRTL ? 'موضوع الرسالة' : 'Email subject'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'الرسالة' : 'Message'}
                        </label>
                        <Textarea
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          placeholder={isRTL ? 'محتوى الرسالة...' : 'Email body...'}
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {qrType === 'phone' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                        dir="ltr"
                      />
                    </div>
                  )}

                  {qrType === 'sms' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                        </label>
                        <Input
                          type="tel"
                          value={smsNumber}
                          onChange={(e) => setSmsNumber(e.target.value)}
                          placeholder="+1234567890"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {isRTL ? 'الرسالة' : 'Message'}
                        </label>
                        <Textarea
                          value={smsMessage}
                          onChange={(e) => setSmsMessage(e.target.value)}
                          placeholder={isRTL ? 'محتوى الرسالة...' : 'SMS message...'}
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="space-y-4 mt-6">
                {/* Lucky Button */}
                <Button 
                  onClick={luckyPick} 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Sparkles className="w-4 h-4 me-2" />
                  {isRTL ? '🎲 ضربة حظ - دع الذكاء الاصطناعي يختار' : '🎲 Lucky Pick - Let AI Choose'}
                </Button>

                {/* Category Filter */}
                <ScrollArea className="w-full">
                  <div className="flex gap-2 pb-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {isRTL ? 'الكل' : 'All'}
                    </button>
                    {qrCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-1 ${
                          selectedCategory === cat.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{isRTL ? cat.nameAr : cat.name}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                {/* Templates Grid */}
                <ScrollArea className="h-[300px]">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-1">
                    {filteredTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedTemplate?.id === template.id
                            ? 'border-primary ring-2 ring-primary/50'
                            : 'border-transparent'
                        }`}
                        style={{
                          background: getTemplateGradient(template),
                        }}
                        title={isRTL ? template.nameAr : template.name}
                      >
                        <span className="sr-only">{isRTL ? template.nameAr : template.name}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                {/* Selected Template Info */}
                {selectedTemplate && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">
                      {isRTL ? 'القالب المحدد:' : 'Selected:'} {isRTL ? selectedTemplate.nameAr : selectedTemplate.name}
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4 mt-6">
                {/* Quality Setting */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {isRTL ? 'الجودة' : 'Quality'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['low', 'medium', 'high', 'ultra'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => updateSettings({ quality: q })}
                        className={`px-2 py-2 rounded-lg text-xs ${
                          settings.quality === q
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {q === 'low' ? (isRTL ? 'منخفضة' : 'Low') :
                         q === 'medium' ? (isRTL ? 'متوسطة' : 'Medium') :
                         q === 'high' ? (isRTL ? 'عالية' : 'High') :
                         (isRTL ? 'فائقة' : 'Ultra')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Slider */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    {isRTL ? 'الحجم' : 'Size'}: {settings.size}px
                  </label>
                  <Slider
                    value={[settings.size]}
                    onValueChange={([size]) => updateSettings({ size })}
                    min={100}
                    max={800}
                    step={10}
                  />
                </div>

                {/* Gradient Toggle */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <label className="text-sm font-medium">
                    {isRTL ? 'تدرج الألوان' : 'Gradient Colors'}
                  </label>
                  <Switch
                    checked={settings.gradient}
                    onCheckedChange={(gradient) => updateSettings({ gradient })}
                  />
                </div>

                {/* Transparent Background Toggle */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <label className="text-sm font-medium">
                    {isRTL ? 'خلفية شفافة' : 'Transparent Background'}
                  </label>
                  <Switch
                    checked={settings.transparentBg}
                    onCheckedChange={(transparentBg) => updateSettings({ transparentBg })}
                  />
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {isRTL ? 'لون الـ QR' : 'QR Color'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.darkColor}
                        onChange={(e) => updateSettings({ darkColor: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer"
                      />
                      <Input
                        value={settings.darkColor}
                        onChange={(e) => updateSettings({ darkColor: e.target.value })}
                        className="flex-1"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  {settings.gradient && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {isRTL ? 'لون التدرج' : 'Gradient End'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.gradientColor}
                          onChange={(e) => updateSettings({ gradientColor: e.target.value })}
                          className="w-10 h-10 rounded-lg cursor-pointer"
                        />
                        <Input
                          value={settings.gradientColor}
                          onChange={(e) => updateSettings({ gradientColor: e.target.value })}
                          className="flex-1"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  )}
                  {!settings.transparentBg && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {isRTL ? 'لون الخلفية' : 'Background'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.lightColor}
                          onChange={(e) => updateSettings({ lightColor: e.target.value })}
                          className="w-10 h-10 rounded-lg cursor-pointer"
                        />
                        <Input
                          value={settings.lightColor}
                          onChange={(e) => updateSettings({ lightColor: e.target.value })}
                          className="flex-1"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Error Correction */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    {isRTL ? 'تصحيح الأخطاء' : 'Error Correction'}
                  </label>
                  <div className="flex gap-2">
                    {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateSettings({ errorCorrection: level })}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                          settings.errorCorrection === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {level} ({level === 'L' ? '7%' : level === 'M' ? '15%' : level === 'Q' ? '25%' : '30%'})
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={undo} 
                variant="outline" 
                size="icon"
                disabled={historyIndex <= 0}
                title={isRTL ? 'تراجع' : 'Undo'}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                onClick={redo} 
                variant="outline" 
                size="icon"
                disabled={historyIndex >= history.length - 1}
                title={isRTL ? 'إعادة' : 'Redo'}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button onClick={generateQR} className="flex-1 btn-primary">
                <RefreshCw className="w-4 h-4 me-2" />
                {isRTL ? 'إنشاء QR' : 'Generate QR'}
              </Button>
            </div>
          </div>

          {/* Right: Preview Section */}
          <div className="space-y-6">
            <div 
              className="glass-card p-8 rounded-xl flex items-center justify-center min-h-[400px]"
              style={{
                background: settings.transparentBg 
                  ? 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                  : undefined
              }}
            >
              <canvas
                ref={canvasRef}
                className={`max-w-full ${!generated ? 'hidden' : ''}`}
              />
              <canvas ref={gradientCanvasRef} className="hidden" />
              {!generated && (
                <p className="text-muted-foreground text-center">
                  {isRTL ? 'سيظهر QR هنا' : 'QR code will appear here'}
                </p>
              )}
            </div>

            {generated && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => downloadQR('png')} variant="outline" className="w-full">
                    <Download className="w-4 h-4 me-1" />
                    PNG
                  </Button>
                  <Button onClick={() => downloadQR('jpg')} variant="outline" className="w-full">
                    <Download className="w-4 h-4 me-1" />
                    JPG
                  </Button>
                  <Button onClick={() => downloadQR('svg')} variant="outline" className="w-full">
                    <Download className="w-4 h-4 me-1" />
                    SVG
                  </Button>
                </div>
                <Button onClick={copyToClipboard} variant="secondary" className="w-full">
                  <Copy className="w-4 h-4 me-2" />
                  {isRTL ? 'نسخ إلى الحافظة' : 'Copy to Clipboard'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
