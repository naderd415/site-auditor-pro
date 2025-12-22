import { useState, useRef, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const ImageConverter = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpg' | 'webp'>('png');
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);

  const formats = [
    { id: 'png', label: 'PNG', mime: 'image/png' },
    { id: 'jpg', label: 'JPG', mime: 'image/jpeg' },
    { id: 'webp', label: 'WebP', mime: 'image/webp' },
  ];

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const format = file.type.split('/')[1]?.toUpperCase() || 'Unknown';
    setOriginalFormat(format);

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      setOriginalImage(img);
      setPreviewUrl(url);
    };
    
    img.src = url;
  }, []);

  const convertImage = useCallback(() => {
    if (!originalImage) return;
    
    setConverting(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = originalImage.naturalWidth;
      canvas.height = originalImage.naturalHeight;
      
      // For JPG, fill with white background
      if (targetFormat === 'jpg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(originalImage, 0, 0);
      
      const mimeType = formats.find(f => f.id === targetFormat)?.mime || 'image/png';
      const qualityValue = targetFormat === 'png' ? undefined : quality / 100;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `converted-image.${targetFormat}`;
            link.click();
            URL.revokeObjectURL(url);
            toast.success(isRTL ? 'تم التحويل بنجاح!' : 'Conversion successful!');
          }
          setConverting(false);
        },
        mimeType,
        qualityValue
      );
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء التحويل' : 'Error during conversion');
      setConverting(false);
    }
  }, [originalImage, targetFormat, quality, isRTL]);

  return (
    <ToolPageLayout
      title={t.tools.imageConverter.name}
      description={t.tools.imageConverter.description}
      article={t.tools.imageConverter.article}
      keywords="image converter, convert image, PNG to JPG, JPG to PNG, WebP converter, محول الصور"
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
                {isRTL ? `الصيغة الأصلية: ${originalFormat}` : `Original format: ${originalFormat}`}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  {isRTL ? 'اسحب صورة هنا أو اضغط للاختيار' : 'Drag image here or click to select'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, WebP, GIF, BMP
                </p>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {originalImage && (
          <>
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {isRTL ? 'تحويل إلى' : 'Convert to'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setTargetFormat(format.id as any)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      targetFormat === format.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <span className="text-lg font-semibold">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality (for JPG and WebP) */}
            {targetFormat !== 'png' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'الجودة' : 'Quality'}: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Convert Button */}
            <Button 
              onClick={convertImage} 
              disabled={converting}
              className="w-full btn-primary"
            >
              {converting ? (
                <RefreshCw className="w-4 h-4 me-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 me-2" />
              )}
              {isRTL ? 'تحويل وتحميل' : 'Convert & Download'}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageConverter;
