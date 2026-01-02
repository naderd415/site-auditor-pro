import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/lib/i18n";
import { ChristmasEffects } from "@/components/ChristmasEffects";
import { NewYearBanner } from "@/components/NewYearBanner";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Tool Pages
import QRGenerator from "./pages/tools/QRGenerator";
import QRScanner from "./pages/tools/QRScanner";
import ImageConverter from "./pages/tools/ImageConverter";
import ImageCompressor from "./pages/tools/ImageCompressor";
import ImageResizer from "./pages/tools/ImageResizer";
import ImageCropper from "./pages/tools/ImageCropper";
import ImageToBase64 from "./pages/tools/ImageToBase64";
import TextCounter from "./pages/tools/TextCounter";
import TextFormatter from "./pages/tools/TextFormatter";
import TextDiff from "./pages/tools/TextDiff";
import LoremGenerator from "./pages/tools/LoremGenerator";
import SlugGenerator from "./pages/tools/SlugGenerator";
import ColorPicker from "./pages/tools/ColorPicker";
import ColorConverter from "./pages/tools/ColorConverter";
import ColorPalette from "./pages/tools/ColorPalette";
import ContrastChecker from "./pages/tools/ContrastChecker";
import GradientGenerator from "./pages/tools/GradientGenerator";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import AgeCalculator from "./pages/tools/AgeCalculator";
import BMICalculator from "./pages/tools/BMICalculator";
import UnitConverter from "./pages/tools/UnitConverter";
import TipCalculator from "./pages/tools/TipCalculator";
import PDFMerge from "./pages/tools/PDFMerge";
import PDFSplit from "./pages/tools/PDFSplit";
import PDFCompress from "./pages/tools/PDFCompress";
import PDFToImage from "./pages/tools/PDFToImage";
import ImageToPDF from "./pages/tools/ImageToPDF";
import PDFToHTML from "./pages/tools/PDFToHTML";
import PDFToWord from "./pages/tools/PDFToWord";
import PDFRotate from "./pages/tools/PDFRotate";
import PDFWatermark from "./pages/tools/PDFWatermark";
import PDFProtect from "./pages/tools/PDFProtect";
import PDFPageNumbers from "./pages/tools/PDFPageNumbers";
import PDFSign from "./pages/tools/PDFSign";
import PowerPointToPDF from "./pages/tools/PowerPointToPDF";
import PDFToPowerPoint from "./pages/tools/PDFToPowerPoint";
import WordToPDF from "./pages/tools/WordToPDF";
import HTMLToPDF from "./pages/tools/HTMLToPDF";
import ExcelToPDF from "./pages/tools/ExcelToPDF";
import PDFToExcel from "./pages/tools/PDFToExcel";
import WebsiteSpeedTest from "./pages/tools/WebsiteSpeedTest";
import BrokenLinksChecker from "./pages/tools/BrokenLinksChecker";
import MetaTagGenerator from "./pages/tools/MetaTagGenerator";
import XMLSitemapGenerator from "./pages/tools/XMLSitemapGenerator";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NewYearBanner />
          <ChristmasEffects />
          <BrowserRouter>
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
              <Route path="/admin" element={<Admin />} />
              
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
              
              {/* QR Tools */}
              <Route path="/tools/qr-generator" element={<QRGenerator />} />
              <Route path="/tools/qr-scanner" element={<QRScanner />} />
              
              {/* SEO Tools */}
              <Route path="/tools/website-speed-test" element={<WebsiteSpeedTest />} />
              <Route path="/tools/broken-links-checker" element={<BrokenLinksChecker />} />
              <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
              <Route path="/tools/xml-sitemap-generator" element={<XMLSitemapGenerator />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
