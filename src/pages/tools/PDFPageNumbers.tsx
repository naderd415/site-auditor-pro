import { useState, useRef } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Download, Hash } from 'lucide-react';
import { toast } from 'sonner';

type Position = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';

const PDFPageNumbers = () => {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<Position>('bottom-center');
  const [startNumber, setStartNumber] = useState(1);
  const [format, setFormat] = useState('Page {n}');
  const [fontSize, setFontSize] = useState(12);
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

  const getPositionCoords = (width: number, height: number, textWidth: number): { x: number; y: number } => {
    const margin = 30;
    const positions: Record<Position, { x: number; y: number }> = {
      'bottom-center': { x: (width - textWidth) / 2, y: margin },
      'bottom-left': { x: margin, y: margin },
      'bottom-right': { x: width - textWidth - margin, y: margin },
      'top-center': { x: (width - textWidth) / 2, y: height - margin },
      'top-left': { x: margin, y: height - margin },
      'top-right': { x: width - textWidth - margin, y: height - margin },
    };
    return positions[position];
  };

  const addPageNumbers = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNum = startNumber + index;
        const text = format.replace('{n}', pageNum.toString()).replace('{total}', pages.length.toString());
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const { x, y } = getPositionCoords(width, height, textWidth);

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
      });

      const numberedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(numberedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace('.pdf', '_numbered.pdf');
      link.click();
      URL.revokeObjectURL(url);

      toast.success(isRTL ? 'تم إضافة أرقام الصفحات!' : 'Page numbers added!');
    } catch (error) {
      console.error('Page numbering error:', error);
      toast.error(isRTL ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  const positions: { value: Position; label: string; labelAr: string }[] = [
    { value: 'bottom-center', label: 'Bottom Center', labelAr: 'أسفل الوسط' },
    { value: 'bottom-left', label: 'Bottom Left', labelAr: 'أسفل اليسار' },
    { value: 'bottom-right', label: 'Bottom Right', labelAr: 'أسفل اليمين' },
    { value: 'top-center', label: 'Top Center', labelAr: 'أعلى الوسط' },
    { value: 'top-left', label: 'Top Left', labelAr: 'أعلى اليسار' },
    { value: 'top-right', label: 'Top Right', labelAr: 'أعلى اليمين' },
  ];

  const formats = [
    { value: 'Page {n}', label: 'Page 1' },
    { value: '{n}', label: '1' },
    { value: '{n} of {total}', label: '1 of 10' },
    { value: 'Page {n} of {total}', label: 'Page 1 of 10' },
    { value: '- {n} -', label: '- 1 -' },
  ];

  return (
    <ToolPageLayout
      title={isRTL ? 'إضافة أرقام الصفحات لـ PDF' : 'Add Page Numbers to PDF'}
      description={isRTL ? 'أضف أرقام الصفحات لملفات PDF' : 'Add page numbers to PDF files'}
      keywords="PDF page numbers, number PDF pages, ترقيم صفحات PDF"
      article=""
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Settings */}
          <div className="space-y-6">
            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                {isRTL ? 'موضع الرقم' : 'Number Position'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {positions.map((pos) => (
                  <button
                    key={pos.value}
                    onClick={() => setPosition(pos.value)}
                    className={`p-2 text-xs rounded-lg border transition-all ${
                      position === pos.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {isRTL ? pos.labelAr : pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                {isRTL ? 'صيغة الترقيم' : 'Number Format'}
              </label>
              <div className="flex flex-wrap gap-2">
                {formats.map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setFormat(fmt.value)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                      format === fmt.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
              <Input
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="{n} = page number, {total} = total pages"
                className="mt-2"
                dir="ltr"
              />
            </div>

            {/* Start Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'بدء الترقيم من' : 'Start numbering from'}
              </label>
              <Input
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                min={1}
                className="w-32"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'حجم الخط' : 'Font Size'}: {fontSize}px
              </label>
              <div className="flex gap-2">
                {[10, 12, 14, 16, 18].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                      fontSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="border border-border rounded-lg p-4 bg-white">
              <div className="aspect-[3/4] relative border border-dashed border-muted-foreground/30 rounded">
                {/* Preview page number */}
                <div
                  className={`absolute px-2 py-1 text-xs text-muted-foreground ${
                    position.includes('bottom') ? 'bottom-2' : 'top-2'
                  } ${
                    position.includes('left')
                      ? 'left-2'
                      : position.includes('right')
                      ? 'right-2'
                      : 'left-1/2 -translate-x-1/2'
                  }`}
                  style={{ fontSize: `${fontSize * 0.6}px` }}
                >
                  {format.replace('{n}', startNumber.toString()).replace('{total}', '10')}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                  <Hash className="w-12 h-12" />
                </div>
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
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium">
                {file ? file.name : (isRTL ? 'اختر ملف PDF' : 'Select PDF file')}
              </p>
            </div>

            <Button
              onClick={addPageNumbers}
              className="w-full btn-primary"
              disabled={!file || processing}
            >
              <Hash className="w-4 h-4 me-2" />
              {processing
                ? (isRTL ? 'جاري المعالجة...' : 'Processing...')
                : (isRTL ? 'إضافة الأرقام وتحميل' : 'Add Numbers & Download')
              }
            </Button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PDFPageNumbers;
