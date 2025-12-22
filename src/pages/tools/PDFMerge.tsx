import { useState, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Download, FilePlus, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

interface PDFFile {
  id: string;
  name: string;
  data: ArrayBuffer;
  pageCount: number;
}

const PDFMerge = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [merging, setMerging] = useState(false);

  const handleFilesSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: PDFFile[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (file.type !== 'application/pdf') {
        toast.error(isRTL ? 'يرجى اختيار ملفات PDF فقط' : 'Please select PDF files only');
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          data: arrayBuffer,
          pageCount: pdfDoc.getPageCount(),
        });
      } catch (error) {
        toast.error(isRTL ? `فشل في قراءة ${file.name}` : `Failed to read ${file.name}`);
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [isRTL]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= files.length) return;
    
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error(isRTL ? 'يرجى إضافة ملفين على الأقل' : 'Please add at least 2 files');
      return;
    }

    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const pdf = await PDFDocument.load(file.data);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      
      URL.revokeObjectURL(url);
      toast.success(isRTL ? 'تم الدمج بنجاح!' : 'Merge successful!');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء الدمج' : 'Error during merge');
    } finally {
      setMerging(false);
    }
  };

  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);

  return (
    <ToolPageLayout
      title={t.tools.pdfMerge.name}
      description={t.tools.pdfMerge.description}
      article={t.tools.pdfMerge.article}
      keywords="PDF merge, combine PDF, join PDF, دمج PDF"
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
            multiple
            onChange={handleFilesSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <FilePlus className="w-7 h-7 text-primary" />
            </div>
            <p className="text-foreground font-medium">
              {isRTL ? 'اضغط لإضافة ملفات PDF' : 'Click to add PDF files'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'يمكنك اختيار ملفات متعددة' : 'You can select multiple files'}
            </p>
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">
                {isRTL ? 'الملفات المحددة' : 'Selected Files'} ({files.length})
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRTL ? `${totalPages} صفحة` : `${totalPages} pages`}
              </p>
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      ▼
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.pageCount} {isRTL ? 'صفحة' : 'pages'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merge Button */}
        {files.length >= 2 && (
          <Button
            onClick={mergePDFs}
            disabled={merging}
            className="w-full btn-primary"
          >
            {merging ? (
              <span className="animate-pulse">{isRTL ? 'جاري الدمج...' : 'Merging...'}</span>
            ) : (
              <>
                <Download className="w-4 h-4 me-2" />
                {isRTL ? 'دمج وتحميل' : 'Merge & Download'}
              </>
            )}
          </Button>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PDFMerge;
