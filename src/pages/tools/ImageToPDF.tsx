import { useState, useRef } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { Upload, Download, Loader2, FileText, X, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument } from 'pdf-lib';

const ImageToPDF = () => {
  const { isRTL } = useLanguage();
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: { file: File; preview: string }[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      
      const preview = URL.createObjectURL(file);
      newImages.push({ file, preview });
    }

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    setImages(prev => {
      const newImages = [...prev];
      const [removed] = newImages.splice(from, 1);
      newImages.splice(to, 0, removed);
      return newImages;
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const { file } of images) {
        const arrayBuffer = await file.arrayBuffer();
        
        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // Convert other formats to PNG using canvas
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise(resolve => img.onload = resolve);
          
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          
          const pngDataUrl = canvas.toDataURL('image/png');
          const pngBase64 = pngDataUrl.split(',')[1];
          const pngBytes = Uint8Array.from(atob(pngBase64), c => c.charCodeAt(0));
          image = await pdfDoc.embedPng(pngBytes);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'images-to-pdf.pdf';
      link.click();

      URL.revokeObjectURL(url);
      toast.success(isRTL ? 'تم إنشاء ملف PDF!' : 'PDF created successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء التحويل' : 'Error creating PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'تحويل الصور إلى PDF' : 'Image to PDF'}
      description={isRTL 
        ? 'حوّل صورك إلى ملف PDF واحد - رتّب الصور كما تشاء'
        : 'Convert your images to a single PDF file - arrange images as you like'}
      keywords="image to PDF, convert images, create PDF, JPG to PDF, PNG to PDF"
      article={isRTL 
        ? 'أداة تحويل الصور إلى PDF تتيح لك دمج عدة صور في ملف PDF واحد. يمكنك إعادة ترتيب الصور قبل التحويل. تدعم صيغ JPG و PNG و WebP.'
        : 'The image to PDF converter allows you to combine multiple images into a single PDF file. You can reorder images before converting. Supports JPG, PNG, and WebP formats.'}
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
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {isRTL ? 'اضغط لاختيار صور أو اسحبها هنا' : 'Click to select images or drag them here'}
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            PNG, JPG, WebP
          </p>
        </div>

        {/* Images List */}
        {images.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-foreground">
                {isRTL ? `${images.length} صورة` : `${images.length} Images`}
              </h3>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                {isRTL ? 'مسح الكل' : 'Clear All'}
              </Button>
            </div>

            <div className="space-y-2">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className="glass-card p-3 rounded-xl flex items-center gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => moveImage(index, index - 1)}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => moveImage(index, index + 1)}
                      disabled={index === images.length - 1}
                    >
                      ↓
                    </Button>
                  </div>
                  
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                    <img 
                      src={img.preview} 
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{img.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(img.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  
                  <span className="text-muted-foreground text-sm">
                    #{index + 1}
                  </span>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Convert Button */}
            <div className="flex justify-center">
              <Button onClick={convertToPDF} disabled={isProcessing} className="gap-2">
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                {isRTL ? 'تحويل إلى PDF' : 'Convert to PDF'}
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToPDF;
