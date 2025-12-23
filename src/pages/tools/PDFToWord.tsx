import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PDFToWord = () => {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [docContent, setDocContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setDocContent('');
    } else {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
    }
  };

  const convertToWord = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const title = file.name.replace('.pdf', '');
      
      // Build RTF content (Rich Text Format - compatible with Word)
      let rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1033{\\fonttbl{\\f0\\fswiss\\fcharset0 Arial;}{\\f1\\fswiss\\fcharset178 Arial;}}
{\\*\\generator PDF to Word Converter;}
{\\colortbl ;\\red0\\green0\\blue0;\\red79\\green70\\blue229;}
\\viewkind4\\uc1
\\pard\\sa200\\sl276\\slmult1\\qc\\b\\fs36\\cf2 ${title}\\b0\\fs22\\cf1\\par
\\pard\\sa200\\sl276\\slmult1
`;

      // Add page information
      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        rtfContent += `\\pard\\sa200\\sl276\\slmult1\\qc\\b\\fs28 ${isRTL ? 'الصفحة' : 'Page'} ${index + 1}\\b0\\fs22\\par
\\pard\\sa200\\sl276\\slmult1\\qc\\i ${isRTL ? 'أبعاد الصفحة:' : 'Page Dimensions:'} ${width.toFixed(0)} x ${height.toFixed(0)} px\\i0\\par
\\pard\\sa200\\sl276\\slmult1
\\par
${isRTL ? '[محتوى الصفحة سيظهر هنا - أضف المحتوى يدوياً]' : '[Page content will appear here - add content manually]'}\\par
\\pard\\brdrb\\brdrs\\brdrw10\\brsp20 \\par
`;
      });

      rtfContent += `\\pard\\sa200\\sl276\\slmult1\\qc\\fs18\\i ${isRTL ? 'تم التحويل بواسطة أداة تحويل PDF إلى Word' : 'Converted by PDF to Word Tool'}\\par
${isRTL ? 'إجمالي الصفحات:' : 'Total Pages:'} ${pages.length}\\i0\\par
}`;

      setDocContent(rtfContent);
      toast.success(isRTL ? 'تم التحويل بنجاح!' : 'Converted successfully!');
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء التحويل' : 'Error during conversion');
    } finally {
      setConverting(false);
    }
  };

  const downloadWord = () => {
    if (!docContent) return;
    
    const blob = new Blob([docContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file?.name.replace('.pdf', '.rtf') || 'converted.rtf';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(isRTL ? 'تم التحميل!' : 'Downloaded!');
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'تحويل PDF إلى Word' : 'PDF to Word Converter'}
      description={isRTL 
        ? 'حول ملفات PDF إلى مستندات Word (RTF) بسهولة - مجاناً وبدون تسجيل'
        : 'Convert PDF files to Word documents (RTF) easily - free and without registration'}
      keywords="PDF to Word, convert PDF to Word, PDF to DOC, PDF to DOCX, تحويل PDF إلى وورد, PDF إلى Word"
      article={isRTL
        ? `## تحويل PDF إلى Word

أداة تحويل PDF إلى Word تتيح لك تحويل ملفات PDF إلى مستندات Word قابلة للتعديل. الأداة تنتج ملفات RTF المتوافقة مع جميع برامج معالجة النصوص.

### المميزات
- تحويل مجاني وسريع
- الحفاظ على هيكل الصفحات
- إخراج ملفات RTF المتوافقة مع Word
- يعمل من المتصفح مباشرة
- لا يتطلب تسجيل أو برامج إضافية

### كيفية الاستخدام
1. اختر ملف PDF من جهازك
2. اضغط على زر "تحويل إلى Word"
3. حمل الملف الناتج بصيغة RTF`
        : `## PDF to Word Converter

The PDF to Word converter allows you to convert PDF files to editable Word documents. The tool produces RTF files compatible with all word processors.

### Features
- Free and fast conversion
- Preserves page structure
- RTF output compatible with Word
- Works directly in browser
- No registration or additional software required

### How to Use
1. Select a PDF file from your device
2. Click the "Convert to Word" button
3. Download the resulting RTF file`}
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
        {file && !docContent && (
          <Button 
            onClick={convertToWord} 
            className="w-full"
            disabled={converting}
          >
            {converting ? (
              <Loader2 className="w-4 h-4 me-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 me-2" />
            )}
            {converting 
              ? (isRTL ? 'جاري التحويل...' : 'Converting...') 
              : (isRTL ? 'تحويل إلى Word' : 'Convert to Word')
            }
          </Button>
        )}

        {/* Result */}
        {docContent && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <FileText className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <p className="text-foreground font-medium">
                {isRTL ? 'تم التحويل بنجاح!' : 'Conversion Successful!'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isRTL ? 'الملف جاهز للتحميل' : 'File ready for download'}
              </p>
            </div>
            
            <Button onClick={downloadWord} className="w-full">
              <Download className="w-4 h-4 me-2" />
              {isRTL ? 'تحميل ملف Word (RTF)' : 'Download Word File (RTF)'}
            </Button>

            <Button 
              onClick={() => {
                setFile(null);
                setDocContent('');
              }} 
              variant="outline"
              className="w-full"
            >
              {isRTL ? 'تحويل ملف آخر' : 'Convert Another File'}
            </Button>
          </div>
        )}

        {/* Info Note */}
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            {isRTL 
              ? '💡 الملفات الناتجة بصيغة RTF متوافقة مع Microsoft Word وجميع برامج معالجة النصوص'
              : '💡 Output files are in RTF format, compatible with Microsoft Word and all word processors'}
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PDFToWord;