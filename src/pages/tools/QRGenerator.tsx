import { useState, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Download, Copy, RefreshCw, Link2, Wifi, Mail, Phone, MessageSquare, FileText } from 'lucide-react';
import { toast } from 'sonner';

type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms';

interface QRSettings {
  size: number;
  margin: number;
  darkColor: string;
  lightColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
}

const QRGenerator = () => {
  const { t, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrData, setQrData] = useState('');
  const [generated, setGenerated] = useState(false);
  
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
  });

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

      await QRCode.toCanvas(canvas, data, {
        width: settings.size,
        margin: settings.margin,
        color: {
          dark: settings.darkColor,
          light: settings.lightColor,
        },
        errorCorrectionLevel: settings.errorCorrection,
      });

      setQrData(data);
      setGenerated(true);
      toast.success(isRTL ? 'تم إنشاء QR بنجاح!' : 'QR code generated!');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء الإنشاء' : 'Error generating QR code');
    }
  };

  const downloadQR = (format: 'png' | 'svg' | 'jpg') => {
    const canvas = canvasRef.current;
    if (!canvas || !generated) return;

    let dataUrl: string;
    let filename: string;

    if (format === 'svg') {
      // For SVG, we need to generate it separately
      QRCode.toString(qrData, {
        type: 'svg',
        width: settings.size,
        margin: settings.margin,
        color: {
          dark: settings.darkColor,
          light: settings.lightColor,
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
      // Create a new canvas with white background for JPG
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

            {/* QR Settings */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-medium text-foreground">
                {isRTL ? 'إعدادات QR' : 'QR Settings'}
              </h3>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {isRTL ? 'الحجم' : 'Size'}: {settings.size}px
                </label>
                <Slider
                  value={[settings.size]}
                  onValueChange={([size]) => setSettings({ ...settings, size })}
                  min={100}
                  max={500}
                  step={10}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    {isRTL ? 'لون الـ QR' : 'QR Color'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.darkColor}
                      onChange={(e) => setSettings({ ...settings, darkColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={settings.darkColor}
                      onChange={(e) => setSettings({ ...settings, darkColor: e.target.value })}
                      className="flex-1"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    {isRTL ? 'لون الخلفية' : 'Background'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.lightColor}
                      onChange={(e) => setSettings({ ...settings, lightColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={settings.lightColor}
                      onChange={(e) => setSettings({ ...settings, lightColor: e.target.value })}
                      className="flex-1"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {isRTL ? 'تصحيح الأخطاء' : 'Error Correction'}
                </label>
                <div className="flex gap-2">
                  {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSettings({ ...settings, errorCorrection: level })}
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
            </div>

            <Button onClick={generateQR} className="w-full btn-primary">
              <RefreshCw className="w-4 h-4 me-2" />
              {isRTL ? 'إنشاء QR' : 'Generate QR'}
            </Button>
          </div>

          {/* Right: Preview Section */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-xl flex items-center justify-center min-h-[400px]">
              <canvas
                ref={canvasRef}
                className={`max-w-full ${!generated ? 'hidden' : ''}`}
              />
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
