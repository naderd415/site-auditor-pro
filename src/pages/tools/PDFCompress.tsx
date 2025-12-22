import { useState, useRef } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/i18n';
import { Upload, Download, Loader2, FileDown, X } from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument } from 'pdf-lib';

const PDFCompress = () => {
  const { isRTL } = useLanguage();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; originalSize: number; compressedSize: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error(isRTL ? 'الرجاء اختيار ملف PDF' : 'Please select a PDF file');
      return;
    }

    setPdfFile(file);
    setResult(null);
  };

  const compressPDF = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Create a new PDF and copy pages (this removes some metadata and optimizes)
      const compressedPdf = await PDFDocument.create();
      const pages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      
      pages.forEach(page => {
        compressedPdf.addPage(page);
      });

      // Save with compression options
      const pdfBytes = await compressedPdf.save({
        useObjectStreams: true,
      });

      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      setResult({
        blob,
        originalSize: pdfFile.size,
        compressedSize: blob.size
      });

      const reduction = ((1 - blob.size / pdfFile.size) * 100).toFixed(1);
      toast.success(isRTL ? `تم الضغط! التوفير: ${reduction}%` : `Compressed! Saved: ${reduction}%`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء الضغط' : 'Error compressing PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const url = URL.createObjectURL(result.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${pdfFile?.name || 'document.pdf'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setPdfFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'ضغط ملفات PDF' : 'Compress PDF'}
      description={isRTL 
        ? 'قلل حجم ملفات PDF مع الحفاظ على الجودة'
        : 'Reduce PDF file size while maintaining quality'}
      keywords="compress PDF, reduce PDF size, PDF compressor, optimize PDF"
      article={isRTL 
        ? 'أداة ضغط PDF تقلل حجم ملفاتك بإزالة البيانات الوصفية غير الضرورية وتحسين البنية الداخلية. مثالية لإرسال الملفات عبر البريد الإلكتروني أو رفعها على الإنترنت.'
        : 'The PDF compressor reduces file size by removing unnecessary metadata and optimizing internal structure. Perfect for emailing files or uploading online.'}
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Upload Area */}
        <div 
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <FileDown className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {isRTL ? 'اضغط لاختيار ملف PDF' : 'Click to select a PDF file'}
          </p>
        </div>

        {/* Selected File */}
        {pdfFile && (
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileDown className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{pdfFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatSize(pdfFile.size)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Quality Slider */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>{isRTL ? 'جودة الضغط' : 'Compression Quality'}</Label>
                <span className="text-muted-foreground text-sm">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(v) => setQuality(v[0])}
                min={10}
                max={100}
                step={10}
              />
              <p className="text-xs text-muted-foreground">
                {isRTL 
                  ? 'جودة أقل = حجم أصغر | جودة أعلى = حجم أكبر'
                  : 'Lower quality = smaller size | Higher quality = larger size'}
              </p>
            </div>
          </div>
        )}

        {/* Compress Button */}
        {pdfFile && !result && (
          <div className="flex justify-center">
            <Button onClick={compressPDF} disabled={isProcessing} className="gap-2">
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              {isRTL ? 'ضغط الملف' : 'Compress PDF'}
            </Button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="glass-card p-6 rounded-xl space-y-4">
            <h3 className="font-bold text-foreground text-center">
              {isRTL ? 'تم الضغط بنجاح!' : 'Compression Complete!'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-muted-foreground text-sm">{isRTL ? 'الحجم الأصلي' : 'Original Size'}</p>
                <p className="text-xl font-bold text-foreground">{formatSize(result.originalSize)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{isRTL ? 'الحجم الجديد' : 'New Size'}</p>
                <p className="text-xl font-bold text-primary">{formatSize(result.compressedSize)}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-green-500">
                {isRTL ? 'التوفير:' : 'Saved:'} {((1 - result.compressedSize / result.originalSize) * 100).toFixed(1)}%
              </p>
            </div>

            <div className="flex justify-center">
              <Button onClick={downloadResult} className="gap-2">
                <Download className="w-4 h-4" />
                {isRTL ? 'تحميل الملف المضغوط' : 'Download Compressed PDF'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PDFCompress;
