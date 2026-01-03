import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const OpenGraphPreview = () => {
  const { isRTL } = useLanguage();
  const [ogData, setOgData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    siteName: '',
    type: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '',
  });

  const generateOgTags = () => {
    return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogData.type}">
<meta property="og:url" content="${ogData.url}">
<meta property="og:title" content="${ogData.title}">
<meta property="og:description" content="${ogData.description}">
<meta property="og:image" content="${ogData.image}">
${ogData.siteName ? `<meta property="og:site_name" content="${ogData.siteName}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="${ogData.twitterCard}">
<meta property="twitter:url" content="${ogData.url}">
<meta property="twitter:title" content="${ogData.title}">
<meta property="twitter:description" content="${ogData.description}">
<meta property="twitter:image" content="${ogData.image}">
${ogData.twitterSite ? `<meta property="twitter:site" content="${ogData.twitterSite}">` : ''}`;
  };

  const copyTags = () => {
    navigator.clipboard.writeText(generateOgTags());
    toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
  };

  const PreviewCard = ({ platform, icon: Icon, bgColor }: { platform: string; icon: any; bgColor: string }) => (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className={`${bgColor} px-4 py-2 flex items-center gap-2`}>
        <Icon className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-medium">{platform}</span>
      </div>
      <div className="bg-card">
        {ogData.image && (
          <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
            <img 
              src={ogData.image} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect fill="%23374151" width="400" height="200"/><text fill="%239CA3AF" font-size="16" text-anchor="middle" x="200" y="105">Image Preview</text></svg>';
              }}
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase mb-1">
            {ogData.url ? new URL(ogData.url).hostname : 'example.com'}
          </p>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
            {ogData.title || (isRTL ? 'عنوان الصفحة' : 'Page Title')}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ogData.description || (isRTL ? 'وصف الصفحة سيظهر هنا...' : 'Page description will appear here...')}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title={isRTL ? 'معاينة Open Graph AI' : 'Open Graph Preview AI'}
      description={isRTL 
        ? 'أنشئ وعاين وسوم Open Graph لمواقع التواصل الاجتماعي. شاهد كيف سيظهر رابطك على فيسبوك وتويتر ولينكدإن.' 
        : 'Create and preview Open Graph meta tags for social media. See how your link will appear on Facebook, Twitter, and LinkedIn.'}
      keywords="open graph, og tags, social media preview, facebook preview, twitter card, linkedin preview, meta tags, SEO"
      article={isRTL 
        ? 'أداة معاينة Open Graph تساعدك على إنشاء وسوم Open Graph احترافية لتحسين ظهور روابط موقعك على منصات التواصل الاجتماعي. شاهد معاينة حية لكيفية ظهور رابطك على فيسبوك وتويتر ولينكدإن وواتساب.'
        : 'Open Graph Preview tool helps you create professional Open Graph meta tags to improve how your links appear on social media platforms. See a live preview of how your link will look on Facebook, Twitter, LinkedIn, and WhatsApp.'}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">
                {isRTL ? 'بيانات Open Graph' : 'Open Graph Data'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'العنوان' : 'Title'} *
                  </label>
                  <Input
                    value={ogData.title}
                    onChange={(e) => setOgData({ ...ogData, title: e.target.value })}
                    placeholder={isRTL ? 'عنوان الصفحة' : 'Page Title'}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {ogData.title.length}/60 {isRTL ? 'حرف' : 'characters'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'الوصف' : 'Description'} *
                  </label>
                  <Textarea
                    value={ogData.description}
                    onChange={(e) => setOgData({ ...ogData, description: e.target.value })}
                    placeholder={isRTL ? 'وصف مختصر للصفحة...' : 'Brief description of the page...'}
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {ogData.description.length}/160 {isRTL ? 'حرف' : 'characters'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'رابط الصفحة' : 'Page URL'} *
                  </label>
                  <Input
                    value={ogData.url}
                    onChange={(e) => setOgData({ ...ogData, url: e.target.value })}
                    placeholder="https://example.com/page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'رابط الصورة' : 'Image URL'} *
                  </label>
                  <Input
                    value={ogData.image}
                    onChange={(e) => setOgData({ ...ogData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? 'الأبعاد المثالية: 1200x630 بكسل' : 'Recommended: 1200x630 pixels'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'اسم الموقع' : 'Site Name'}
                  </label>
                  <Input
                    value={ogData.siteName}
                    onChange={(e) => setOgData({ ...ogData, siteName: e.target.value })}
                    placeholder="My Website"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isRTL ? 'نوع المحتوى' : 'Content Type'}
                    </label>
                    <select
                      value={ogData.type}
                      onChange={(e) => setOgData({ ...ogData, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="product">Product</option>
                      <option value="profile">Profile</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Twitter Card
                    </label>
                    <select
                      value={ogData.twitterCard}
                      onChange={(e) => setOgData({ ...ogData, twitterCard: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    >
                      <option value="summary_large_image">Large Image</option>
                      <option value="summary">Summary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'حساب تويتر' : 'Twitter Handle'}
                  </label>
                  <Input
                    value={ogData.twitterSite}
                    onChange={(e) => setOgData({ ...ogData, twitterSite: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  {isRTL ? 'الكود المُنشأ' : 'Generated Code'}
                </h2>
                <Button onClick={copyTags} size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-1" />
                  {isRTL ? 'نسخ' : 'Copy'}
                </Button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                {generateOgTags()}
              </pre>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold">
              {isRTL ? 'معاينة على المنصات' : 'Platform Preview'}
            </h2>

            <PreviewCard platform="Facebook" icon={Facebook} bgColor="bg-blue-600" />
            <PreviewCard platform="Twitter / X" icon={Twitter} bgColor="bg-black" />
            <PreviewCard platform="LinkedIn" icon={Linkedin} bgColor="bg-blue-700" />
            <PreviewCard platform="WhatsApp" icon={MessageCircle} bgColor="bg-green-600" />
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default OpenGraphPreview;
