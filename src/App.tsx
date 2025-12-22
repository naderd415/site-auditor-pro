import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/lib/i18n";
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
import TextCounter from "./pages/tools/TextCounter";
import TextFormatter from "./pages/tools/TextFormatter";
import ColorPicker from "./pages/tools/ColorPicker";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import AgeCalculator from "./pages/tools/AgeCalculator";
import BMICalculator from "./pages/tools/BMICalculator";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Tool Routes */}
              <Route path="/tools/qr-generator" element={<QRGenerator />} />
              <Route path="/tools/qr-scanner" element={<QRScanner />} />
              <Route path="/tools/image-converter" element={<ImageConverter />} />
              <Route path="/tools/image-compressor" element={<ImageCompressor />} />
              <Route path="/tools/image-resizer" element={<ImageResizer />} />
              <Route path="/tools/text-counter" element={<TextCounter />} />
              <Route path="/tools/text-formatter" element={<TextFormatter />} />
              <Route path="/tools/color-picker" element={<ColorPicker />} />
              <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/tools/age-calculator" element={<AgeCalculator />} />
              <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;