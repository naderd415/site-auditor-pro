import { useLanguage } from '@/lib/i18n';
import { ToolCard, Tool } from './ToolCard';
import {
  Image,
  FileImage,
  Minimize2,
  Crop,
  Eraser,
  Binary,
  FilePlus,
  Scissors,
  FileDown,
  ImageIcon,
  FileText,
  AlignLeft,
  TextCursor,
  GitCompare,
  Type,
  Link2,
  Palette,
  Pipette,
  SwatchBook,
  Blend,
  Contrast,
  Percent,
  Calendar,
  Activity,
  Ruler,
  Calculator,
  QrCode,
  ScanLine,
  RotateCw,
  PenTool,
  Droplets,
  Lock,
  Hash,
  FileCode,
  FileOutput,
  Gauge,
  Link,
  FileCode2,
  Globe2,
  Bot,
  Eye,
  BarChart3,
} from 'lucide-react';

// All tools data
export const allTools: Tool[] = [
  // Image Tools
  { id: 'image-converter', nameKey: 'tools.imageConverter.name', descriptionKey: 'tools.imageConverter.description', icon: Image, category: 'image', href: '/tools/image-converter', color: 'cyan' },
  { id: 'image-compressor', nameKey: 'tools.imageCompressor.name', descriptionKey: 'tools.imageCompressor.description', icon: FileImage, category: 'image', href: '/tools/image-compressor', color: 'cyan' },
  { id: 'image-resizer', nameKey: 'tools.imageResizer.name', descriptionKey: 'tools.imageResizer.description', icon: Minimize2, category: 'image', href: '/tools/image-resizer', color: 'cyan' },
  { id: 'image-cropper', nameKey: 'tools.imageCropper.name', descriptionKey: 'tools.imageCropper.description', icon: Crop, category: 'image', href: '/tools/image-cropper', color: 'cyan' },
  { id: 'background-remover', nameKey: 'tools.backgroundRemover.name', descriptionKey: 'tools.backgroundRemover.description', icon: Eraser, category: 'image', href: '/tools/background-remover', color: 'cyan' },
  { id: 'image-to-base64', nameKey: 'tools.imageToBase64.name', descriptionKey: 'tools.imageToBase64.description', icon: Binary, category: 'image', href: '/tools/image-to-base64', color: 'cyan' },
  
  // PDF Tools
  { id: 'pdf-merge', nameKey: 'tools.pdfMerge.name', descriptionKey: 'tools.pdfMerge.description', icon: FilePlus, category: 'pdf', href: '/tools/pdf-merge', color: 'pink' },
  { id: 'pdf-split', nameKey: 'tools.pdfSplit.name', descriptionKey: 'tools.pdfSplit.description', icon: Scissors, category: 'pdf', href: '/tools/pdf-split', color: 'pink' },
  { id: 'pdf-compress', nameKey: 'tools.pdfCompress.name', descriptionKey: 'tools.pdfCompress.description', icon: FileDown, category: 'pdf', href: '/tools/pdf-compress', color: 'pink' },
  { id: 'pdf-to-image', nameKey: 'tools.pdfToImage.name', descriptionKey: 'tools.pdfToImage.description', icon: ImageIcon, category: 'pdf', href: '/tools/pdf-to-image', color: 'pink' },
  { id: 'image-to-pdf', nameKey: 'tools.imageToPdf.name', descriptionKey: 'tools.imageToPdf.description', icon: FileText, category: 'pdf', href: '/tools/image-to-pdf', color: 'pink' },
  { id: 'pdf-rotate', nameKey: 'tools.pdfRotate.name', descriptionKey: 'tools.pdfRotate.description', icon: RotateCw, category: 'pdf', href: '/tools/pdf-rotate', color: 'pink' },
  { id: 'pdf-sign', nameKey: 'tools.pdfSign.name', descriptionKey: 'tools.pdfSign.description', icon: PenTool, category: 'pdf', href: '/tools/pdf-sign', color: 'pink' },
  { id: 'pdf-watermark', nameKey: 'tools.pdfWatermark.name', descriptionKey: 'tools.pdfWatermark.description', icon: Droplets, category: 'pdf', href: '/tools/pdf-watermark', color: 'pink' },
  { id: 'pdf-protect', nameKey: 'tools.pdfProtect.name', descriptionKey: 'tools.pdfProtect.description', icon: Lock, category: 'pdf', href: '/tools/pdf-protect', color: 'pink' },
  { id: 'pdf-page-numbers', nameKey: 'tools.pdfPageNumbers.name', descriptionKey: 'tools.pdfPageNumbers.description', icon: Hash, category: 'pdf', href: '/tools/pdf-page-numbers', color: 'pink' },
  { id: 'pdf-to-html', nameKey: 'tools.pdfToHtml.name', descriptionKey: 'tools.pdfToHtml.description', icon: FileCode, category: 'pdf', href: '/tools/pdf-to-html', color: 'pink' },
  { id: 'pdf-to-word', nameKey: 'tools.pdfToWord.name', descriptionKey: 'tools.pdfToWord.description', icon: FileOutput, category: 'pdf', href: '/tools/pdf-to-word', color: 'pink' },
  
  // Text Tools
  { id: 'text-counter', nameKey: 'tools.textCounter.name', descriptionKey: 'tools.textCounter.description', icon: AlignLeft, category: 'text', href: '/tools/text-counter', color: 'green' },
  { id: 'text-formatter', nameKey: 'tools.textFormatter.name', descriptionKey: 'tools.textFormatter.description', icon: TextCursor, category: 'text', href: '/tools/text-formatter', color: 'green' },
  { id: 'text-diff', nameKey: 'tools.textDiff.name', descriptionKey: 'tools.textDiff.description', icon: GitCompare, category: 'text', href: '/tools/text-diff', color: 'green' },
  { id: 'lorem-generator', nameKey: 'tools.loremGenerator.name', descriptionKey: 'tools.loremGenerator.description', icon: Type, category: 'text', href: '/tools/lorem-generator', color: 'green' },
  { id: 'slug-generator', nameKey: 'tools.slugGenerator.name', descriptionKey: 'tools.slugGenerator.description', icon: Link2, category: 'text', href: '/tools/slug-generator', color: 'green' },
  
  // Color Tools
  { id: 'color-picker', nameKey: 'tools.colorPicker.name', descriptionKey: 'tools.colorPicker.description', icon: Pipette, category: 'color', href: '/tools/color-picker', color: 'purple' },
  { id: 'color-palette', nameKey: 'tools.colorPalette.name', descriptionKey: 'tools.colorPalette.description', icon: SwatchBook, category: 'color', href: '/tools/color-palette', color: 'purple' },
  { id: 'color-converter', nameKey: 'tools.colorConverter.name', descriptionKey: 'tools.colorConverter.description', icon: Palette, category: 'color', href: '/tools/color-converter', color: 'purple' },
  { id: 'gradient-generator', nameKey: 'tools.gradientGenerator.name', descriptionKey: 'tools.gradientGenerator.description', icon: Blend, category: 'color', href: '/tools/gradient-generator', color: 'purple' },
  { id: 'contrast-checker', nameKey: 'tools.contrastChecker.name', descriptionKey: 'tools.contrastChecker.description', icon: Contrast, category: 'color', href: '/tools/contrast-checker', color: 'purple' },
  
  // Calculator Tools
  { id: 'percentage-calculator', nameKey: 'tools.percentageCalculator.name', descriptionKey: 'tools.percentageCalculator.description', icon: Percent, category: 'calculator', href: '/tools/percentage-calculator', color: 'orange' },
  { id: 'age-calculator', nameKey: 'tools.ageCalculator.name', descriptionKey: 'tools.ageCalculator.description', icon: Calendar, category: 'calculator', href: '/tools/age-calculator', color: 'orange' },
  { id: 'bmi-calculator', nameKey: 'tools.bmiCalculator.name', descriptionKey: 'tools.bmiCalculator.description', icon: Activity, category: 'calculator', href: '/tools/bmi-calculator', color: 'orange' },
  { id: 'unit-converter', nameKey: 'tools.unitConverter.name', descriptionKey: 'tools.unitConverter.description', icon: Ruler, category: 'calculator', href: '/tools/unit-converter', color: 'orange' },
  { id: 'tip-calculator', nameKey: 'tools.tipCalculator.name', descriptionKey: 'tools.tipCalculator.description', icon: Calculator, category: 'calculator', href: '/tools/tip-calculator', color: 'orange' },
  { id: 'work-hours-calculator', nameKey: 'tools.workHoursCalculator.name', descriptionKey: 'tools.workHoursCalculator.description', icon: Calculator, category: 'calculator', href: '/tools/work-hours-calculator', color: 'orange' },
  
  // QR Tools
  { id: 'qr-generator', nameKey: 'tools.qrGenerator.name', descriptionKey: 'tools.qrGenerator.description', icon: QrCode, category: 'qr', href: '/tools/qr-generator', color: 'yellow' },
  { id: 'qr-scanner', nameKey: 'tools.qrScanner.name', descriptionKey: 'tools.qrScanner.description', icon: ScanLine, category: 'qr', href: '/tools/qr-scanner', color: 'yellow' },
  
  // SEO Tools
  { id: 'website-speed-test', nameKey: 'tools.websiteSpeedTest.name', descriptionKey: 'tools.websiteSpeedTest.description', icon: Gauge, category: 'seo', href: '/tools/website-speed-test', color: 'cyan' },
  { id: 'broken-links-checker', nameKey: 'tools.brokenLinksChecker.name', descriptionKey: 'tools.brokenLinksChecker.description', icon: Link, category: 'seo', href: '/tools/broken-links-checker', color: 'cyan' },
  { id: 'meta-tag-generator', nameKey: 'tools.metaTagGenerator.name', descriptionKey: 'tools.metaTagGenerator.description', icon: FileCode2, category: 'seo', href: '/tools/meta-tag-generator', color: 'cyan' },
  { id: 'xml-sitemap-generator', nameKey: 'tools.xmlSitemapGenerator.name', descriptionKey: 'tools.xmlSitemapGenerator.description', icon: Globe2, category: 'seo', href: '/tools/xml-sitemap-generator', color: 'cyan' },
  { id: 'robots-txt-generator', nameKey: 'tools.robotsTxtGenerator.name', descriptionKey: 'tools.robotsTxtGenerator.description', icon: Bot, category: 'seo', href: '/tools/robots-txt-generator', color: 'cyan' },
  { id: 'open-graph-preview', nameKey: 'tools.openGraphPreview.name', descriptionKey: 'tools.openGraphPreview.description', icon: Eye, category: 'seo', href: '/tools/open-graph-preview', color: 'cyan' },
  { id: 'keyword-density-analyzer', nameKey: 'tools.keywordDensityAnalyzer.name', descriptionKey: 'tools.keywordDensityAnalyzer.description', icon: BarChart3, category: 'seo', href: '/tools/keyword-density-analyzer', color: 'cyan' },
];

interface ToolsGridProps {
  category?: 'all' | 'image' | 'pdf' | 'text' | 'color' | 'calculator' | 'qr' | 'seo';
  limit?: number;
}

export function ToolsGrid({ category = 'all', limit }: ToolsGridProps) {
  const { t } = useLanguage();

  let filteredTools = category === 'all' 
    ? allTools 
    : allTools.filter(tool => tool.category === category);

  if (limit) {
    filteredTools = filteredTools.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
