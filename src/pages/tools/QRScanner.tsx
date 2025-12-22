import { useState, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Copy, ExternalLink, Camera } from 'lucide-react';
import { toast } from 'sonner';

const QRScanner = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanImage = useCallback(async (file: File) => {
    setIsScanning(true);
    
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          setScannedData(code.data);
          toast.success(isRTL ? 'تم قراءة QR بنجاح!' : 'QR code scanned successfully!');
        } else {
          setScannedData(null);
          toast.error(isRTL ? 'لم يتم العثور على QR في الصورة' : 'No QR code found in image');
        }
        
        setPreviewUrl(url);
        setIsScanning(false);
      };
      
      img.onerror = () => {
        toast.error(isRTL ? 'فشل في تحميل الصورة' : 'Failed to load image');
        setIsScanning(false);
      };
      
      img.src = url;
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء المسح' : 'Error scanning image');
      setIsScanning(false);
    }
  }, [isRTL]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      scanImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      scanImage(file);
    }
  };

  const copyToClipboard = async () => {
    if (!scannedData) return;
    try {
      await navigator.clipboard.writeText(scannedData);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const openLink = () => {
    if (scannedData && isUrl(scannedData)) {
      window.open(scannedData, '_blank');
    }
  };

  return (
    <ToolPageLayout
      title={t.tools.qrScanner.name}
      description={t.tools.qrScanner.description}
      article={t.tools.qrScanner.article}
      keywords="QR scanner, QR reader, scan QR code, ماسح QR, قارئ QR"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-[300px] max-h-[300px] rounded-lg" />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {isRTL ? 'اسحب صورة QR هنا أو اضغط للاختيار' : 'Drag QR image here or click to select'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PNG, JPG, WebP
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanning indicator */}
          {isScanning && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">
                {isRTL ? 'جاري المسح...' : 'Scanning...'}
              </p>
            </div>
          )}

          {/* Result */}
          {scannedData && (
            <div className="glass-card p-6 rounded-xl space-y-4">
              <h3 className="font-semibold text-foreground">
                {isRTL ? 'النتيجة' : 'Result'}
              </h3>
              <div className="bg-muted p-4 rounded-lg break-all">
                <p className="text-foreground" dir="auto">{scannedData}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 me-2" />
                  {isRTL ? 'نسخ' : 'Copy'}
                </Button>
                {isUrl(scannedData) && (
                  <Button onClick={openLink} className="flex-1 btn-primary">
                    <ExternalLink className="w-4 h-4 me-2" />
                    {isRTL ? 'فتح الرابط' : 'Open Link'}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Upload new */}
          {previewUrl && (
            <Button
              onClick={() => {
                setPreviewUrl(null);
                setScannedData(null);
                fileInputRef.current?.click();
              }}
              variant="outline"
              className="w-full"
            >
              <Upload className="w-4 h-4 me-2" />
              {isRTL ? 'رفع صورة جديدة' : 'Upload New Image'}
            </Button>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QRScanner;
