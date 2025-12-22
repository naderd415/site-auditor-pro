import { useState, useMemo } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { RefreshCw, Check, X } from 'lucide-react';

const ContrastChecker = () => {
  const { isRTL } = useLanguage();
  const [foreground, setForeground] = useState('#ffffff');
  const [background, setBackground] = useState('#1a1a2e');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const contrastRatio = useMemo(() => {
    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);
    
    const l1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }, [foreground, background]);

  const swapColors = () => {
    setForeground(background);
    setBackground(foreground);
  };

  const getWCAGLevel = (ratio: number, size: 'normal' | 'large') => {
    if (size === 'large') {
      if (ratio >= 4.5) return { level: 'AAA', pass: true };
      if (ratio >= 3) return { level: 'AA', pass: true };
      return { level: 'Fail', pass: false };
    } else {
      if (ratio >= 7) return { level: 'AAA', pass: true };
      if (ratio >= 4.5) return { level: 'AA', pass: true };
      return { level: 'Fail', pass: false };
    }
  };

  const normalText = getWCAGLevel(contrastRatio, 'normal');
  const largeText = getWCAGLevel(contrastRatio, 'large');

  return (
    <ToolPageLayout
      title={isRTL ? 'فاحص التباين' : 'Contrast Checker'}
      description={isRTL 
        ? 'تحقق من نسبة التباين بين الألوان وفقًا لمعايير WCAG للوصولية'
        : 'Check color contrast ratio according to WCAG accessibility standards'}
      keywords="contrast checker, WCAG, accessibility, color contrast, a11y"
      article={isRTL 
        ? 'فاحص التباين يساعدك على التأكد من أن النصوص قابلة للقراءة على خلفياتها. يستخدم معايير WCAG لتحديد ما إذا كانت الألوان متوافقة مع معايير الوصولية.'
        : 'The contrast checker helps ensure text is readable on its background. It uses WCAG standards to determine if colors meet accessibility guidelines.'}
    >
      <div className="space-y-8">
        {/* Preview */}
        <div 
          className="rounded-2xl p-8 md:p-12 text-center transition-all"
          style={{ backgroundColor: background }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: foreground }}
          >
            {isRTL ? 'نص للمعاينة' : 'Preview Text'}
          </h2>
          <p 
            className="text-lg md:text-xl"
            style={{ color: foreground }}
          >
            {isRTL 
              ? 'هذا نص تجريبي لاختبار قابلية القراءة'
              : 'This is sample text to test readability'}
          </p>
        </div>

        {/* Contrast Ratio */}
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            {isRTL ? 'نسبة التباين' : 'Contrast Ratio'}
          </p>
          <p className="text-5xl font-bold text-foreground">
            {contrastRatio.toFixed(2)}:1
          </p>
        </div>

        {/* Color Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label>{isRTL ? 'لون النص (المقدمة)' : 'Text Color (Foreground)'}</Label>
            <div className="flex gap-3">
              <Input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-16 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="font-mono uppercase"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>{isRTL ? 'لون الخلفية' : 'Background Color'}</Label>
            <div className="flex gap-3">
              <Input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-16 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={swapColors} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {isRTL ? 'تبديل الألوان' : 'Swap Colors'}
          </Button>
        </div>

        {/* WCAG Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-bold text-lg text-foreground mb-4">
              {isRTL ? 'النص العادي' : 'Normal Text'}
              <span className="text-sm text-muted-foreground font-normal block">
                {isRTL ? '(أقل من 18pt أو 14pt bold)' : '(< 18pt or 14pt bold)'}
              </span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">WCAG AA (4.5:1)</span>
                {contrastRatio >= 4.5 ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <Check className="w-5 h-5" /> {isRTL ? 'مقبول' : 'Pass'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <X className="w-5 h-5" /> {isRTL ? 'غير مقبول' : 'Fail'}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">WCAG AAA (7:1)</span>
                {contrastRatio >= 7 ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <Check className="w-5 h-5" /> {isRTL ? 'مقبول' : 'Pass'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <X className="w-5 h-5" /> {isRTL ? 'غير مقبول' : 'Fail'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-bold text-lg text-foreground mb-4">
              {isRTL ? 'النص الكبير' : 'Large Text'}
              <span className="text-sm text-muted-foreground font-normal block">
                {isRTL ? '(18pt+ أو 14pt bold+)' : '(18pt+ or 14pt bold+)'}
              </span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">WCAG AA (3:1)</span>
                {contrastRatio >= 3 ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <Check className="w-5 h-5" /> {isRTL ? 'مقبول' : 'Pass'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <X className="w-5 h-5" /> {isRTL ? 'غير مقبول' : 'Fail'}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">WCAG AAA (4.5:1)</span>
                {contrastRatio >= 4.5 ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <Check className="w-5 h-5" /> {isRTL ? 'مقبول' : 'Pass'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <X className="w-5 h-5" /> {isRTL ? 'غير مقبول' : 'Fail'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default ContrastChecker;
