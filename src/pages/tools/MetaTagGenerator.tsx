import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { Copy, Check, Globe, FileText, Image } from 'lucide-react';

export default function MetaTagGenerator() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags: string[] = [];
    
    // Basic Meta Tags
    tags.push('<!-- Basic Meta Tags -->');
    if (title) tags.push(`<title>${title}</title>`);
    if (description) tags.push(`<meta name="description" content="${description}">`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}">`);
    if (author) tags.push(`<meta name="author" content="${author}">`);
    tags.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    tags.push('<meta charset="UTF-8">');
    
    // Open Graph Tags
    tags.push('\n<!-- Open Graph / Facebook -->');
    tags.push('<meta property="og:type" content="website">');
    if (url) tags.push(`<meta property="og:url" content="${url}">`);
    if (title) tags.push(`<meta property="og:title" content="${title}">`);
    if (description) tags.push(`<meta property="og:description" content="${description}">`);
    if (imageUrl) tags.push(`<meta property="og:image" content="${imageUrl}">`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}">`);
    
    // Twitter Card Tags
    tags.push('\n<!-- Twitter -->');
    tags.push('<meta name="twitter:card" content="summary_large_image">');
    if (twitterHandle) tags.push(`<meta name="twitter:site" content="@${twitterHandle.replace('@', '')}">`);
    if (title) tags.push(`<meta name="twitter:title" content="${title}">`);
    if (description) tags.push(`<meta name="twitter:description" content="${description}">`);
    if (imageUrl) tags.push(`<meta name="twitter:image" content="${imageUrl}">`);
    
    return tags.join('\n');
  };

  const copyToClipboard = async () => {
    const tags = generateMetaTags();
    await navigator.clipboard.writeText(tags);
    setCopied(true);
    toast({
      title: isRTL ? 'تم النسخ!' : 'Copied!',
      description: isRTL ? 'تم نسخ وسوم الميتا إلى الحافظة' : 'Meta tags copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": isRTL ? "مولد وسوم الميتا AI" : "Meta Tag Generator AI",
    "description": isRTL ? "أداة مجانية لإنشاء وسوم الميتا لتحسين السيو" : "Free tool to generate meta tags for SEO optimization",
    "url": "https://besttoolshub.online/tools/meta-tag-generator",
    "applicationCategory": "SEO Tool",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2150" }
  };

  const metaTags = generateMetaTags();

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد وسوم الميتا AI' : 'Meta Tag Generator AI'}
      description={isRTL ? 'أنشئ وسوم الميتا المثالية لموقعك لتحسين ظهورك في محركات البحث ومنصات التواصل الاجتماعي' : 'Generate perfect meta tags for your website to improve SEO and social media visibility'}
      keywords="meta tag generator, SEO tool, open graph, twitter card, مولد وسوم الميتا, أدوات السيو"
      article={isRTL
        ? 'مولد وسوم الميتا AI هو أداة مجانية تساعدك في إنشاء وسوم الميتا الأساسية ووسوم Open Graph ووسوم Twitter Card لموقعك. تعمل الأداة بالكامل في متصفحك دون رفع أي بيانات للخوادم. تساعد وسوم الميتا محركات البحث ومنصات التواصل الاجتماعي على فهم محتوى صفحتك وعرضها بشكل جذاب عند مشاركتها. #SEOTools #MetaTags #FreeTools'
        : 'Meta Tag Generator AI is a free tool that helps you create essential meta tags, Open Graph tags, and Twitter Card tags for your website. The tool runs entirely in your browser without uploading any data to servers. Meta tags help search engines and social media platforms understand your page content and display it attractively when shared. #SEOTools #MetaTags #FreeTools'
      }
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {isRTL ? 'عنوان الصفحة' : 'Page Title'}
            </Label>
            <Input
              placeholder={isRTL ? 'أدخل عنوان صفحتك (60 حرف كحد أقصى)' : 'Enter your page title (max 60 chars)'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <span className="text-xs text-muted-foreground">{title.length}/60</span>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {isRTL ? 'رابط الموقع' : 'Website URL'}
            </Label>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              dir="ltr"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
          <Textarea
            placeholder={isRTL ? 'أدخل وصف صفحتك (160 حرف كحد أقصى)' : 'Enter your page description (max 160 chars)'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={160}
            rows={3}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <span className="text-xs text-muted-foreground">{description.length}/160</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{isRTL ? 'الكلمات المفتاحية' : 'Keywords'}</Label>
            <Input
              placeholder={isRTL ? 'كلمة1, كلمة2, كلمة3' : 'keyword1, keyword2, keyword3'}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? 'اسم المؤلف' : 'Author'}</Label>
            <Input
              placeholder={isRTL ? 'اسمك أو اسم الشركة' : 'Your name or company'}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              {isRTL ? 'رابط الصورة المميزة' : 'Featured Image URL'}
            </Label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? 'اسم الموقع' : 'Site Name'}</Label>
            <Input
              placeholder={isRTL ? 'اسم موقعك' : 'Your site name'}
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{isRTL ? 'حساب تويتر' : 'Twitter Handle'}</Label>
          <Input
            placeholder="@username"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            dir="ltr"
          />
        </div>

        {/* Generated Code */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">{isRTL ? 'الكود المُنشأ' : 'Generated Code'}</Label>
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ الكود' : 'Copy Code')}
            </Button>
          </div>
          <div className="bg-muted rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono" dir="ltr">
              {metaTags}
            </pre>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
          <h3 className="font-semibold mb-2">{isRTL ? 'نصائح لتحسين السيو' : 'SEO Tips'}</h3>
          <ul className={`text-sm text-muted-foreground space-y-1 ${isRTL ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
            <li>{isRTL ? 'اجعل العنوان أقل من 60 حرف' : 'Keep title under 60 characters'}</li>
            <li>{isRTL ? 'اجعل الوصف بين 150-160 حرف' : 'Keep description between 150-160 characters'}</li>
            <li>{isRTL ? 'استخدم صورة بحجم 1200x630 بكسل لمنصات التواصل' : 'Use 1200x630px image for social media'}</li>
            <li>{isRTL ? 'تأكد من أن الروابط تبدأ بـ https://' : 'Ensure URLs start with https://'}</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}
