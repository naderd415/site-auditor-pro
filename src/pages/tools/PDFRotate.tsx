import { useState, useRef } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Download, RotateCw, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface PageRotation {
  pageNum: number;
  rotation: number;
}

const PDFRotate = () => {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotations, setRotations] = useState<PageRotation[]>([]);
  const [processing, setProcessing] = useState(false);
  const [globalRotation, setGlobalRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        setPageCount(pages.length);
        setRotations(pages.map((_, i) => ({ pageNum: i + 1, rotation: 0 })));
        setGlobalRotation(0);
      } catch (error) {
        toast.error(isRTL ? 'خطأ في قراءة الملف' : 'Error reading file');
      }
    } else {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
    }
  };

  const rotateAll = (direction: 'cw' | 'ccw') => {
    const amount = direction === 'cw' ? 90 : -90;
    setGlobalRotation((prev) => (prev + amount + 360) % 360);
    setRotations((prev) =>
      prev.map((r) => ({
        ...r,
        rotation: (r.rotation + amount + 360) % 360,
      }))
    );
  };

  const rotatePage = (pageNum: number, direction: 'cw' | 'ccw') => {
    const amount = direction === 'cw' ? 90 : -90;
    setRotations((prev) =>
      prev.map((r) =>
        r.pageNum === pageNum
          ? { ...r, rotation: (r.rotation + amount + 360) % 360 }
          : r
      )
    );
  };

  const downloadRotatedPDF = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      // Apply rotations
      rotations.forEach(({ pageNum, rotation }) => {
        if (rotation !== 0) {
          const page = pages[pageNum - 1];
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees(currentRotation + rotation));
        }
      });

      const rotatedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(rotatedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace('.pdf', '_rotated.pdf');
      link.click();
      URL.revokeObjectURL(url);

      toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
    } catch (error) {
      console.error('Rotation error:', error);
      toast.error(isRTL ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'تدوير صفحات PDF' : 'Rotate PDF Pages'}
      description={isRTL ? 'دور صفحات PDF حسب حاجتك' : 'Rotate PDF pages as needed'}
      keywords="rotate PDF, PDF rotation, تدوير PDF, تعديل PDF"
      article=""
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Upload Area */}
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
          {pageCount > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {pageCount} {isRTL ? 'صفحات' : 'pages'}
            </p>
          )}
        </div>

        {/* Global Rotation Controls */}
        {file && pageCount > 0 && (
          <>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => rotateAll('ccw')}
              >
                <RotateCcw className="w-5 h-5 me-2" />
                {isRTL ? 'تدوير الكل يسار' : 'Rotate All Left'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => rotateAll('cw')}
              >
                <RotateCw className="w-5 h-5 me-2" />
                {isRTL ? 'تدوير الكل يمين' : 'Rotate All Right'}
              </Button>
            </div>

            {/* Individual Page Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {rotations.map(({ pageNum, rotation }) => (
                <div
                  key={pageNum}
                  className="border border-border rounded-lg p-3 bg-muted/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {isRTL ? 'صفحة' : 'Page'} {pageNum}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {rotation}°
                    </span>
                  </div>
                  <div 
                    className="aspect-[3/4] bg-white border rounded flex items-center justify-center mb-2 transition-transform"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <span className="text-2xl font-bold text-muted-foreground">
                      {pageNum}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => rotatePage(pageNum, 'ccw')}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => rotatePage(pageNum, 'cw')}
                    >
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <Button
              onClick={downloadRotatedPDF}
              className="w-full btn-primary"
              disabled={processing}
            >
              <Download className="w-4 h-4 me-2" />
              {processing
                ? (isRTL ? 'جاري المعالجة...' : 'Processing...')
                : (isRTL ? 'تحميل PDF المُدار' : 'Download Rotated PDF')
              }
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PDFRotate;
