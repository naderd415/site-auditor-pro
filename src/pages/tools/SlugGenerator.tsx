import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Link2 } from 'lucide-react';
import { toast } from 'sonner';

const SlugGenerator = () => {
  const { t, isRTL } = useLanguage();
  
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [separator, setSeparator] = useState('-');

  const generateSlug = (text: string) => {
    let result = text
      .toLowerCase()
      .trim()
      // Replace Arabic characters with Latin equivalents (basic)
      .replace(/[\u0600-\u06FF]/g, (char) => {
        const arabicToLatin: Record<string, string> = {
          'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'a',
          'ب': 'b', 'ت': 't', 'ث': 'th',
          'ج': 'j', 'ح': 'h', 'خ': 'kh',
          'د': 'd', 'ذ': 'th', 'ر': 'r', 'ز': 'z',
          'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd',
          'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh',
          'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l',
          'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w',
          'ي': 'y', 'ى': 'a', 'ة': 'h', 'ء': '',
        };
        return arabicToLatin[char] || '';
      })
      // Replace accented characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Replace spaces and special characters with separator
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, separator)
      // Remove leading/trailing separators
      .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '')
      // Remove duplicate separators
      .replace(new RegExp(`${separator}+`, 'g'), separator);
    
    setSlug(result);
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    generateSlug(text);
  };

  const copyToClipboard = async () => {
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const separators = [
    { id: '-', label: isRTL ? 'شرطة (-)' : 'Dash (-)' },
    { id: '_', label: isRTL ? 'شرطة سفلية (_)' : 'Underscore (_)' },
  ];

  return (
    <ToolPageLayout
      title={t.tools.slugGenerator.name}
      description={t.tools.slugGenerator.description}
      article={t.tools.slugGenerator.article}
      keywords="slug generator, URL slug, SEO friendly URL, مولد Slug"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'النص الأصلي' : 'Original Text'}
          </label>
          <Input
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={isRTL ? 'أدخل النص هنا...' : 'Enter your text here...'}
          />
        </div>

        {/* Separator */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'الفاصل' : 'Separator'}
          </label>
          <div className="flex gap-2">
            {separators.map((sep) => (
              <Button
                key={sep.id}
                variant={separator === sep.id ? 'default' : 'outline'}
                onClick={() => {
                  setSeparator(sep.id);
                  generateSlug(input.replace(new RegExp(`[${separator}]`, 'g'), sep.id));
                }}
              >
                {sep.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'الـ Slug' : 'Slug'}
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-muted border border-border rounded-lg px-4 py-3 font-mono text-foreground" dir="ltr">
              {slug || (isRTL ? 'سيظهر هنا...' : 'Will appear here...')}
            </div>
            <Button onClick={copyToClipboard} disabled={!slug}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview URL */}
        {slug && (
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">
              {isRTL ? 'معاينة الرابط' : 'URL Preview'}
            </p>
            <div className="flex items-center gap-2 text-foreground font-mono text-sm" dir="ltr">
              <Link2 className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">https://example.com/</span>
              <span className="text-primary">{slug}</span>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default SlugGenerator;
