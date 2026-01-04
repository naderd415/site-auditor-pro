import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileDown, Code, Eye } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

// Configure DOMPurify with safe defaults
const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'b', 'i', 'u', 
                   'ul', 'ol', 'li', 'a', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 
                   'div', 'span', 'br', 'hr', 'img', 'blockquote', 'pre', 'code'],
    ALLOWED_ATTR: ['href', 'class', 'id', 'style', 'src', 'alt', 'width', 'height', 
                   'border', 'cellpadding', 'cellspacing', 'align', 'valign'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur'],
  });
};

const HTMLToPDF = () => {
  const { t, isRTL } = useLanguage();
  const [htmlContent, setHtmlContent] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const convertToPDF = async () => {
    if (!htmlContent.trim()) {
      toast.error(isRTL ? 'يرجى إدخال محتوى HTML' : 'Please enter HTML content');
      return;
    }
    
    setIsConverting(true);
    
    try {
      // Sanitize HTML before rendering
      const sanitizedHTML = sanitizeHTML(htmlContent);
      
      // Create a printable HTML document
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error(isRTL ? 'يرجى السماح بالنوافذ المنبثقة' : 'Please allow pop-ups');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>HTML to PDF</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${sanitizedHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);

      toast.success(isRTL ? 'استخدم نافذة الطباعة لحفظ كـ PDF' : 'Use print dialog to save as PDF');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء التحويل' : 'Error during conversion');
    } finally {
      setIsConverting(false);
    }
  };

  const sampleHTML = `<h1>Sample Document</h1>
<p>This is a <strong>sample HTML</strong> document that will be converted to PDF.</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
<p>You can add any HTML content here including:</p>
<table border="1" cellpadding="10">
  <tr>
    <th>Name</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Item 1</td>
    <td>100</td>
  </tr>
  <tr>
    <td>Item 2</td>
    <td>200</td>
  </tr>
</table>`;

  // Sanitize for preview display
  const sanitizedPreview = sanitizeHTML(htmlContent);

  return (
    <ToolPageLayout
      title={isRTL ? 'تحويل HTML إلى PDF' : 'HTML to PDF'}
      description={isRTL 
        ? 'حوّل كود HTML إلى ملفات PDF عالية الجودة مجاناً • مدعوم بالذكاء الاصطناعي'
        : 'Convert HTML code to high-quality PDF files for free • AI-Powered'}
      article={isRTL
        ? 'أداة تحويل HTML إلى PDF المجانية تتيح لك تحويل أي كود HTML إلى مستند PDF. مثالية للمطورين ومصممي الويب لإنشاء مستندات من صفحات الويب.'
        : 'Our free HTML to PDF converter allows you to convert any HTML code to a PDF document. Perfect for developers and web designers to create documents from web pages.'}
      keywords="html to pdf, convert html, webpage to pdf, تحويل html, صفحة ويب"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Sample Button */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setHtmlContent(sampleHTML)}
          >
            <Code className="w-4 h-4 me-2" />
            {isRTL ? 'مثال' : 'Sample'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4 me-2" />
            {isRTL ? 'معاينة' : 'Preview'}
          </Button>
        </div>

        {/* HTML Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'كود HTML' : 'HTML Code'}
          </label>
          <Textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder={isRTL ? 'الصق كود HTML هنا...' : 'Paste HTML code here...'}
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        {/* Preview - Now sanitized */}
        {showPreview && htmlContent && (
          <div className="border border-border rounded-lg p-4 bg-white">
            <div 
              className="prose prose-sm max-w-none text-black"
              dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
            />
          </div>
        )}

        {/* Convert Button */}
        <Button
          onClick={convertToPDF}
          disabled={isConverting || !htmlContent.trim()}
          className="w-full btn-primary"
        >
          {isConverting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isRTL ? 'جاري التحويل...' : 'Converting...'}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              {isRTL ? 'تحويل إلى PDF' : 'Convert to PDF'}
            </span>
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          {isRTL 
            ? 'سيتم فتح نافذة الطباعة - اختر "حفظ كـ PDF" كطابعة'
            : 'Print dialog will open - select "Save as PDF" as printer'}
        </p>
      </div>
    </ToolPageLayout>
  );
};

export default HTMLToPDF;
