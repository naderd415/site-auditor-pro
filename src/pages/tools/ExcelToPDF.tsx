import { useState, useRef } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { FileDown, X, Table } from 'lucide-react';
import { toast } from 'sonner';
import JSZip from 'jszip';
import { PDFDocument, rgb } from 'pdf-lib';

const ExcelToPDF = () => {
  const { t, isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      toast.error(isRTL ? 'يرجى اختيار ملف Excel' : 'Please select an Excel file');
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
      
      // Extract sheet data
      const sheetXml = await zip.file('xl/worksheets/sheet1.xml')?.async('string');
      const sharedStringsXml = await zip.file('xl/sharedStrings.xml')?.async('string');
      
      if (!sheetXml) {
        toast.error(isRTL ? 'ملف Excel غير صالح' : 'Invalid Excel file');
        return;
      }

      // Parse shared strings
      const sharedStrings: string[] = [];
      if (sharedStringsXml) {
        const siMatches = sharedStringsXml.match(/<si>[\s\S]*?<\/si>/g) || [];
        for (const si of siMatches) {
          const tMatch = si.match(/<t[^>]*>([^<]*)<\/t>/);
          sharedStrings.push(tMatch ? tMatch[1] : '');
        }
      }

      // Parse rows and cells
      const rows: string[][] = [];
      const rowMatches = sheetXml.match(/<row[^>]*>[\s\S]*?<\/row>/g) || [];
      
      for (const rowXml of rowMatches) {
        const cells: string[] = [];
        const cellMatches = rowXml.match(/<c[^>]*>[\s\S]*?<\/c>/g) || [];
        
        for (const cellXml of cellMatches) {
          const isSharedString = cellXml.includes('t="s"');
          const vMatch = cellXml.match(/<v>([^<]*)<\/v>/);
          
          if (vMatch) {
            if (isSharedString) {
              const idx = parseInt(vMatch[1], 10);
              cells.push(sharedStrings[idx] || '');
            } else {
              cells.push(vMatch[1]);
            }
          } else {
            cells.push('');
          }
        }
        
        if (cells.length > 0) {
          rows.push(cells);
        }
      }

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont('Helvetica');
      const boldFont = await pdfDoc.embedFont('Helvetica-Bold');
      
      let page = pdfDoc.addPage([792, 612]); // Landscape
      const margin = 40;
      let yPosition = 572;
      const cellPadding = 8;
      const cellHeight = 25;
      
      // Calculate column widths
      const maxCols = Math.max(...rows.map(r => r.length));
      const colWidth = (792 - margin * 2) / Math.min(maxCols, 8);

      for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
        const row = rows[rowIdx];
        
        // Check if need new page
        if (yPosition < margin + cellHeight) {
          page = pdfDoc.addPage([792, 612]);
          yPosition = 572;
        }

        // Draw cells
        for (let colIdx = 0; colIdx < Math.min(row.length, 8); colIdx++) {
          const x = margin + colIdx * colWidth;
          const cellText = row[colIdx].substring(0, 20);
          
          // Draw cell border
          page.drawRectangle({
            x,
            y: yPosition - cellHeight,
            width: colWidth,
            height: cellHeight,
            borderColor: rgb(0.7, 0.7, 0.7),
            borderWidth: 0.5,
            color: rowIdx === 0 ? rgb(0.95, 0.95, 0.95) : undefined,
          });
          
          // Draw text
          page.drawText(cellText, {
            x: x + cellPadding,
            y: yPosition - cellHeight + cellPadding,
            size: 10,
            font: rowIdx === 0 ? boldFont : font,
            color: rgb(0.1, 0.1, 0.1),
          });
        }
        
        yPosition -= cellHeight;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.(xlsx|xls)$/i, '.pdf');
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
      title={isRTL ? 'تحويل Excel إلى PDF' : 'Excel to PDF'}
      description={isRTL 
        ? 'حوّل جداول Excel إلى ملفات PDF عالية الجودة مجاناً • مدعوم بالذكاء الاصطناعي'
        : 'Convert Excel spreadsheets to high-quality PDF files for free • AI-Powered'}
      article={isRTL
        ? 'أداة تحويل Excel إلى PDF المجانية تتيح لك تحويل جداول البيانات بسهولة. حافظ على الجداول والبيانات. مثالية لمشاركة التقارير والبيانات بتنسيق عالمي.'
        : 'Our free Excel to PDF converter allows you to easily convert spreadsheets. Preserve tables and data. Perfect for sharing reports and data in a universal format.'}
      keywords="excel to pdf, xlsx to pdf, spreadsheet to pdf, convert excel, تحويل اكسل"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Table className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium text-foreground mb-2">
            {isRTL ? 'انقر لاختيار ملف Excel' : 'Click to select Excel file'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'يدعم XLSX و XLS' : 'Supports XLSX and XLS'}
          </p>
        </div>

        {/* Selected File */}
        {file && (
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Table className="w-5 h-5 text-primary" />
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

export default ExcelToPDF;
