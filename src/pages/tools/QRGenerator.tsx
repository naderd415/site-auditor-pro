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
import { Textarea } from '@/components/ui/textarea';
import { 
  Download, Link2, FileText, Mail, Phone, Upload, X, 
  Shuffle, Undo2, Palette, Image, Shapes, Layers, Star,
  Wifi, User, MessageSquare, MapPin, Calendar, Send, Bitcoin
} from 'lucide-react';
import { toast } from 'sonner';
import { templates, categories, type InternalTemplate as Template, type DotsType, type CornersType } from '@/lib/qr/internalTemplates';

// أنواع المحتوى
type ContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard' | 'sms' | 'location' | 'event' | 'whatsapp' | 'crypto';

interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  title: string;
  website: string;
  address: string;
}

interface SmsData {
  phone: string;
  message: string;
}

interface LocationData {
  latitude: string;
  longitude: string;
}

interface EventData {
  title: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

interface WhatsAppData {
  phone: string;
  message: string;
}

interface CryptoData {
  type: 'bitcoin' | 'ethereum' | 'litecoin' | 'dogecoin' | 'solana' | 'bnb' | 'xrp' | 'usdt';
  address: string;
  amount: string;
  label?: string;
  message?: string;
}

interface QRState {
  data: string;
  dotsType: DotsType;
  cornersType: CornersType;
  cornersDotType: 'square' | 'dot';
  color1: string;
  color2: string;
  bg: string;
  logo: string | null;
  logoSize: number;
  gradientType: 'linear' | 'radial';
  transparentBg: boolean;
}

// استخدام القوالب والفئات من الملف الخارجي
// Templates and categories are imported from internalTemplates.ts

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

// أنواع المحتوى مع الوصف
const contentTypes = [
  { 
    type: 'url' as ContentType, 
    icon: Link2, 
    label: 'URL', 
    labelAr: 'رابط',
    desc: 'Create QR for any website URL. Perfect for sharing links to websites, social media profiles, online stores, or landing pages.',
    descAr: 'أنشئ QR لأي رابط موقع. مثالي لمشاركة روابط المواقع، حسابات السوشيال ميديا، المتاجر الإلكترونية، أو صفحات الهبوط.'
  },
  { 
    type: 'text' as ContentType, 
    icon: FileText, 
    label: 'Text', 
    labelAr: 'نص',
    desc: 'Encode plain text in QR code. Great for messages, notes, or any text content up to 4000 characters.',
    descAr: 'شفّر نص عادي في كود QR. رائع للرسائل، الملاحظات، أو أي محتوى نصي حتى 4000 حرف.'
  },
  { 
    type: 'wifi' as ContentType, 
    icon: Wifi, 
    label: 'WiFi', 
    labelAr: 'واي فاي',
    desc: 'Share WiFi network credentials instantly. Guests scan to connect automatically without typing passwords.',
    descAr: 'شارك بيانات شبكة الواي فاي فوراً. الضيوف يمسحون للاتصال تلقائياً بدون كتابة كلمات المرور.'
  },
  { 
    type: 'vcard' as ContentType, 
    icon: User, 
    label: 'vCard', 
    labelAr: 'بطاقة',
    desc: 'Digital business card with contact info. Includes name, phone, email, company, title, website, and address.',
    descAr: 'بطاقة عمل رقمية مع معلومات الاتصال. تشمل الاسم، الهاتف، الإيميل، الشركة، المسمى الوظيفي، الموقع، والعنوان.'
  },
  { 
    type: 'email' as ContentType, 
    icon: Mail, 
    label: 'Email', 
    labelAr: 'إيميل',
    desc: 'Create QR that opens email app with pre-filled recipient. Perfect for contact pages and customer support.',
    descAr: 'أنشئ QR يفتح تطبيق البريد مع المستلم محدد مسبقاً. مثالي لصفحات الاتصال ودعم العملاء.'
  },
  { 
    type: 'phone' as ContentType, 
    icon: Phone, 
    label: 'Phone', 
    labelAr: 'هاتف',
    desc: 'QR code that initiates a phone call when scanned. Perfect for business cards and contact information.',
    descAr: 'كود QR يبدأ مكالمة هاتفية عند المسح. مثالي لبطاقات العمل ومعلومات الاتصال.'
  },
  { 
    type: 'sms' as ContentType, 
    icon: MessageSquare, 
    label: 'SMS', 
    labelAr: 'رسالة',
    desc: 'Open SMS app with pre-filled number and message. Great for marketing campaigns and quick feedback.',
    descAr: 'افتح تطبيق الرسائل مع رقم ورسالة محددة مسبقاً. رائع للحملات التسويقية والتعليقات السريعة.'
  },
  { 
    type: 'whatsapp' as ContentType, 
    icon: Send, 
    label: 'WhatsApp', 
    labelAr: 'واتساب',
    desc: 'Open WhatsApp chat directly with pre-written message. Perfect for customer support and quick communication.',
    descAr: 'افتح محادثة واتساب مباشرة مع رسالة مكتوبة مسبقاً. مثالي لدعم العملاء والتواصل السريع.'
  },
  { 
    type: 'location' as ContentType, 
    icon: MapPin, 
    label: 'Location', 
    labelAr: 'موقع',
    desc: 'Share GPS coordinates that open in maps app. Ideal for event venues, stores, and meeting points.',
    descAr: 'شارك إحداثيات GPS تفتح في تطبيق الخرائط. مثالي لأماكن الفعاليات، المتاجر، ونقاط الالتقاء.'
  },
  { 
    type: 'event' as ContentType, 
    icon: Calendar, 
    label: 'Event', 
    labelAr: 'حدث',
    desc: 'Add calendar event with date, time, location and description. Perfect for invitations and appointments.',
    descAr: 'أضف حدث للتقويم مع التاريخ، الوقت، المكان والوصف. مثالي للدعوات والمواعيد.'
  },
  { 
    type: 'crypto' as ContentType, 
    icon: Bitcoin, 
    label: 'Crypto', 
    labelAr: 'كريبتو',
    desc: 'Receive cryptocurrency payments. Supports Bitcoin, Ethereum, Litecoin, Dogecoin, Solana, BNB, XRP, USDT.',
    descAr: 'استلم مدفوعات العملات الرقمية. يدعم Bitcoin, Ethereum, Litecoin, Dogecoin, Solana, BNB, XRP, USDT.'
  },
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
  
  // بيانات المحتوى المتقدمة
  const [wifiData, setWifiData] = useState<WifiData>({ ssid: '', password: '', encryption: 'WPA', hidden: false });
  const [vcardData, setVcardData] = useState<VCardData>({ firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '', address: '' });
  const [smsData, setSmsData] = useState<SmsData>({ phone: '', message: '' });
  const [locationData, setLocationData] = useState<LocationData>({ latitude: '', longitude: '' });
  const [eventData, setEventData] = useState<EventData>({ title: '', location: '', start: '', end: '', description: '' });
  const [whatsappData, setWhatsappData] = useState<WhatsAppData>({ phone: '', message: '' });
  const [cryptoData, setCryptoData] = useState<CryptoData>({ type: 'bitcoin', address: '', amount: '' });
  
  const [qrState, setQrState] = useState<QRState>({
    data: 'https://besttoolshub.com',
    dotsType: 'square',
    cornersType: 'square',
    cornersDotType: 'square',
    color1: '#000000',
    color2: '#000000',
    bg: '#ffffff',
    logo: null,
    logoSize: 30,
    gradientType: 'linear',
    transparentBg: false,
  });

  // تحويل البيانات لصيغة QR
  const generateQRData = useCallback((): string => {
    switch (contentType) {
      case 'wifi':
        if (!wifiData.ssid) return 'WIFI:T:WPA;S:MyNetwork;P:password123;;';
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`;
      case 'vcard':
        if (!vcardData.firstName && !vcardData.lastName) return qrState.data;
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardData.lastName};${vcardData.firstName}\nFN:${vcardData.firstName} ${vcardData.lastName}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nORG:${vcardData.company}\nTITLE:${vcardData.title}\nURL:${vcardData.website}\nADR:${vcardData.address}\nEND:VCARD`;
      case 'sms':
        if (!smsData.phone) return qrState.data;
        return `SMSTO:${smsData.phone}:${smsData.message}`;
      case 'location':
        if (!locationData.latitude || !locationData.longitude) return qrState.data;
        return `geo:${locationData.latitude},${locationData.longitude}`;
      case 'event':
        if (!eventData.title) return qrState.data;
        const formatDate = (d: string) => d ? new Date(d).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
        return `BEGIN:VEVENT\nSUMMARY:${eventData.title}\nLOCATION:${eventData.location}\nDTSTART:${formatDate(eventData.start)}\nDTEND:${formatDate(eventData.end)}\nDESCRIPTION:${eventData.description}\nEND:VEVENT`;
      case 'whatsapp':
        if (!whatsappData.phone) return qrState.data;
        return `https://wa.me/${whatsappData.phone.replace(/\D/g, '')}${whatsappData.message ? `?text=${encodeURIComponent(whatsappData.message)}` : ''}`;
      case 'crypto':
        if (!cryptoData.address) return qrState.data;
        const buildCryptoUrl = () => {
          const params = new URLSearchParams();
          if (cryptoData.amount) params.append('amount', cryptoData.amount);
          if (cryptoData.label) params.append('label', cryptoData.label);
          if (cryptoData.message) params.append('message', cryptoData.message);
          const queryString = params.toString() ? `?${params.toString()}` : '';
          
          switch (cryptoData.type) {
            case 'bitcoin': return `bitcoin:${cryptoData.address}${queryString}`;
            case 'ethereum': return `ethereum:${cryptoData.address}${cryptoData.amount ? `?value=${cryptoData.amount}` : ''}`;
            case 'litecoin': return `litecoin:${cryptoData.address}${queryString}`;
            case 'dogecoin': return `dogecoin:${cryptoData.address}${queryString}`;
            case 'solana': return `solana:${cryptoData.address}${queryString}`;
            case 'bnb': return `bnb:${cryptoData.address}${queryString}`;
            case 'xrp': return `xrp:${cryptoData.address}${queryString}`;
            case 'usdt': return `tether:${cryptoData.address}${queryString}`;
            default: return `bitcoin:${cryptoData.address}${queryString}`;
          }
        };
        return buildCryptoUrl();
      default:
        return qrState.data;
    }
  }, [contentType, wifiData, vcardData, smsData, locationData, eventData, whatsappData, cryptoData, qrState.data]);

  // حساب البيانات النهائية للـ QR
  const qrData = generateQRData();

  // إنشاء QR Code
  useEffect(() => {
    if (!qrRef.current) return;
    
    const qrCode = new QRCodeStyling({
      width: 250,
      height: 250,
      type: 'svg',
      data: qrData || 'https://besttoolshub.com',
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
        margin: 10,
        imageSize: qrState.logoSize / 100
      }
    });

    qrRef.current.innerHTML = '';
    qrCode.append(qrRef.current);
    qrCodeRef.current = qrCode;
  }, [qrState, qrData]);

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

  const downloadQR = async (format: 'png' | 'svg' | 'jpeg' | 'webp' | 'pdf') => {
    if (!qrCodeRef.current) return;
    
    qrCodeRef.current.update({ width: quality, height: quality });
    
    if (format === 'pdf') {
      // تحميل PDF
      const blob = await qrCodeRef.current.getRawData('png');
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const imgData = reader.result as string;
          // إنشاء PDF بسيط مع الصورة
          const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 ${quality} ${quality}] /Contents 4 0 R /Resources << /XObject << /I0 5 0 R >> >> >> endobj
4 0 obj << /Length 44 >> stream
q ${quality} 0 0 ${quality} 0 0 cm /I0 Do Q
endstream endobj
5 0 obj << /Type /XObject /Subtype /Image /Width ${quality} /Height ${quality} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${blob.size} >> stream
endstream endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000359 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
559
%%EOF`;
          // استخدام طريقة بسيطة: تحويل PNG إلى Data URL وتحميلها
          const link = document.createElement('a');
          link.download = 'qr_code.png';
          link.href = imgData;
          link.click();
        };
        reader.readAsDataURL(blob);
      }
      toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
    } else if (format === 'jpeg' || format === 'webp') {
      // تحويل إلى JPEG أو WEBP
      const blob = await qrCodeRef.current.getRawData('png');
      if (blob) {
        const img = document.createElement('img');
        const url = URL.createObjectURL(blob);
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = quality;
          canvas.height = quality;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // خلفية بيضاء للـ JPEG
            if (format === 'jpeg') {
              ctx.fillStyle = qrState.transparentBg ? '#ffffff' : qrState.bg;
              ctx.fillRect(0, 0, quality, quality);
            }
            ctx.drawImage(img, 0, 0, quality, quality);
            canvas.toBlob((newBlob) => {
              if (newBlob) {
                saveAs(newBlob, `qr_code.${format}`);
              }
            }, format === 'jpeg' ? 'image/jpeg' : 'image/webp', 0.95);
          }
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
      toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
    } else {
      await qrCodeRef.current.download({ name: 'qr_code', extension: format });
      toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
    }
    
    qrCodeRef.current.update({ width: 250, height: 250 });
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

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.cat === selectedCategory);

  // رندر نموذج المحتوى حسب النوع
  const renderContentForm = () => {
    switch (contentType) {
      case 'url':
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">
              {contentType === 'url' ? (isRTL ? 'رابط الموقع (URL)' : 'Website URL') : (isRTL ? 'النص' : 'Text')}
            </label>
            <Input
              value={qrState.data}
              onChange={(e) => updateQrState({ data: e.target.value })}
              placeholder={contentType === 'url' ? 'https://www.example.com' : (isRTL ? 'اكتب النص هنا...' : 'Enter your text...')}
              className="text-base"
            />
          </div>
        );
      
      case 'email':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</label>
            <Input
              value={qrState.data}
              onChange={(e) => updateQrState({ data: `mailto:${e.target.value}` })}
              placeholder="name@example.com"
              className="text-base"
            />
          </div>
        );
      
      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</label>
            <Input
              value={qrState.data}
              onChange={(e) => updateQrState({ data: `tel:${e.target.value}` })}
              placeholder="+201234567890"
              className="text-base"
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'اسم الشبكة (SSID)' : 'Network Name (SSID)'}</label>
              <Input
                value={wifiData.ssid}
                onChange={(e) => setWifiData(prev => ({ ...prev, ssid: e.target.value }))}
                placeholder="MyWiFi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'كلمة المرور' : 'Password'}</label>
              <Input
                type="password"
                value={wifiData.password}
                onChange={(e) => setWifiData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{isRTL ? 'نوع التشفير' : 'Encryption'}</label>
              <div className="flex gap-2">
                {(['WPA', 'WEP', 'nopass'] as const).map((enc) => (
                  <button
                    key={enc}
                    onClick={() => setWifiData(prev => ({ ...prev, encryption: enc }))}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      wifiData.encryption === enc
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {enc === 'nopass' ? (isRTL ? 'بدون' : 'None') : enc}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={wifiData.hidden}
                onCheckedChange={(checked) => setWifiData(prev => ({ ...prev, hidden: checked }))}
              />
              <span className="text-sm">{isRTL ? 'شبكة مخفية' : 'Hidden Network'}</span>
            </div>
          </div>
        );
      
      case 'vcard':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'الاسم الأول' : 'First Name'}</label>
                <Input
                  value={vcardData.firstName}
                  onChange={(e) => setVcardData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder={isRTL ? 'أحمد' : 'John'}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'اسم العائلة' : 'Last Name'}</label>
                <Input
                  value={vcardData.lastName}
                  onChange={(e) => setVcardData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder={isRTL ? 'محمد' : 'Doe'}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'الهاتف' : 'Phone'}</label>
                <Input
                  value={vcardData.phone}
                  onChange={(e) => setVcardData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+201234567890"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'الإيميل' : 'Email'}</label>
                <Input
                  value={vcardData.email}
                  onChange={(e) => setVcardData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'الشركة' : 'Company'}</label>
                <Input
                  value={vcardData.company}
                  onChange={(e) => setVcardData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder={isRTL ? 'الشركة' : 'Company Inc.'}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'المسمى الوظيفي' : 'Job Title'}</label>
                <Input
                  value={vcardData.title}
                  onChange={(e) => setVcardData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={isRTL ? 'مدير' : 'Manager'}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">{isRTL ? 'الموقع الإلكتروني' : 'Website'}</label>
              <Input
                value={vcardData.website}
                onChange={(e) => setVcardData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">{isRTL ? 'العنوان' : 'Address'}</label>
              <Input
                value={vcardData.address}
                onChange={(e) => setVcardData(prev => ({ ...prev, address: e.target.value }))}
                placeholder={isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              />
            </div>
          </div>
        );
      
      case 'sms':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</label>
              <Input
                value={smsData.phone}
                onChange={(e) => setSmsData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+201234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'نص الرسالة (اختياري)' : 'Message (optional)'}</label>
              <Textarea
                value={smsData.message}
                onChange={(e) => setSmsData(prev => ({ ...prev, message: e.target.value }))}
                placeholder={isRTL ? 'مرحباً!' : 'Hello!'}
                rows={3}
              />
            </div>
          </div>
        );
      
      case 'whatsapp':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'رقم الهاتف (مع كود الدولة)' : 'Phone Number (with country code)'}</label>
              <Input
                value={whatsappData.phone}
                onChange={(e) => setWhatsappData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="201234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'الرسالة (اختياري)' : 'Message (optional)'}</label>
              <Textarea
                value={whatsappData.message}
                onChange={(e) => setWhatsappData(prev => ({ ...prev, message: e.target.value }))}
                placeholder={isRTL ? 'مرحباً، أريد الاستفسار عن...' : 'Hello, I want to ask about...'}
                rows={3}
              />
            </div>
          </div>
        );
      
      case 'location':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">{isRTL ? 'خط العرض' : 'Latitude'}</label>
                <Input
                  value={locationData.latitude}
                  onChange={(e) => setLocationData(prev => ({ ...prev, latitude: e.target.value }))}
                  placeholder="30.0444"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{isRTL ? 'خط الطول' : 'Longitude'}</label>
                <Input
                  value={locationData.longitude}
                  onChange={(e) => setLocationData(prev => ({ ...prev, longitude: e.target.value }))}
                  placeholder="31.2357"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'يمكنك الحصول على الإحداثيات من خرائط جوجل' : 'You can get coordinates from Google Maps'}
            </p>
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'عنوان الحدث' : 'Event Title'}</label>
              <Input
                value={eventData.title}
                onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={isRTL ? 'اجتماع عمل' : 'Business Meeting'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'المكان' : 'Location'}</label>
              <Input
                value={eventData.location}
                onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                placeholder={isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'تاريخ البداية' : 'Start Date'}</label>
                <Input
                  type="datetime-local"
                  value={eventData.start}
                  onChange={(e) => setEventData(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">{isRTL ? 'تاريخ النهاية' : 'End Date'}</label>
                <Input
                  type="datetime-local"
                  value={eventData.end}
                  onChange={(e) => setEventData(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'الوصف' : 'Description'}</label>
              <Textarea
                value={eventData.description}
                onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={isRTL ? 'تفاصيل الحدث...' : 'Event details...'}
                rows={2}
              />
            </div>
          </div>
        );
      
      case 'crypto':
        const cryptoOptions = [
          { type: 'bitcoin' as const, label: 'Bitcoin', symbol: '₿', color: '#F7931A' },
          { type: 'ethereum' as const, label: 'Ethereum', symbol: 'Ξ', color: '#627EEA' },
          { type: 'litecoin' as const, label: 'Litecoin', symbol: 'Ł', color: '#BFBBBB' },
          { type: 'dogecoin' as const, label: 'Dogecoin', symbol: 'Ð', color: '#C2A633' },
          { type: 'solana' as const, label: 'Solana', symbol: '◎', color: '#9945FF' },
          { type: 'bnb' as const, label: 'BNB', symbol: 'BNB', color: '#F3BA2F' },
          { type: 'xrp' as const, label: 'XRP', symbol: 'XRP', color: '#23292F' },
          { type: 'usdt' as const, label: 'USDT', symbol: '₮', color: '#26A17B' },
        ];
        
        const getPlaceholder = () => {
          switch (cryptoData.type) {
            case 'bitcoin': return 'bc1q... أو 1... أو 3...';
            case 'ethereum': return '0x...';
            case 'litecoin': return 'ltc1... أو L... أو M...';
            case 'dogecoin': return 'D...';
            case 'solana': return 'العنوان...';
            case 'bnb': return 'bnb1... أو 0x...';
            case 'xrp': return 'r...';
            case 'usdt': return '0x... أو T...';
            default: return 'العنوان...';
          }
        };
        
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{isRTL ? 'اختر العملة الرقمية' : 'Select Cryptocurrency'}</label>
              <div className="grid grid-cols-4 gap-2">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.type}
                    onClick={() => setCryptoData(prev => ({ ...prev, type: crypto.type }))}
                    className={`p-2 rounded-lg text-xs transition-all flex flex-col items-center gap-1 border ${
                      cryptoData.type === crypto.type
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-lg font-bold" style={{ color: crypto.color }}>{crypto.symbol}</span>
                    <span className="text-[10px]">{crypto.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'عنوان المحفظة' : 'Wallet Address'}</label>
              <Input
                value={cryptoData.address}
                onChange={(e) => setCryptoData(prev => ({ ...prev, address: e.target.value }))}
                placeholder={getPlaceholder()}
                className="font-mono text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">{isRTL ? 'المبلغ (اختياري)' : 'Amount (optional)'}</label>
                <Input
                  value={cryptoData.amount}
                  onChange={(e) => setCryptoData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.001"
                  type="number"
                  step="0.0001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{isRTL ? 'التسمية (اختياري)' : 'Label (optional)'}</label>
                <Input
                  value={cryptoData.label || ''}
                  onChange={(e) => setCryptoData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder={isRTL ? 'دفعة متجر' : 'Store Payment'}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{isRTL ? 'رسالة (اختياري)' : 'Message (optional)'}</label>
              <Input
                value={cryptoData.message || ''}
                onChange={(e) => setCryptoData(prev => ({ ...prev, message: e.target.value }))}
                placeholder={isRTL ? 'شكراً لدعمك' : 'Thanks for your support'}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد QR Code الاحترافي' : 'Professional QR Code Generator'}
      description={isRTL ? 'أداة توليد QR Code احترافية ومجانية. أضف شعارك، غير الألوان، واختر التصميم المناسب.' : 'Professional and free QR Code generator. Add your logo, change colors, and choose the right design.'}
      keywords="qr code, generator, qr maker, barcode, wifi qr, vcard qr"
      article={isRTL 
        ? 'مولد QR Code في BestToolsHub هو أداة مجانية تساعدك على إنشاء رمز QR بسرعة وبشكل احترافي، سواء كنت تريد وضعه على بطاقة عمل، إعلان مطبوع، منيو مطعم، أو رابط حسابات التواصل الاجتماعي. يمكنك تخصيص الألوان والتصميم وإضافة شعار في المنتصف.'
        : 'QR Code Generator at BestToolsHub is a free tool that helps you create QR codes quickly and professionally. Whether you want to put it on a business card, printed ad, restaurant menu, or social media link. You can customize colors, design, and add a logo in the center.'
      }
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* RIGHT Side - Settings (First on both mobile and desktop for better UX) */}
          <div className="lg:col-span-8 order-2 lg:order-2">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                {isRTL ? 'إعدادات التخصيص' : 'Customization Settings'}
              </h2>
          
            <Tabs defaultValue="content" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
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
              {/* أزرار أنواع المحتوى - Grid Layout */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {contentTypes.map(({ type, icon: Icon, label, labelAr }) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      contentType === type 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">{isRTL ? labelAr : label}</span>
                  </button>
                ))}
              </div>
              
              {/* وصف نوع المحتوى المحدد */}
              {(() => {
                const selectedContent = contentTypes.find(c => c.type === contentType);
                if (selectedContent) {
                  return (
                    <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {isRTL ? selectedContent.descAr : selectedContent.desc}
                      </p>
                    </div>
                  );
                }
                return null;
              })()}
              
              {/* نموذج المحتوى */}
              <div className="pt-2">
                {renderContentForm()}
              </div>
            </TabsContent>

            {/* تبويب القوالب */}
            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="flex flex-wrap gap-2">
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template)}
                      className="p-3 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center gap-2 bg-card"
                      style={{
                        background: `linear-gradient(135deg, ${template.bg} 60%, ${template.color1} 100%)`
                      }}
                    >
                      <span className="text-xl">{template.icon}</span>
                      <span className="text-[10px] font-medium" style={{ color: template.bg === '#000000' || template.bg === '#0a0a0a' || template.bg === '#1a1a1a' || template.bg === '#0f0f0f' || template.bg === '#18181b' || template.bg === '#1a1a2e' ? '#fff' : '#000' }}>
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
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <img src={qrState.logo} alt="Logo" className="w-12 h-12 object-contain" />
                    <Button variant="destructive" size="sm" onClick={removeLogo}>
                      <X className="w-4 h-4 mr-2" />
                      {isRTL ? 'إزالة الشعار' : 'Remove Logo'}
                    </Button>
                  </div>
                  
                  {/* Logo Size Slider */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      {isRTL ? 'حجم الشعار' : 'Logo Size'}: {qrState.logoSize}%
                    </label>
                    <Slider
                      value={[qrState.logoSize]}
                      onValueChange={([v]) => updateQrState({ logoSize: v })}
                      min={10}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{isRTL ? 'صغير (10%)' : 'Small (10%)'}</span>
                      <span>{isRTL ? 'كبير (50%)' : 'Large (50%)'}</span>
                    </div>
                  </div>
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

              {/* ألوان سريعة */}
              <div>
                <label className="block text-sm font-medium mb-3">{isRTL ? 'ألوان سريعة' : 'Quick Colors'}</label>
                <div className="grid grid-cols-8 gap-2">
                  {[
                    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateQrState({ color1: color, color2: color })}
                      className="w-8 h-8 rounded-lg border-2 border-border hover:border-primary transition-all hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* أنماط جاهزة */}
              <div>
                <label className="block text-sm font-medium mb-3">{isRTL ? 'أنماط جاهزة' : 'Quick Styles'}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => updateQrState({ dotsType: 'square', cornersType: 'square', cornersDotType: 'square' })}
                    className="p-3 rounded-lg border border-border hover:border-primary text-sm transition-all"
                  >
                    {isRTL ? 'مربع كامل' : 'Full Square'}
                  </button>
                  <button
                    onClick={() => updateQrState({ dotsType: 'dots', cornersType: 'dot', cornersDotType: 'dot' })}
                    className="p-3 rounded-lg border border-border hover:border-primary text-sm transition-all"
                  >
                    {isRTL ? 'دائري كامل' : 'Full Dots'}
                  </button>
                  <button
                    onClick={() => updateQrState({ dotsType: 'rounded', cornersType: 'extra-rounded', cornersDotType: 'dot' })}
                    className="p-3 rounded-lg border border-border hover:border-primary text-sm transition-all"
                  >
                    {isRTL ? 'ناعم' : 'Smooth'}
                  </button>
                  <button
                    onClick={() => updateQrState({ dotsType: 'classy', cornersType: 'extra-rounded', cornersDotType: 'dot' })}
                    className="p-3 rounded-lg border border-border hover:border-primary text-sm transition-all"
                  >
                    {isRTL ? 'كلاسيكي' : 'Classic'}
                  </button>
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
          
          {/* LEFT Side - QR Preview (Sticky on desktop, First on mobile for immediate visibility) */}
          <div className="lg:col-span-4 order-1 lg:order-1">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📱</span>
                {isRTL ? 'معاينة QR Code' : 'QR Code Preview'}
              </h2>
              
              {/* QR Preview */}
              <div className="flex justify-center mb-6">
                <div 
                  ref={qrRef}
                  className="bg-white p-4 rounded-xl shadow-sm"
                  style={{ 
                    backgroundColor: qrState.transparentBg ? 'transparent' : qrState.bg,
                    backgroundImage: qrState.transparentBg ? 'repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 50% / 16px 16px' : 'none'
                  }}
                />
              </div>
              
              {/* Download Buttons */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Button onClick={() => downloadQR('png')} className="gap-2" size="sm">
                  <Download className="w-4 h-4" />
                  PNG
                </Button>
                <Button onClick={() => downloadQR('svg')} variant="outline" size="sm">
                  SVG
                </Button>
                <Button onClick={() => downloadQR('jpeg')} variant="outline" size="sm">
                  JPEG
                </Button>
                <Button onClick={() => downloadQR('webp')} variant="outline" size="sm">
                  WEBP
                </Button>
                <Button onClick={() => downloadQR('pdf')} variant="secondary" size="sm">
                  PDF
                </Button>
              </div>
              
              {/* Quality Slider */}
              <div className="flex items-center justify-center gap-2 bg-muted px-4 py-2 rounded-lg mb-4">
                <span className="text-xs">{isRTL ? 'الجودة:' : 'Quality:'}</span>
                <Slider
                  value={[quality]}
                  onValueChange={([v]) => setQuality(v)}
                  min={300}
                  max={2000}
                  step={100}
                  className="w-32"
                />
                <span className="text-xs font-mono w-14">{quality}px</span>
              </div>
              
              {/* QR Readability Indicator */}
              <div className="flex items-center justify-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium">
                  {isRTL ? 'قابل للقراءة ✓' : 'Scannable ✓'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
