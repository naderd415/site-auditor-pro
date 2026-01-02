import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { Copy, Check, Download, Plus, Trash2 } from 'lucide-react';

interface URLEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export default function XMLSitemapGenerator() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  
  const [urls, setUrls] = useState<URLEntry[]>([
    { loc: '', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' }
  ]);
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    setUrls([...urls, { 
      loc: '', 
      lastmod: new Date().toISOString().split('T')[0], 
      changefreq: 'weekly', 
      priority: '0.5' 
    }]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, field: keyof URLEntry, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    const validUrls = urls.filter(u => u.loc.trim());
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
    xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
    xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';
    
    validUrls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '\n</urlset>';
    return xml;
  };

  const copyToClipboard = async () => {
    const sitemap = generateSitemap();
    await navigator.clipboard.writeText(sitemap);
    setCopied(true);
    toast({
      title: isRTL ? 'تم النسخ!' : 'Copied!',
      description: isRTL ? 'تم نسخ خريطة الموقع إلى الحافظة' : 'Sitemap copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSitemap = () => {
    const sitemap = generateSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: isRTL ? 'تم التحميل!' : 'Downloaded!',
      description: isRTL ? 'تم تحميل ملف sitemap.xml' : 'sitemap.xml downloaded successfully',
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": isRTL ? "مولد خريطة الموقع XML AI" : "XML Sitemap Generator AI",
    "description": isRTL ? "أداة مجانية لإنشاء خريطة الموقع XML لتحسين السيو" : "Free tool to generate XML sitemap for SEO optimization",
    "url": "https://besttoolshub.online/tools/xml-sitemap-generator",
    "applicationCategory": "SEO Tool",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1820" }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد خريطة الموقع XML AI' : 'XML Sitemap Generator AI'}
      description={isRTL ? 'أنشئ خريطة موقع XML احترافية لتحسين فهرسة موقعك في محركات البحث' : 'Generate professional XML sitemap to improve your website indexing in search engines'}
      keywords="xml sitemap generator, sitemap, SEO tool, search engine optimization, مولد خريطة الموقع, أدوات السيو"
      article={isRTL
        ? 'مولد خريطة الموقع XML AI هو أداة مجانية تساعدك في إنشاء ملف sitemap.xml لموقعك. خريطة الموقع تساعد محركات البحث مثل Google و Bing على اكتشاف وفهرسة صفحات موقعك بشكل أفضل. تعمل الأداة بالكامل في متصفحك دون رفع أي بيانات للخوادم. #SEOTools #Sitemap #FreeTools #WebDevelopment'
        : 'XML Sitemap Generator AI is a free tool that helps you create a sitemap.xml file for your website. Sitemaps help search engines like Google and Bing discover and index your pages better. The tool runs entirely in your browser without uploading any data to servers. #SEOTools #Sitemap #FreeTools #WebDevelopment'
      }
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* URL Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">{isRTL ? 'روابط الصفحات' : 'Page URLs'}</Label>
            <Button onClick={addUrl} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {isRTL ? 'إضافة رابط' : 'Add URL'}
            </Button>
          </div>

          {urls.map((url, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 bg-card">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-muted-foreground">
                  {isRTL ? `الرابط ${index + 1}` : `URL ${index + 1}`}
                </span>
                {urls.length > 1 && (
                  <Button onClick={() => removeUrl(index)} variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>{isRTL ? 'رابط الصفحة' : 'Page URL'}</Label>
                <Input
                  placeholder="https://example.com/page"
                  value={url.loc}
                  onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{isRTL ? 'آخر تعديل' : 'Last Modified'}</Label>
                  <Input
                    type="date"
                    value={url.lastmod}
                    onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'معدل التغيير' : 'Change Frequency'}</Label>
                  <Select value={url.changefreq} onValueChange={(v) => updateUrl(index, 'changefreq', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">{isRTL ? 'دائماً' : 'Always'}</SelectItem>
                      <SelectItem value="hourly">{isRTL ? 'كل ساعة' : 'Hourly'}</SelectItem>
                      <SelectItem value="daily">{isRTL ? 'يومياً' : 'Daily'}</SelectItem>
                      <SelectItem value="weekly">{isRTL ? 'أسبوعياً' : 'Weekly'}</SelectItem>
                      <SelectItem value="monthly">{isRTL ? 'شهرياً' : 'Monthly'}</SelectItem>
                      <SelectItem value="yearly">{isRTL ? 'سنوياً' : 'Yearly'}</SelectItem>
                      <SelectItem value="never">{isRTL ? 'أبداً' : 'Never'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'الأولوية' : 'Priority'}</Label>
                  <Select value={url.priority} onValueChange={(v) => updateUrl(index, 'priority', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0 ({isRTL ? 'الأعلى' : 'Highest'})</SelectItem>
                      <SelectItem value="0.9">0.9</SelectItem>
                      <SelectItem value="0.8">0.8</SelectItem>
                      <SelectItem value="0.7">0.7</SelectItem>
                      <SelectItem value="0.6">0.6</SelectItem>
                      <SelectItem value="0.5">0.5 ({isRTL ? 'متوسط' : 'Normal'})</SelectItem>
                      <SelectItem value="0.4">0.4</SelectItem>
                      <SelectItem value="0.3">0.3</SelectItem>
                      <SelectItem value="0.2">0.2</SelectItem>
                      <SelectItem value="0.1">0.1 ({isRTL ? 'الأدنى' : 'Lowest'})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generated Code */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label className="text-lg font-semibold">{isRTL ? 'الكود المُنشأ' : 'Generated XML'}</Label>
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ' : 'Copy')}
              </Button>
              <Button onClick={downloadSitemap} size="sm">
                <Download className="w-4 h-4 mr-2" />
                {isRTL ? 'تحميل' : 'Download'}
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 overflow-x-auto max-h-96">
            <pre className="text-sm text-foreground whitespace-pre font-mono" dir="ltr">
              {generateSitemap()}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
          <h3 className="font-semibold mb-2">{isRTL ? 'كيفية استخدام خريطة الموقع' : 'How to Use Your Sitemap'}</h3>
          <ol className={`text-sm text-muted-foreground space-y-2 ${isRTL ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
            <li>{isRTL ? 'حمّل الملف وارفعه إلى جذر موقعك (example.com/sitemap.xml)' : 'Download and upload to your website root (example.com/sitemap.xml)'}</li>
            <li>{isRTL ? 'أضف رابط خريطة الموقع إلى ملف robots.txt' : 'Add sitemap URL to your robots.txt file'}</li>
            <li>{isRTL ? 'أرسل الرابط عبر Google Search Console' : 'Submit via Google Search Console'}</li>
            <li>{isRTL ? 'أرسل الرابط عبر Bing Webmaster Tools' : 'Submit via Bing Webmaster Tools'}</li>
          </ol>
        </div>
      </div>
    </ToolPageLayout>
  );
}
