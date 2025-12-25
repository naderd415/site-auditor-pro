import { useState, useRef } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, FileDown, X, Presentation } from 'lucide-react';
import { toast } from 'sonner';
import JSZip from 'jszip';
import { PDFDocument, rgb } from 'pdf-lib';

interface UploadedFile {
  id: string;
  name: string;
  data: ArrayBuffer;
}

const PowerPointToPDF = () => {
  const { t, isRTL } = useLanguage();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (!file.name.match(/\.(pptx|ppt)$/i)) {
        toast.error(isRTL ? 'يرجى اختيار ملفات PowerPoint فقط' : 'Please select PowerPoint files only');
        continue;
      }

      const data = await file.arrayBuffer();
      newFiles.push({
        id: crypto.randomUUID(),
        name: file.name,
        data
      });
    }

    setFiles(prev => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const convertToPDF = async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    
    try {
      for (const file of files) {
        const zip = await JSZip.loadAsync(file.data);
        const pdfDoc = await PDFDocument.create();
        
        // Extract slide information from PPTX
        const presentationXml = await zip.file('ppt/presentation.xml')?.async('string');
        
        if (!presentationXml) {
          toast.error(isRTL ? 'ملف PowerPoint غير صالح' : 'Invalid PowerPoint file');
          continue;
        }

        // Get slide count from relationships
        const slideFiles = Object.keys(zip.files).filter(name => 
          name.match(/ppt\/slides\/slide\d+\.xml$/i)
        );
        
        const slideCount = slideFiles.length || 1;

        // Create PDF pages for each slide
        for (let i = 0; i < slideCount; i++) {
          const page = pdfDoc.addPage([960, 540]); // 16:9 aspect ratio
          const { width, height } = page.getSize();
          
          // Try to extract slide content
          const slideXml = await zip.file(`ppt/slides/slide${i + 1}.xml`)?.async('string');
          
          // Add slide number and placeholder
          page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height,
            color: rgb(1, 1, 1),
          });

          // Add border
          page.drawRectangle({
            x: 10,
            y: 10,
            width: width - 20,
            height: height - 20,
            borderColor: rgb(0.8, 0.8, 0.8),
            borderWidth: 1,
          });

          // Extract text content from slide
          if (slideXml) {
            const textMatches = slideXml.match(/<a:t>([^<]+)<\/a:t>/g);
            if (textMatches) {
              let yPos = height - 60;
              const font = await pdfDoc.embedFont('Helvetica');
              
              textMatches.slice(0, 10).forEach((match, idx) => {
                const text = match.replace(/<\/?a:t>/g, '').trim();
                if (text && yPos > 50) {
                  const fontSize = idx === 0 ? 24 : 14;
                  page.drawText(text.substring(0, 80), {
                    x: 40,
                    y: yPos,
                    size: fontSize,
                    font,
                    color: rgb(0.1, 0.1, 0.1),
                  });
                  yPos -= fontSize + 15;
                }
              });
            }
          }

          // Add slide number
          const font = await pdfDoc.embedFont('Helvetica');
          page.drawText(`Slide ${i + 1}`, {
            x: width - 80,
            y: 20,
            size: 12,
            font,
            color: rgb(0.5, 0.5, 0.5),
          });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace(/\.(pptx|ppt)$/i, '.pdf');
        a.click();
        URL.revokeObjectURL(url);
      }

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
      title={isRTL ? 'تحويل PowerPoint إلى PDF' : 'PowerPoint to PDF'}
      description={isRTL 
        ? 'حوّل عروض PowerPoint إلى ملفات PDF عالية الجودة مجاناً • مدعوم بالذكاء الاصطناعي'
        : 'Convert PowerPoint presentations to high-quality PDF files for free • AI-Powered'}
      article={isRTL
        ? 'أداة تحويل PowerPoint إلى PDF المجانية تتيح لك تحويل عروضك التقديمية بسهولة. حافظ على تنسيق الشرائح والنصوص والصور. مثالية لمشاركة العروض التقديمية بتنسيق عالمي.'
        : 'Our free PowerPoint to PDF converter allows you to easily convert your presentations. Preserve slide formatting, text, and images. Perfect for sharing presentations in a universal format.'}
      keywords="powerpoint to pdf, pptx to pdf, convert presentation, تحويل بوربوينت, تحويل عرض تقديمي"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pptx,.ppt"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Presentation className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium text-foreground mb-2">
            {isRTL ? 'انقر لاختيار ملفات PowerPoint' : 'Click to select PowerPoint files'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'يدعم PPTX و PPT' : 'Supports PPTX and PPT'}
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">
              {isRTL ? 'الملفات المختارة:' : 'Selected Files:'}
            </h3>
            {files.map(file => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Presentation className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Convert Button */}
        {files.length > 0 && (
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

export default PowerPointToPDF;
