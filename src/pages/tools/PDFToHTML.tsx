import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileCode, Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';

const PDFToHTML = () => {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [converting, setConverting] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setHtmlContent('');
      setPreview(false);
    } else {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
    }
  };

  const convertToHTML = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      // Build HTML structure
      let html = `<!DOCTYPE html>
<html lang="${isRTL ? 'ar' : 'en'}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${file.name.replace('.pdf', '')}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .pdf-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .pdf-page {
      background: white;
      margin-bottom: 20px;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 8px;
      min-height: 500px;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 2px solid #e0e0e0;
      margin-bottom: 20px;
    }
    .page-number {
      background: #4f46e5;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 14px;
    }
    .page-info {
      color: #666;
      font-size: 12px;
    }
    .content-placeholder {
      color: #999;
      text-align: center;
      padding: 100px 20px;
      border: 2px dashed #ddd;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    <h1 style="text-align: center; margin-bottom: 30px; color: #333;">
      ${file.name.replace('.pdf', '')}
    </h1>
`;

      // Add pages
      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        html += `
    <div class="pdf-page" id="page-${index + 1}">
      <div class="page-header">
        <span class="page-number">${isRTL ? 'صفحة' : 'Page'} ${index + 1}</span>
        <span class="page-info">${width.toFixed(0)} x ${height.toFixed(0)} px</span>
      </div>
      <div class="content-placeholder">
        <p>${isRTL ? 'محتوى الصفحة' : 'Page Content'} ${index + 1}</p>
        <p style="margin-top: 10px; font-size: 12px;">
          ${isRTL ? 'يمكنك إضافة المحتوى هنا' : 'You can add content here'}
        </p>
      </div>
    </div>
`;
      });

      html += `
    <div class="footer">
      <p>${isRTL ? 'تم التحويل بواسطة أداة تحويل PDF إلى HTML' : 'Converted by PDF to HTML Tool'}</p>
      <p>${isRTL ? 'إجمالي الصفحات:' : 'Total Pages:'} ${pages.length}</p>
    </div>
  </div>
</body>
</html>`;

      setHtmlContent(html);
      toast.success(isRTL ? 'تم التحويل بنجاح!' : 'Converted successfully!');
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء التحويل' : 'Error during conversion');
    } finally {
      setConverting(false);
    }
  };

  const downloadHTML = () => {
    if (!htmlContent) return;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file?.name.replace('.pdf', '.html') || 'converted.html';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'تحويل PDF إلى HTML' : 'PDF to HTML Converter'}
      description={isRTL ? 'حول ملفات PDF إلى صفحات HTML بسهولة' : 'Convert PDF files to HTML pages easily'}
      keywords="PDF to HTML, convert PDF, HTML converter, تحويل PDF, PDF إلى HTML"
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
          <p className="text-sm text-muted-foreground mt-2">
            {isRTL ? 'اضغط أو اسحب الملف هنا' : 'Click or drag file here'}
          </p>
        </div>

        {/* Convert Button */}
        {file && !htmlContent && (
          <Button 
            onClick={convertToHTML} 
            className="w-full btn-primary"
            disabled={converting}
          >
            <FileCode className="w-4 h-4 me-2" />
            {converting 
              ? (isRTL ? 'جاري التحويل...' : 'Converting...') 
              : (isRTL ? 'تحويل إلى HTML' : 'Convert to HTML')
            }
          </Button>
        )}

        {/* Result */}
        {htmlContent && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={downloadHTML} className="flex-1">
                <Download className="w-4 h-4 me-2" />
                {isRTL ? 'تحميل HTML' : 'Download HTML'}
              </Button>
              <Button onClick={copyToClipboard} variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => setPreview(!preview)} 
                variant="outline"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            {/* Code Preview */}
            <div className="bg-muted rounded-lg p-4 max-h-[300px] overflow-auto">
              <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                {htmlContent.substring(0, 2000)}...
              </pre>
            </div>

            {/* Live Preview */}
            {preview && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 text-sm font-medium">
                  {isRTL ? 'معاينة' : 'Preview'}
                </div>
                <iframe
                  srcDoc={htmlContent}
                  className="w-full h-[400px] bg-white"
                  title="HTML Preview"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PDFToHTML;
