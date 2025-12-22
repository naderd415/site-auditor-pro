import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { Copy, RefreshCw, Lock, Unlock } from 'lucide-react';
import { toast } from 'sonner';

interface Color {
  hex: string;
  locked: boolean;
}

const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
};

const ColorPalette = () => {
  const { isRTL } = useLanguage();
  const [colors, setColors] = useState<Color[]>([
    { hex: '#00d4ff', locked: false },
    { hex: '#a855f7', locked: false },
    { hex: '#22c55e', locked: false },
    { hex: '#f43f5e', locked: false },
    { hex: '#fbbf24', locked: false },
  ]);

  const generatePalette = () => {
    setColors(colors.map(color => 
      color.locked ? color : { ...color, hex: generateRandomColor() }
    ));
  };

  const toggleLock = (index: number) => {
    setColors(colors.map((color, i) => 
      i === index ? { ...color, locked: !color.locked } : color
    ));
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(isRTL ? 'تم نسخ اللون!' : 'Color copied!');
  };

  const copyAllColors = () => {
    const allHex = colors.map(c => c.hex).join(', ');
    navigator.clipboard.writeText(allHex);
    toast.success(isRTL ? 'تم نسخ جميع الألوان!' : 'All colors copied!');
  };

  const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'مولد لوحة الألوان' : 'Color Palette Generator'}
      description={isRTL 
        ? 'ولّد لوحات ألوان متناسقة وجميلة بضغطة زر'
        : 'Generate beautiful harmonious color palettes with one click'}
      keywords="color palette, palette generator, color scheme, colors"
      article={isRTL 
        ? 'مولد لوحة الألوان يساعدك على إنشاء تركيبات ألوان متناسقة لمشاريعك. اضغط على زر التوليد للحصول على ألوان جديدة، أو اقفل الألوان التي تعجبك للحفاظ عليها.'
        : 'The color palette generator helps you create harmonious color combinations for your projects. Press generate to get new colors, or lock colors you like to keep them.'}
    >
      <div className="space-y-6">
        {/* Palette Display */}
        <div className="grid grid-cols-5 gap-2 h-64 rounded-xl overflow-hidden">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center justify-center transition-all hover:scale-105"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleLock(index)}
                  style={{ color: getContrastColor(color.hex) }}
                  className="hover:bg-white/20"
                >
                  {color.locked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyColor(color.hex)}
                  style={{ color: getContrastColor(color.hex) }}
                  className="hover:bg-white/20"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <span 
                className="absolute bottom-4 font-mono text-sm font-bold"
                style={{ color: getContrastColor(color.hex) }}
              >
                {color.hex.toUpperCase()}
              </span>
              {color.locked && (
                <Lock className="absolute top-4 w-4 h-4" style={{ color: getContrastColor(color.hex) }} />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={generatePalette} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {isRTL ? 'توليد لوحة جديدة' : 'Generate New Palette'}
          </Button>
          <Button variant="outline" onClick={copyAllColors} className="gap-2">
            <Copy className="w-4 h-4" />
            {isRTL ? 'نسخ الكل' : 'Copy All'}
          </Button>
        </div>

        {/* Color Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colors.map((color, index) => (
            <div key={index} className="glass-card p-4 rounded-xl text-center">
              <div 
                className="w-full h-20 rounded-lg mb-3"
                style={{ backgroundColor: color.hex }}
              />
              <p className="font-mono text-sm text-foreground">{color.hex.toUpperCase()}</p>
            </div>
          ))}
        </div>

        {/* Keyboard Shortcut Hint */}
        <p className="text-center text-sm text-muted-foreground">
          {isRTL 
            ? 'اضغط على الفراغ (Space) لتوليد ألوان جديدة' 
            : 'Press Space to generate new colors'}
        </p>
      </div>
    </ToolPageLayout>
  );
};

export default ColorPalette;
