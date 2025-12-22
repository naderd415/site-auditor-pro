import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const GradientGenerator = () => {
  const { t, isRTL } = useLanguage();
  
  const [color1, setColor1] = useState('#00bcd4');
  const [color2, setColor2] = useState('#9c27b0');
  const [angle, setAngle] = useState(135);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');

  const gradientCSS = gradientType === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`background: ${gradientCSS};`);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const randomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  const presets = [
    { name: 'Sunset', c1: '#ff512f', c2: '#f09819' },
    { name: 'Ocean', c1: '#2193b0', c2: '#6dd5ed' },
    { name: 'Purple', c1: '#8e2de2', c2: '#4a00e0' },
    { name: 'Mint', c1: '#00b09b', c2: '#96c93d' },
    { name: 'Fire', c1: '#f12711', c2: '#f5af19' },
    { name: 'Night', c1: '#0f2027', c2: '#2c5364' },
  ];

  return (
    <ToolPageLayout
      title={t.tools.gradientGenerator.name}
      description={t.tools.gradientGenerator.description}
      article={t.tools.gradientGenerator.article}
      keywords="gradient generator, CSS gradient, color gradient, مولد التدرج اللوني"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Preview */}
        <div
          className="w-full h-48 rounded-2xl shadow-lg"
          style={{ background: gradientCSS }}
        />

        {/* Type Selection */}
        <div className="flex gap-2 justify-center">
          <Button
            variant={gradientType === 'linear' ? 'default' : 'outline'}
            onClick={() => setGradientType('linear')}
          >
            {isRTL ? 'خطي' : 'Linear'}
          </Button>
          <Button
            variant={gradientType === 'radial' ? 'default' : 'outline'}
            onClick={() => setGradientType('radial')}
          >
            {isRTL ? 'دائري' : 'Radial'}
          </Button>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {isRTL ? 'اللون الأول' : 'Color 1'}
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 bg-muted border border-border rounded-lg px-3 text-foreground font-mono"
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {isRTL ? 'اللون الثاني' : 'Color 2'}
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 bg-muted border border-border rounded-lg px-3 text-foreground font-mono"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Angle (for linear) */}
        {gradientType === 'linear' && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {isRTL ? 'الزاوية' : 'Angle'}: {angle}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Presets */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {isRTL ? 'قوالب جاهزة' : 'Presets'}
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setColor1(preset.c1);
                  setColor2(preset.c2);
                }}
                className="w-10 h-10 rounded-lg shadow-md transition-transform hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${preset.c1}, ${preset.c2})` }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* CSS Output */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'كود CSS' : 'CSS Code'}
          </label>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm break-all" dir="ltr">
            background: {gradientCSS};
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={randomGradient} variant="outline" className="flex-1">
            <RefreshCw className="w-4 h-4 me-2" />
            {isRTL ? 'عشوائي' : 'Random'}
          </Button>
          <Button onClick={copyToClipboard} className="flex-1 btn-primary">
            <Copy className="w-4 h-4 me-2" />
            {isRTL ? 'نسخ CSS' : 'Copy CSS'}
          </Button>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default GradientGenerator;
