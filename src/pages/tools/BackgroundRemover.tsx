import { useState, useRef } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { Upload, Download, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const BackgroundRemover = () => {
  const { isRTL } = useLanguage();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(isRTL ? 'الرجاء اختيار صورة' : 'Please select an image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setResultImage(null);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setProgress(isRTL ? 'جاري تحميل النموذج...' : 'Loading AI model...');

    try {
      // Dynamic import to avoid loading the heavy library on page load
      const { removeBackground, loadImage } = await import('@/lib/backgroundRemoval');
      
      setProgress(isRTL ? 'جاري معالجة الصورة...' : 'Processing image...');
      
      // Convert data URL to blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      // Load image element
      const imgElement = await loadImage(blob);
      
      setProgress(isRTL ? 'جاري إزالة الخلفية...' : 'Removing background...');
      
      // Remove background
      const resultBlob = await removeBackground(imgElement);
      
      // Convert result to data URL
      const resultUrl = URL.createObjectURL(resultBlob);
      setResultImage(resultUrl);
      
      toast.success(isRTL ? 'تمت إزالة الخلفية بنجاح!' : 'Background removed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء المعالجة' : 'Error processing image');
    } finally {
      setIsProcessing(false);
      setProgress('');
    }
  };

  const downloadResult = () => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'removed-background.png';
    link.click();
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'إزالة خلفية الصور' : 'Background Remover'}
      description={isRTL 
        ? 'أزل خلفية الصور تلقائياً باستخدام الذكاء الاصطناعي - مجاناً ومن المتصفح مباشرة'
        : 'Remove image backgrounds automatically using AI - free and directly in your browser'}
      keywords="background remover, remove background, AI background removal, transparent background"
      article={isRTL 
        ? 'أداة إزالة الخلفية تستخدم الذكاء الاصطناعي لإزالة خلفية الصور تلقائياً. كل المعالجة تتم في متصفحك - لا يتم رفع صورك لأي خادم. مثالية لصور المنتجات والبورتريهات.'
        : 'The background remover uses AI to automatically remove image backgrounds. All processing happens in your browser - your images are never uploaded to any server. Perfect for product photos and portraits.'}
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <div 
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {isRTL ? 'اضغط لاختيار صورة أو اسحبها هنا' : 'Click to select an image or drag it here'}
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            PNG, JPG, WebP
          </p>
        </div>

        {/* Images Display */}
        {originalImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-bold text-foreground mb-3 text-center">
                {isRTL ? 'الصورة الأصلية' : 'Original Image'}
              </h3>
              <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Result */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-bold text-foreground mb-3 text-center">
                {isRTL ? 'النتيجة' : 'Result'}
              </h3>
              <div 
                className="aspect-square rounded-lg overflow-hidden flex items-center justify-center"
                style={{
                  background: resultImage 
                    ? 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                    : 'hsl(var(--muted) / 0.3)'
                }}
              >
                {resultImage ? (
                  <img 
                    src={resultImage} 
                    alt="Result" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {isRTL ? 'ستظهر النتيجة هنا' : 'Result will appear here'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        {isProcessing && progress && (
          <div className="text-center py-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
            <p className="text-muted-foreground">{progress}</p>
          </div>
        )}

        {/* Actions */}
        {originalImage && (
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={processImage} 
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isRTL ? 'إزالة الخلفية' : 'Remove Background'}
            </Button>
            
            {resultImage && (
              <Button variant="outline" onClick={downloadResult} className="gap-2">
                <Download className="w-4 h-4" />
                {isRTL ? 'تحميل النتيجة' : 'Download Result'}
              </Button>
            )}
          </div>
        )}

        {/* Note */}
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            {isRTL 
              ? '⚡ المعالجة تتم بالكامل في متصفحك - صورك لا تغادر جهازك أبداً'
              : '⚡ Processing happens entirely in your browser - your images never leave your device'}
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default BackgroundRemover;
