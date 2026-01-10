import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/lib/i18n";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Tools = lazy(() => import("./pages/Tools"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

// Tool Pages - Lazy loaded
const QRGenerator = lazy(() => import("./pages/tools/QRGenerator"));
const QRScanner = lazy(() => import("./pages/tools/QRScanner"));
const ImageConverter = lazy(() => import("./pages/tools/ImageConverter"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const ImageCropper = lazy(() => import("./pages/tools/ImageCropper"));
const ImageToBase64 = lazy(() => import("./pages/tools/ImageToBase64"));
const TextCounter = lazy(() => import("./pages/tools/TextCounter"));
const TextFormatter = lazy(() => import("./pages/tools/TextFormatter"));
const TextDiff = lazy(() => import("./pages/tools/TextDiff"));
const LoremGenerator = lazy(() => import("./pages/tools/LoremGenerator"));
const SlugGenerator = lazy(() => import("./pages/tools/SlugGenerator"));
const ColorPicker = lazy(() => import("./pages/tools/ColorPicker"));
const ColorConverter = lazy(() => import("./pages/tools/ColorConverter"));
const ColorPalette = lazy(() => import("./pages/tools/ColorPalette"));
const ContrastChecker = lazy(() => import("./pages/tools/ContrastChecker"));
const GradientGenerator = lazy(() => import("./pages/tools/GradientGenerator"));
const PercentageCalculator = lazy(() => import("./pages/tools/PercentageCalculator"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const TipCalculator = lazy(() => import("./pages/tools/TipCalculator"));
const WorkHoursCalculator = lazy(() => import("./pages/tools/WorkHoursCalculator"));
const PDFMerge = lazy(() => import("./pages/tools/PDFMerge"));
const PDFSplit = lazy(() => import("./pages/tools/PDFSplit"));
const PDFCompress = lazy(() => import("./pages/tools/PDFCompress"));
const PDFToImage = lazy(() => import("./pages/tools/PDFToImage"));
const ImageToPDF = lazy(() => import("./pages/tools/ImageToPDF"));
const PDFToHTML = lazy(() => import("./pages/tools/PDFToHTML"));
const PDFToWord = lazy(() => import("./pages/tools/PDFToWord"));
const PDFRotate = lazy(() => import("./pages/tools/PDFRotate"));
const PDFWatermark = lazy(() => import("./pages/tools/PDFWatermark"));
const PDFProtect = lazy(() => import("./pages/tools/PDFProtect"));
const PDFPageNumbers = lazy(() => import("./pages/tools/PDFPageNumbers"));
const PDFSign = lazy(() => import("./pages/tools/PDFSign"));
const PowerPointToPDF = lazy(() => import("./pages/tools/PowerPointToPDF"));
const PDFToPowerPoint = lazy(() => import("./pages/tools/PDFToPowerPoint"));
const WordToPDF = lazy(() => import("./pages/tools/WordToPDF"));
const HTMLToPDF = lazy(() => import("./pages/tools/HTMLToPDF"));
const ExcelToPDF = lazy(() => import("./pages/tools/ExcelToPDF"));
const PDFToExcel = lazy(() => import("./pages/tools/PDFToExcel"));
const WebsiteSpeedTest = lazy(() => import("./pages/tools/WebsiteSpeedTest"));
const BrokenLinksChecker = lazy(() => import("./pages/tools/BrokenLinksChecker"));
const MetaTagGenerator = lazy(() => import("./pages/tools/MetaTagGenerator"));
const XMLSitemapGenerator = lazy(() => import("./pages/tools/XMLSitemapGenerator"));
const RobotsTxtGenerator = lazy(() => import("./pages/tools/RobotsTxtGenerator"));
const OpenGraphPreview = lazy(() => import("./pages/tools/OpenGraphPreview"));
const KeywordDensityAnalyzer = lazy(() => import("./pages/tools/KeywordDensityAnalyzer"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Image Tools */}
                <Route path="/tools/image-converter" element={<ImageConverter />} />
                <Route path="/tools/image-compressor" element={<ImageCompressor />} />
                <Route path="/tools/image-resizer" element={<ImageResizer />} />
                <Route path="/tools/image-cropper" element={<ImageCropper />} />
                <Route path="/tools/image-to-base64" element={<ImageToBase64 />} />
                
                {/* PDF Tools */}
                <Route path="/tools/pdf-merge" element={<PDFMerge />} />
                <Route path="/tools/pdf-split" element={<PDFSplit />} />
                <Route path="/tools/pdf-compress" element={<PDFCompress />} />
                <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
                <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
                <Route path="/tools/pdf-to-html" element={<PDFToHTML />} />
                <Route path="/tools/pdf-to-word" element={<PDFToWord />} />
                <Route path="/tools/pdf-rotate" element={<PDFRotate />} />
                <Route path="/tools/pdf-watermark" element={<PDFWatermark />} />
                <Route path="/tools/pdf-protect" element={<PDFProtect />} />
                <Route path="/tools/pdf-page-numbers" element={<PDFPageNumbers />} />
                <Route path="/tools/pdf-sign" element={<PDFSign />} />
                <Route path="/tools/powerpoint-to-pdf" element={<PowerPointToPDF />} />
                <Route path="/tools/pdf-to-powerpoint" element={<PDFToPowerPoint />} />
                <Route path="/tools/word-to-pdf" element={<WordToPDF />} />
                <Route path="/tools/html-to-pdf" element={<HTMLToPDF />} />
                <Route path="/tools/excel-to-pdf" element={<ExcelToPDF />} />
                <Route path="/tools/pdf-to-excel" element={<PDFToExcel />} />
                
                {/* Admin */}
                <Route path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
                
                {/* Text Tools */}
                <Route path="/tools/text-counter" element={<TextCounter />} />
                <Route path="/tools/text-formatter" element={<TextFormatter />} />
                <Route path="/tools/text-diff" element={<TextDiff />} />
                <Route path="/tools/lorem-generator" element={<LoremGenerator />} />
                <Route path="/tools/slug-generator" element={<SlugGenerator />} />
                
                {/* Color Tools */}
                <Route path="/tools/color-picker" element={<ColorPicker />} />
                <Route path="/tools/color-converter" element={<ColorConverter />} />
                <Route path="/tools/color-palette" element={<ColorPalette />} />
                <Route path="/tools/contrast-checker" element={<ContrastChecker />} />
                <Route path="/tools/gradient-generator" element={<GradientGenerator />} />
                
                {/* Calculator Tools */}
                <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
                <Route path="/tools/age-calculator" element={<AgeCalculator />} />
                <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
                <Route path="/tools/unit-converter" element={<UnitConverter />} />
                <Route path="/tools/tip-calculator" element={<TipCalculator />} />
                <Route path="/tools/work-hours-calculator" element={<WorkHoursCalculator />} />
                
                {/* QR Tools */}
                <Route path="/tools/qr-generator" element={<QRGenerator />} />
                <Route path="/tools/qr-scanner" element={<QRScanner />} />
                
                {/* SEO Tools */}
                <Route path="/tools/website-speed-test" element={<WebsiteSpeedTest />} />
                <Route path="/tools/broken-links-checker" element={<BrokenLinksChecker />} />
                <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
                <Route path="/tools/xml-sitemap-generator" element={<XMLSitemapGenerator />} />
                <Route path="/tools/robots-txt-generator" element={<RobotsTxtGenerator />} />
                <Route path="/tools/open-graph-preview" element={<OpenGraphPreview />} />
                <Route path="/tools/keyword-density-analyzer" element={<KeywordDensityAnalyzer />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
