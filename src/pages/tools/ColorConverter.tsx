import { useState, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const ColorConverter = () => {
  const { t, isRTL } = useLanguage();
  
  const [hex, setHex] = useState('#00bcd4');
  const [rgb, setRgb] = useState({ r: 0, g: 188, b: 212 });
  const [hsl, setHsl] = useState({ h: 187, s: 100, l: 42 });
  const [cmyk, setCmyk] = useState({ c: 100, m: 11, y: 0, k: 17 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
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

  const rgbToCmyk = (r: number, g: number, b: number) => {
    const rp = r / 255, gp = g / 255, bp = b / 255;
    const k = 1 - Math.max(rp, gp, bp);
    
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    
    return {
      c: Math.round((1 - rp - k) / (1 - k) * 100),
      m: Math.round((1 - gp - k) / (1 - k) * 100),
      y: Math.round((1 - bp - k) / (1 - k) * 100),
      k: Math.round(k * 100)
    };
  };

  const updateFromHex = useCallback((newHex: string) => {
    const cleanHex = newHex.replace('#', '');
    if (!/^[a-f\d]{6}$/i.test(cleanHex)) return;
    
    const formattedHex = '#' + cleanHex;
    const newRgb = hexToRgb(formattedHex);
    
    if (newRgb) {
      setHex(formattedHex);
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
    }
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
    setCmyk(rgbToCmyk(r, g, b));
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const colorFormats = [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  return (
    <ToolPageLayout
      title={t.tools.colorConverter.name}
      description={t.tools.colorConverter.description}
      article={t.tools.colorConverter.article}
      keywords="color converter, HEX to RGB, RGB to HSL, محول الألوان"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Color Preview */}
        <div className="flex justify-center">
          <div
            className="w-32 h-32 rounded-2xl shadow-lg border-4 border-background"
            style={{ backgroundColor: hex }}
          />
        </div>

        {/* HEX Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">HEX</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer"
            />
            <Input
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="flex-1 font-mono"
              dir="ltr"
            />
          </div>
        </div>

        {/* RGB Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">RGB</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-xs text-muted-foreground">R</span>
              <Input
                type="number"
                value={rgb.r}
                onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)}
                min={0}
                max={255}
                dir="ltr"
              />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">G</span>
              <Input
                type="number"
                value={rgb.g}
                onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)}
                min={0}
                max={255}
                dir="ltr"
              />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">B</span>
              <Input
                type="number"
                value={rgb.b}
                onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))}
                min={0}
                max={255}
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* All Formats */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">{isRTL ? 'جميع الصيغ' : 'All Formats'}</h3>
          {colorFormats.map((format) => (
            <div key={format.label} className="flex items-center gap-2">
              <span className="w-14 text-sm text-muted-foreground">{format.label}</span>
              <div className="flex-1 bg-muted px-3 py-2 rounded-lg font-mono text-sm" dir="ltr">
                {format.value}
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(format.value)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default ColorConverter;
