import { useState, useRef, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, RefreshCw, FileImage } from 'lucide-react';
import { toast } from 'sonner';

const ImageCompressor = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [compressing, setCompressing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    setCompressedSize(0);
    setCompressedBlob(null);

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      setOriginalImage(img);
      setPreviewUrl(url);
    };
    
    img.src = url;
  }, []);

  const compressImage = useCallback(() => {
    if (!originalImage) return;
    
    setCompressing(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = originalImage.naturalWidth;
      canvas.height = originalImage.naturalHeight;
      ctx.drawImage(originalImage, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setCompressedBlob(blob);
            toast.success(isRTL ? 'تم الضغط بنجاح!' : 'Compression successful!');
          }
          setCompressing(false);
        },
        'image/jpeg',
        quality / 100
      );
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء الضغط' : 'Error during compression');
      setCompressing(false);
    }
  }, [originalImage, quality, isRTL]);

  const downloadCompressed = () => {
    if (!compressedBlob) return;
    
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compressed-image.jpg';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
  };

  const compressionRatio = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

  return (
    <ToolPageLayout
      title={t.tools.imageCompressor.name}
      description={t.tools.imageCompressor.description}
      article={t.tools.imageCompressor.article}
      keywords="image compressor, compress image, reduce image size, ضاغط الصور, تقليل حجم الصورة"
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
                {isRTL ? `الحجم الأصلي: ${formatSize(originalSize)}` : `Original size: ${formatSize(originalSize)}`}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FileImage className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  {isRTL ? 'اسحب صورة هنا أو اضغط للاختيار' : 'Drag image here or click to select'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, WebP
                </p>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {originalImage && (
          <>
            {/* Quality Slider */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {isRTL ? 'الجودة' : 'Quality'}: {quality}%
              </label>
              <Slider
                value={[quality]}
                onValueChange={([q]) => setQuality(q)}
                min={10}
                max={100}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{isRTL ? 'ضغط أعلى' : 'Higher compression'}</span>
                <span>{isRTL ? 'جودة أعلى' : 'Higher quality'}</span>
              </div>
            </div>

            {/* Compress Button */}
            <Button 
              onClick={compressImage} 
              disabled={compressing}
              className="w-full btn-primary"
            >
              {compressing ? (
                <RefreshCw className="w-4 h-4 me-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 me-2" />
              )}
              {isRTL ? 'ضغط الصورة' : 'Compress Image'}
            </Button>

            {/* Result */}
            {compressedSize > 0 && (
              <div className="glass-card p-6 rounded-xl space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'الحجم الأصلي' : 'Original'}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatSize(originalSize)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'بعد الضغط' : 'Compressed'}
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      {formatSize(compressedSize)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'التوفير' : 'Saved'}
                    </p>
                    <p className="text-lg font-semibold text-accent">
                      {compressionRatio}%
                    </p>
                  </div>
                </div>

                <Button onClick={downloadCompressed} className="w-full btn-primary">
                  <Download className="w-4 h-4 me-2" />
                  {isRTL ? 'تحميل الصورة المضغوطة' : 'Download Compressed Image'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageCompressor;
