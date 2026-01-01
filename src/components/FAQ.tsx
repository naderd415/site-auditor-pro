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
    question: "How do I use the tools on this website?",
    questionAr: "كيف أستخدم الأدوات في هذا الموقع؟",
    answer: "Simply navigate to the tool you need, upload your file or enter your data, adjust any settings if needed, and click the action button. The result will be ready instantly for download or copy. No registration or software installation required!",
    answerAr: "ما عليك سوى الانتقال إلى الأداة التي تحتاجها، وتحميل ملفك أو إدخال بياناتك، وضبط أي إعدادات إذا لزم الأمر، ثم النقر على زر التنفيذ. ستكون النتيجة جاهزة فوراً للتنزيل أو النسخ. لا يلزم التسجيل أو تثبيت أي برنامج!"
  },
  {
    question: "Do I need to create an account?",
    questionAr: "هل أحتاج إلى إنشاء حساب؟",
    answer: "No account is needed! You can use all tools immediately without signing up. We believe in providing instant access to useful tools without barriers.",
    answerAr: "لا حاجة لإنشاء حساب! يمكنك استخدام جميع الأدوات فوراً دون التسجيل. نحن نؤمن بتوفير وصول فوري للأدوات المفيدة دون عوائق."
  },
  {
    question: "What types of tools are available?",
    questionAr: "ما هي أنواع الأدوات المتوفرة؟",
    answer: "We offer a comprehensive suite of tools including: Image tools (converter, compressor, resizer, cropper), PDF tools (merge, split, compress, convert), Text tools (counter, formatter, diff checker), Color tools (picker, palette generator, contrast checker), Calculators (age, BMI, percentage, unit converter), QR code tools, and SEO diagnostic tools.",
    answerAr: "نقدم مجموعة شاملة من الأدوات تشمل: أدوات الصور (محول، ضاغط، معدل حجم، قاطع)، أدوات PDF (دمج، تقسيم، ضغط، تحويل)، أدوات النص (عداد، منسق، مقارن)، أدوات الألوان (منتقي، مولد لوحات، فاحص تباين)، الحاسبات (العمر، مؤشر الكتلة، النسب المئوية، محول الوحدات)، أدوات رمز QR، وأدوات تشخيص SEO."
  },
  {
    question: "Can I use these tools on mobile devices?",
    questionAr: "هل يمكنني استخدام هذه الأدوات على الأجهزة المحمولة؟",
    answer: "Yes! BestToolsHub is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can even install it as a Progressive Web App (PWA) on your mobile device for quick access.",
    answerAr: "نعم! موقع BestToolsHub متجاوب بالكامل ويعمل بسلاسة على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر المكتبية. يمكنك حتى تثبيته كتطبيق ويب تقدمي (PWA) على جهازك المحمول للوصول السريع."
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
