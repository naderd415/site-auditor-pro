import { useState, useRef, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, RefreshCw, Link2, Lock, Unlock, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

const ImageResizer = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [newHeight, setNewHeight] = useState(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizing, setResizing] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      setOriginalImage(img);
      setPreviewUrl(url);
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setNewWidth(img.naturalWidth);
      setNewHeight(img.naturalHeight);
    };
    
    img.src = url;
  }, []);

  const handleWidthChange = (width: number) => {
    setNewWidth(width);
    if (lockAspectRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setNewHeight(Math.round(width * ratio));
    }
  };

  const handleHeightChange = (height: number) => {
    setNewHeight(height);
    if (lockAspectRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setNewWidth(Math.round(height * ratio));
    }
  };

  const presetSizes = [
    { label: '50%', factor: 0.5 },
    { label: '75%', factor: 0.75 },
    { label: '150%', factor: 1.5 },
    { label: '200%', factor: 2 },
  ];

  const applyPreset = (factor: number) => {
    setNewWidth(Math.round(originalWidth * factor));
    setNewHeight(Math.round(originalHeight * factor));
  };

  const resizeImage = useCallback(() => {
    if (!originalImage || newWidth <= 0 || newHeight <= 0) return;
    
    setResizing(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Use better quality interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `resized-${newWidth}x${newHeight}.png`;
            link.click();
            URL.revokeObjectURL(url);
            toast.success(isRTL ? 'تم تغيير الحجم بنجاح!' : 'Resize successful!');
          }
          setResizing(false);
        },
        'image/png'
      );
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ' : 'Error occurred');
      setResizing(false);
    }
  }, [originalImage, newWidth, newHeight, isRTL]);

  return (
    <ToolPageLayout
      title={t.tools.imageResizer.name}
      description={t.tools.imageResizer.description}
      article={t.tools.imageResizer.article}
      keywords="image resizer, resize image, change image size, تغيير حجم الصورة"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {previewUrl ? (
            <div className="space-y-4">
              <img src={previewUrl} alt="Preview" className="max-w-full max-h-[300px] mx-auto rounded-lg" />
              <p className="text-sm text-muted-foreground">
                {isRTL 
                  ? `الحجم الأصلي: ${originalWidth} × ${originalHeight} بكسل`
                  : `Original: ${originalWidth} × ${originalHeight} px`}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Minimize2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  {isRTL ? 'اسحب صورة هنا أو اضغط للاختيار' : 'Drag image here or click to select'}
                </p>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {originalImage && (
          <>
            {/* Presets */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {isRTL ? 'أحجام سريعة' : 'Quick Sizes'}
              </label>
              <div className="flex gap-2">
                {presetSizes.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset.factor)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'العرض (بكسل)' : 'Width (px)'}
                </label>
                <Input
                  type="number"
                  value={newWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  min={1}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'الارتفاع (بكسل)' : 'Height (px)'}
                </label>
                <Input
                  type="number"
                  value={newHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  min={1}
                  dir="ltr"
                />
              </div>
            </div>

            {/* Lock Aspect Ratio */}
            <Button
              variant="outline"
              onClick={() => setLockAspectRatio(!lockAspectRatio)}
              className="w-full"
            >
              {lockAspectRatio ? (
                <Lock className="w-4 h-4 me-2" />
              ) : (
                <Unlock className="w-4 h-4 me-2" />
              )}
              {isRTL 
                ? (lockAspectRatio ? 'نسبة الأبعاد مقفلة' : 'نسبة الأبعاد حرة')
                : (lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked')}
            </Button>

            {/* Resize Button */}
            <Button 
              onClick={resizeImage} 
              disabled={resizing}
              className="w-full btn-primary"
            >
              {resizing ? (
                <RefreshCw className="w-4 h-4 me-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 me-2" />
              )}
              {isRTL ? 'تغيير الحجم وتحميل' : 'Resize & Download'}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageResizer;
