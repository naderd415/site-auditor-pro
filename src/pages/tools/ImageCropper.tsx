import { useState, useRef, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download, RefreshCw, Crop, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { toast } from 'sonner';

const ImageCropper = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [cropEnd, setCropEnd] = useState({ x: 100, y: 100 });

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      setOriginalImage(img);
      setPreviewUrl(url);
      setCropStart({ x: 0, y: 0 });
      setCropEnd({ x: 100, y: 100 });
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
    };
    
    img.src = url;
  }, []);

  const applyTransforms = useCallback(() => {
    if (!originalImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate crop dimensions
    const cropX = (cropStart.x / 100) * originalImage.naturalWidth;
    const cropY = (cropStart.y / 100) * originalImage.naturalHeight;
    const cropWidth = ((cropEnd.x - cropStart.x) / 100) * originalImage.naturalWidth;
    const cropHeight = ((cropEnd.y - cropStart.y) / 100) * originalImage.naturalHeight;

    // Handle rotation dimensions
    const isRotated90 = rotation === 90 || rotation === 270;
    canvas.width = isRotated90 ? cropHeight : cropWidth;
    canvas.height = isRotated90 ? cropWidth : cropHeight;

    ctx.save();

    // Move to center for transforms
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply flips
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Draw cropped image centered
    const drawWidth = isRotated90 ? cropHeight : cropWidth;
    const drawHeight = isRotated90 ? cropWidth : cropHeight;
    
    ctx.drawImage(
      originalImage,
      cropX, cropY, cropWidth, cropHeight,
      -cropWidth / 2, -cropHeight / 2, cropWidth, cropHeight
    );

    ctx.restore();

    // Update preview
    setPreviewUrl(canvas.toDataURL('image/png'));
  }, [originalImage, cropStart, cropEnd, rotation, flipH, flipV]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cropped-image.png';
        link.click();
        URL.revokeObjectURL(url);
        toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
      }
    }, 'image/png');
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <ToolPageLayout
      title={t.tools.imageCropper.name}
      description={t.tools.imageCropper.description}
      article={t.tools.imageCropper.article}
      keywords="image cropper, crop image, rotate image, قص الصور"
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
            <img src={previewUrl} alt="Preview" className="max-w-full max-h-[300px] mx-auto rounded-lg" />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Crop className="w-8 h-8 text-primary" />
              </div>
              <p className="text-foreground font-medium">
                {isRTL ? 'اسحب صورة هنا أو اضغط للاختيار' : 'Drag image here or click to select'}
              </p>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {originalImage && (
          <>
            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'بداية القص X' : 'Crop Start X'}: {cropStart.x}%
                </label>
                <Slider
                  value={[cropStart.x]}
                  onValueChange={([v]) => setCropStart({ ...cropStart, x: v })}
                  max={cropEnd.x - 10}
                  step={1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'بداية القص Y' : 'Crop Start Y'}: {cropStart.y}%
                </label>
                <Slider
                  value={[cropStart.y]}
                  onValueChange={([v]) => setCropStart({ ...cropStart, y: v })}
                  max={cropEnd.y - 10}
                  step={1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'نهاية القص X' : 'Crop End X'}: {cropEnd.x}%
                </label>
                <Slider
                  value={[cropEnd.x]}
                  onValueChange={([v]) => setCropEnd({ ...cropEnd, x: v })}
                  min={cropStart.x + 10}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isRTL ? 'نهاية القص Y' : 'Crop End Y'}: {cropEnd.y}%
                </label>
                <Slider
                  value={[cropEnd.y]}
                  onValueChange={([v]) => setCropEnd({ ...cropEnd, y: v })}
                  min={cropStart.y + 10}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            {/* Transform Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={rotate}>
                <RotateCw className="w-4 h-4 me-2" />
                {isRTL ? 'تدوير' : 'Rotate'} 90°
              </Button>
              <Button variant={flipH ? 'default' : 'outline'} onClick={() => setFlipH(!flipH)}>
                <FlipHorizontal className="w-4 h-4 me-2" />
                {isRTL ? 'قلب أفقي' : 'Flip H'}
              </Button>
              <Button variant={flipV ? 'default' : 'outline'} onClick={() => setFlipV(!flipV)}>
                <FlipVertical className="w-4 h-4 me-2" />
                {isRTL ? 'قلب رأسي' : 'Flip V'}
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={applyTransforms} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 me-2" />
                {isRTL ? 'معاينة' : 'Preview'}
              </Button>
              <Button onClick={downloadImage} className="flex-1 btn-primary">
                <Download className="w-4 h-4 me-2" />
                {isRTL ? 'تحميل' : 'Download'}
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageCropper;
