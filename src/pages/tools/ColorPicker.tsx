import { useState, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ColorFormat {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

const ColorPicker = () => {
  const { t, isRTL } = useLanguage();
  const [color, setColor] = useState('#00bcd4');
  const [formats, setFormats] = useState<ColorFormat>({
    hex: '#00bcd4',
    rgb: { r: 0, g: 188, b: 212 },
    hsl: { h: 187, s: 100, l: 42 },
  });

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateColor = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor(hex);
      setFormats({ hex, rgb, hsl });
    }
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(isRTL ? `تم نسخ ${label}!` : `${label} copied!`);
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const generateRandom = () => {
    const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    updateColor(hex);
  };

  const colorFormats = [
    { 
      label: 'HEX', 
      value: formats.hex.toUpperCase(),
    },
    { 
      label: 'RGB', 
      value: `rgb(${formats.rgb.r}, ${formats.rgb.g}, ${formats.rgb.b})`,
    },
    { 
      label: 'HSL', 
      value: `hsl(${formats.hsl.h}, ${formats.hsl.s}%, ${formats.hsl.l}%)`,
    },
  ];

  return (
    <ToolPageLayout
      title={t.tools.colorPicker.name}
      description={t.tools.colorPicker.description}
      article={t.tools.colorPicker.article}
      keywords="color picker, hex color, RGB, HSL, منتقي الألوان"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Color Preview */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-48 h-48 rounded-2xl shadow-lg border-4 border-background"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => updateColor(e.target.value)}
            className="w-48 h-12 rounded-lg cursor-pointer"
          />
        </div>

        {/* Random Button */}
        <Button onClick={generateRandom} variant="outline" className="w-full">
          <RefreshCw className="w-4 h-4 me-2" />
          {isRTL ? 'لون عشوائي' : 'Random Color'}
        </Button>

        {/* Color Formats */}
        <div className="space-y-3">
          {colorFormats.map((format) => (
            <div key={format.label} className="flex items-center gap-3">
              <span className="w-12 text-sm font-medium text-muted-foreground">
                {format.label}
              </span>
              <Input
                value={format.value}
                readOnly
                className="flex-1 font-mono"
                dir="ltr"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(format.value, format.label)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Color Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="glass-card p-4 rounded-xl">
            <p className="text-2xl font-bold text-foreground">R: {formats.rgb.r}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-2xl font-bold text-foreground">G: {formats.rgb.g}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-2xl font-bold text-foreground">B: {formats.rgb.b}</p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default ColorPicker;
