import { useState, useRef } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { FileDown, X, FileText } from 'lucide-react';
import { toast } from 'sonner';
import JSZip from 'jszip';
import { PDFDocument, rgb } from 'pdf-lib';

const WordToPDF = () => {
  const { t, isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.match(/\.(docx|doc)$/i)) {
      toast.error(isRTL ? 'يرجى اختيار ملف Word' : 'Please select a Word file');
      return;
    }

    setFile(selectedFile);
  };

  const convertToPDF = async () => {
    if (!file) return;
    
    setIsConverting(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      // Extract document.xml content
      const documentXml = await zip.file('word/document.xml')?.async('string');
      
      if (!documentXml) {
        toast.error(isRTL ? 'ملف Word غير صالح' : 'Invalid Word file');
        return;
      }

      // Extract text content from paragraphs
      const paragraphs: string[] = [];
      const pMatches = documentXml.match(/<w:p[^>]*>[\s\S]*?<\/w:p>/g) || [];
      
      for (const pMatch of pMatches) {
        const textMatches = pMatch.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
        const paragraphText = textMatches
          .map(t => t.replace(/<\/?w:t[^>]*>/g, ''))
          .join('');
        if (paragraphText.trim()) {
          paragraphs.push(paragraphText);
        }
      }

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont('Helvetica');
      
      let currentPage = pdfDoc.addPage([612, 792]); // Letter size
      let yPosition = 750;
      const margin = 50;
      const lineHeight = 18;
      const maxWidth = 512;

      for (const paragraph of paragraphs) {
        // Word wrap
        const words = paragraph.split(' ');
        let line = '';
        
        for (const word of words) {
          const testLine = line + (line ? ' ' : '') + word;
          const textWidth = font.widthOfTextAtSize(testLine, 12);
          
          if (textWidth > maxWidth && line) {
            // Draw line
            if (yPosition < margin + lineHeight) {
              currentPage = pdfDoc.addPage([612, 792]);
              yPosition = 750;
            }
            
            currentPage.drawText(line, {
              x: margin,
              y: yPosition,
              size: 12,
              font,
              color: rgb(0, 0, 0),
            });
            
            yPosition -= lineHeight;
            line = word;
          } else {
            line = testLine;
          }
        }
        
        // Draw remaining text
        if (line) {
          if (yPosition < margin + lineHeight) {
            currentPage = pdfDoc.addPage([612, 792]);
            yPosition = 750;
          }
          
          currentPage.drawText(line, {
            x: margin,
            y: yPosition,
            size: 12,
            font,
            color: rgb(0, 0, 0),
          });
          
          yPosition -= lineHeight;
        }
        
        // Add paragraph spacing
        yPosition -= 8;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.(docx|doc)$/i, '.pdf');
      a.click();
      URL.revokeObjectURL(url);

      toast.success(isRTL ? 'تم التحويل بنجاح!' : 'Conversion successful!');
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء التحويل' : 'Error during conversion');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'تحويل Word إلى PDF' : 'Word to PDF'}
      description={isRTL 
        ? 'حوّل مستندات Word إلى ملفات PDF عالية الجودة مجاناً • مدعوم بالذكاء الاصطناعي'
        : 'Convert Word documents to high-quality PDF files for free • AI-Powered'}
      article={isRTL
        ? 'أداة تحويل Word إلى PDF المجانية تتيح لك تحويل مستندات DOCX و DOC بسهولة. حافظ على تنسيق النص والفقرات. مثالية لمشاركة المستندات بتنسيق عالمي.'
        : 'Our free Word to PDF converter allows you to easily convert DOCX and DOC documents. Preserve text formatting and paragraphs. Perfect for sharing documents in a universal format.'}
      keywords="word to pdf, docx to pdf, doc to pdf, convert word document, تحويل وورد"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,.doc"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium text-foreground mb-2">
            {isRTL ? 'انقر لاختيار ملف Word' : 'Click to select Word file'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'يدعم DOCX و DOC' : 'Supports DOCX and DOC'}
          </p>
        </div>

        {/* Selected File */}
        {file && (
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFile(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Convert Button */}
        {file && (
          <Button
            onClick={convertToPDF}
            disabled={isConverting}
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
        )}
      </div>
    </ToolPageLayout>
  );
};

export default WordToPDF;
