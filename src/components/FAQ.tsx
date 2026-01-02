import { useLanguage } from '@/lib/i18n';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is BestToolsHub completely free?",
    questionAr: "هل موقع BestToolsHub مجاني بالكامل؟",
    answer: "Yes! All tools on BestToolsHub are 100% free to use. There are no hidden fees, subscriptions, or premium tiers. You can use any tool as many times as you want without creating an account or paying anything.",
    answerAr: "نعم! جميع الأدوات في BestToolsHub مجانية 100%. لا توجد رسوم مخفية أو اشتراكات أو مستويات مدفوعة. يمكنك استخدام أي أداة بقدر ما تريد دون إنشاء حساب أو دفع أي شيء."
  },
  {
    question: "Is my data safe when using these tools?",
    questionAr: "هل بياناتي آمنة عند استخدام هذه الأدوات؟",
    answer: "Absolutely! All file processing happens directly in your browser (client-side). Your files never leave your device or get uploaded to any server. This means your sensitive documents, images, and data remain completely private and secure on your own computer.",
    answerAr: "بالتأكيد! تتم جميع عمليات معالجة الملفات مباشرة في متصفحك (من جانب العميل). لا تغادر ملفاتك جهازك أبداً ولا يتم تحميلها على أي خادم. هذا يعني أن مستنداتك وصورك وبياناتك الحساسة تظل خاصة وآمنة تماماً على جهاز الكمبيوتر الخاص بك."
  },
  {
    question: "How do I use the PDF tools?",
    questionAr: "كيف أستخدم أدوات PDF؟",
    answer: "Our PDF tools let you merge, split, compress, rotate, add watermarks, protect with passwords, and convert PDFs to/from Word, Excel, PowerPoint, and images. Simply select the tool, upload your PDF, choose your options, and download the result - all processed in your browser!",
    answerAr: "تتيح لك أدوات PDF الدمج والتقسيم والضغط والتدوير وإضافة العلامات المائية والحماية بكلمة مرور وتحويل PDF من وإلى Word وExcel وPowerPoint والصور. ما عليك سوى اختيار الأداة، رفع ملف PDF، اختيار الخيارات، وتنزيل النتيجة - كل ذلك يتم في متصفحك!"
  },
  {
    question: "What image editing tools are available?",
    questionAr: "ما هي أدوات تحرير الصور المتاحة؟",
    answer: "We offer comprehensive image tools: Image Compressor (reduce file size), Image Converter (change formats like PNG to JPG), Image Resizer (change dimensions), Image Cropper (cut specific parts), and Image to Base64 converter. All tools support batch processing for multiple files.",
    answerAr: "نقدم أدوات صور شاملة: ضاغط الصور (تقليل حجم الملف)، محول الصور (تغيير الصيغ مثل PNG إلى JPG)، معدل أبعاد الصور، قاطع الصور، ومحول الصور إلى Base64. جميع الأدوات تدعم المعالجة المتعددة لعدة ملفات."
  },
  {
    question: "How do QR Code tools work?",
    questionAr: "كيف تعمل أدوات رمز QR؟",
    answer: "Our QR Generator creates custom QR codes for URLs, text, WiFi networks, contact cards, and more. You can customize colors, add logos, and choose different styles. The QR Scanner reads QR codes using your device's camera. Both work entirely offline in your browser.",
    answerAr: "يُنشئ مولد QR أكواد QR مخصصة للروابط والنصوص وشبكات WiFi وبطاقات الاتصال والمزيد. يمكنك تخصيص الألوان وإضافة الشعارات واختيار أنماط مختلفة. ماسح QR يقرأ أكواد QR باستخدام كاميرا جهازك. كلاهما يعمل بالكامل دون اتصال في متصفحك."
  },
  {
    question: "What are the SEO diagnostic tools?",
    questionAr: "ما هي أدوات تشخيص SEO؟",
    answer: "Our AI-powered SEO tools include Website Speed Test (analyzes performance using Google PageSpeed API) and Broken Links Checker (scans your site for dead links). These help you optimize your website for better search engine rankings and user experience.",
    answerAr: "تشمل أدوات SEO المدعومة بالذكاء الاصطناعي اختبار سرعة الموقع (يحلل الأداء باستخدام Google PageSpeed API) وفاحص الروابط المعطلة (يفحص موقعك بحثاً عن الروابط الميتة). تساعدك هذه الأدوات على تحسين موقعك لترتيب أفضل في محركات البحث وتجربة مستخدم أفضل."
  },
  {
    question: "Can I use these tools on mobile devices?",
    questionAr: "هل يمكنني استخدام هذه الأدوات على الأجهزة المحمولة؟",
    answer: "Yes! BestToolsHub is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can even install it as a Progressive Web App (PWA) on your mobile device for quick access and offline capabilities.",
    answerAr: "نعم! موقع BestToolsHub متجاوب بالكامل ويعمل بسلاسة على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر المكتبية. يمكنك حتى تثبيته كتطبيق ويب تقدمي (PWA) على جهازك المحمول للوصول السريع والعمل بدون اتصال."
  },
  {
    question: "What text and color tools are available?",
    questionAr: "ما هي أدوات النصوص والألوان المتاحة؟",
    answer: "Text tools include: Text Counter (words, characters, sentences), Text Formatter (case conversion), Text Diff (compare two texts), Lorem Generator, and Slug Generator. Color tools include: Color Picker, Color Palette Generator, Contrast Checker, Color Converter (HEX, RGB, HSL), and Gradient Generator.",
    answerAr: "أدوات النصوص تشمل: عداد النص، منسق النص، مقارن النصوص، مولد Lorem، ومولد Slug. أدوات الألوان تشمل: منتقي الألوان، مولد لوحات الألوان، فاحص التباين، محول الألوان، ومولد التدرجات."
  }
];

interface FAQProps {
  className?: string;
}

export function FAQ({ className = '' }: FAQProps) {
  const { isRTL } = useLanguage();

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'إجابات على الأسئلة الأكثر شيوعاً حول أدواتنا' 
                : 'Answers to the most common questions about our tools'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-start hover:no-underline">
                    <span className="font-medium text-foreground">
                      {isRTL ? item.questionAr : item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {isRTL ? item.answerAr : item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
