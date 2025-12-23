import { useState, useRef } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Droplet } from 'lucide-react';
import { toast } from 'sonner';

const PDFWatermark = () => {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(50);
  const [rotation, setRotation] = useState(-45);
  const [color, setColor] = useState('#ff0000');
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 1, g: 0, b: 0 };
  };

  const addWatermark = async () => {
    if (!file || !watermarkText.trim()) {
      toast.error(isRTL ? 'يرجى إدخال نص العلامة المائية' : 'Please enter watermark text');
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb(color);

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        
        // Calculate center position
        const x = (width - textWidth) / 2;
        const y = height / 2;

        // Draw watermark with rotation
        page.drawText(watermarkText, {
          x: width / 2 - font.widthOfTextAtSize(watermarkText, fontSize) / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity: opacity / 100,
          rotate: degrees(rotation),
        });
      }

      const watermarkedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(watermarkedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace('.pdf', '_watermarked.pdf');
      link.click();
      URL.revokeObjectURL(url);

      toast.success(isRTL ? 'تم إضافة العلامة المائية!' : 'Watermark added!');
    } catch (error) {
      console.error('Watermark error:', error);
      toast.error(isRTL ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'إضافة علامة مائية على PDF' : 'Add Watermark to PDF'}
      description={isRTL ? 'أضف علامة مائية نصية على ملفات PDF' : 'Add text watermark to PDF files'}
      keywords="PDF watermark, add watermark, علامة مائية PDF, حماية PDF"
      article=""
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Settings */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'نص العلامة المائية' : 'Watermark Text'}
              </label>
              <Input
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder={isRTL ? 'سري - للاستخدام الداخلي' : 'CONFIDENTIAL'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'الشفافية' : 'Opacity'}: {opacity}%
              </label>
              <Slider
                value={[opacity]}
                onValueChange={([v]) => setOpacity(v)}
                min={5}
                max={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'حجم الخط' : 'Font Size'}: {fontSize}px
              </label>
              <Slider
                value={[fontSize]}
                onValueChange={([v]) => setFontSize(v)}
                min={20}
                max={150}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'زاوية الدوران' : 'Rotation'}: {rotation}°
              </label>
              <Slider
                value={[rotation]}
                onValueChange={([v]) => setRotation(v)}
                min={-90}
                max={90}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'اللون' : 'Color'}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="border border-border rounded-lg p-8 bg-white relative overflow-hidden">
              <div className="aspect-[3/4] flex items-center justify-center">
                <span
                  style={{
                    fontSize: `${fontSize / 3}px`,
                    color: color,
                    opacity: opacity / 100,
                    transform: `rotate(${rotation}deg)`,
                    fontWeight: 'bold',
                  }}
                >
                  {watermarkText}
                </span>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                {isRTL ? 'معاينة' : 'Preview'}
              </p>
            </div>
          </div>

          {/* Right: Upload */}
          <div className="space-y-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors h-[200px] flex flex-col items-center justify-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-foreground font-medium">
                {file ? file.name : (isRTL ? 'اختر ملف PDF' : 'Select PDF file')}
              </p>
            </div>

            <Button
              onClick={addWatermark}
              className="w-full btn-primary"
              disabled={!file || processing}
            >
              <Droplet className="w-4 h-4 me-2" />
              {processing
                ? (isRTL ? 'جاري المعالجة...' : 'Processing...')
                : (isRTL ? 'إضافة العلامة المائية وتحميل' : 'Add Watermark & Download')
              }
            </Button>

            {/* Common watermark texts */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'نصوص شائعة:' : 'Common texts:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'CONFIDENTIAL',
                  'DRAFT',
                  'SAMPLE',
                  'DO NOT COPY',
                  isRTL ? 'سري' : 'SECRET',
                  isRTL ? 'مسودة' : 'REVIEW',
                ].map((text) => (
                  <button
                    key={text}
                    onClick={() => setWatermarkText(text)}
                    className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PDFWatermark;
