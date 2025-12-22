import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Download, Scissors, FileText } from 'lucide-react';
import { toast } from 'sonner';

const PDFSplit = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState<'range' | 'each'>('range');
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [splitting, setSplitting] = useState(false);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPageCount();
      
      setPdfData(arrayBuffer);
      setFileName(file.name);
      setPageCount(pages);
      setStartPage(1);
      setEndPage(pages);
      
      toast.success(isRTL ? 'تم تحميل الملف!' : 'File loaded!');
    } catch (error) {
      toast.error(isRTL ? 'فشل في قراءة الملف' : 'Failed to read file');
    }
  }, [isRTL]);

  const splitPDF = async () => {
    if (!pdfData) return;

    setSplitting(true);

    try {
      const originalPdf = await PDFDocument.load(pdfData);

      if (splitMode === 'range') {
        // Extract specific range
        const newPdf = await PDFDocument.create();
        const indices = [];
        
        for (let i = startPage - 1; i < endPage; i++) {
          indices.push(i);
        }
        
        const pages = await newPdf.copyPages(originalPdf, indices);
        pages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        downloadPDF(pdfBytes, `${fileName.replace('.pdf', '')}_pages_${startPage}-${endPage}.pdf`);
      } else {
        // Split each page
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(originalPdf, [i]);
          newPdf.addPage(page);
          
          const pdfBytes = await newPdf.save();
          downloadPDF(pdfBytes, `${fileName.replace('.pdf', '')}_page_${i + 1}.pdf`);
          
          // Small delay between downloads
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      
      toast.success(isRTL ? 'تم التقسيم بنجاح!' : 'Split successful!');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء التقسيم' : 'Error during split');
    } finally {
      setSplitting(false);
    }
  };

  const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
    const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout
      title={t.tools.pdfSplit.name}
      description={t.tools.pdfSplit.description}
      article={t.tools.pdfSplit.article}
      keywords="PDF split, extract pages, تقسيم PDF"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          {pdfData ? (
            <div className="space-y-2">
              <FileText className="w-12 h-12 text-primary mx-auto" />
              <p className="font-medium text-foreground">{fileName}</p>
              <p className="text-sm text-muted-foreground">
                {pageCount} {isRTL ? 'صفحة' : 'pages'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Scissors className="w-7 h-7 text-primary" />
              </div>
              <p className="text-foreground font-medium">
                {isRTL ? 'اضغط لاختيار ملف PDF' : 'Click to select PDF file'}
              </p>
            </div>
          )}
        </div>

        {pdfData && (
          <>
            {/* Split Mode */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {isRTL ? 'طريقة التقسيم' : 'Split Mode'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSplitMode('range')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    splitMode === 'range'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <p className="font-medium">{isRTL ? 'نطاق محدد' : 'Page Range'}</p>
                  <p className="text-xs mt-1">{isRTL ? 'استخراج صفحات معينة' : 'Extract specific pages'}</p>
                </button>
                <button
                  onClick={() => setSplitMode('each')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    splitMode === 'each'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <p className="font-medium">{isRTL ? 'كل صفحة' : 'Each Page'}</p>
                  <p className="text-xs mt-1">{isRTL ? 'ملف لكل صفحة' : 'One file per page'}</p>
                </button>
              </div>
            </div>

            {/* Page Range */}
            {splitMode === 'range' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {isRTL ? 'من صفحة' : 'From Page'}
                  </label>
                  <Input
                    type="number"
                    value={startPage}
                    onChange={(e) => setStartPage(Math.max(1, Math.min(pageCount, Number(e.target.value))))}
                    min={1}
                    max={pageCount}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {isRTL ? 'إلى صفحة' : 'To Page'}
                  </label>
                  <Input
                    type="number"
                    value={endPage}
                    onChange={(e) => setEndPage(Math.max(startPage, Math.min(pageCount, Number(e.target.value))))}
                    min={startPage}
                    max={pageCount}
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {/* Split Button */}
            <Button
              onClick={splitPDF}
              disabled={splitting}
              className="w-full btn-primary"
            >
              {splitting ? (
                <span className="animate-pulse">{isRTL ? 'جاري التقسيم...' : 'Splitting...'}</span>
              ) : (
                <>
                  <Download className="w-4 h-4 me-2" />
                  {isRTL ? 'تقسيم وتحميل' : 'Split & Download'}
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PDFSplit;
