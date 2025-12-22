import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';

const Terms = () => {
  const { isRTL } = useLanguage();

  const sections = isRTL ? [
    {
      title: 'قبول الشروط',
      content: 'باستخدامك لموقع BestToolsHub، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع.',
    },
    {
      title: 'وصف الخدمة',
      content: 'يوفر BestToolsHub مجموعة من الأدوات المجانية عبر الإنترنت لمعالجة الصور وملفات PDF والنصوص والألوان وغيرها. جميع الأدوات تعمل مباشرة من متصفحك دون الحاجة لرفع ملفاتك إلى خوادم خارجية.',
    },
    {
      title: 'الاستخدام المسموح',
      content: 'يُسمح باستخدام أدواتنا للأغراض الشخصية والتجارية. يُحظر استخدام الموقع لأي أغراض غير قانونية أو ضارة، أو محاولة اختراق أو تعطيل الموقع.',
    },
    {
      title: 'الملكية الفكرية',
      content: 'جميع حقوق الملكية الفكرية للموقع والأدوات محفوظة لـ BestToolsHub. يُحظر نسخ أو توزيع أو تعديل أي جزء من الموقع دون إذن كتابي.',
    },
    {
      title: 'المسؤولية',
      content: 'يتم توفير الأدوات "كما هي" دون أي ضمانات. لا نتحمل أي مسؤولية عن أي أضرار ناتجة عن استخدام الموقع أو الأدوات. أنت المسؤول الوحيد عن ملفاتك وبياناتك.',
    },
    {
      title: 'الإعلانات',
      content: 'يعرض الموقع إعلانات من Google AdSense وشبكات إعلانية أخرى. هذه الإعلانات تساعد في الحفاظ على مجانية الخدمة.',
    },
    {
      title: 'التعديلات',
      content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على هذه الصفحة، واستمرارك في استخدام الموقع يعني موافقتك على الشروط المعدلة.',
    },
    {
      title: 'القانون الواجب التطبيق',
      content: 'تخضع هذه الشروط للقوانين المعمول بها. أي نزاعات تنشأ عن استخدام الموقع ستُحل وفقاً لهذه القوانين.',
    },
  ] : [
    {
      title: 'Acceptance of Terms',
      content: 'By using BestToolsHub, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use the website.',
    },
    {
      title: 'Service Description',
      content: 'BestToolsHub provides a collection of free online tools for processing images, PDFs, text, colors, and more. All tools work directly from your browser without uploading files to external servers.',
    },
    {
      title: 'Permitted Use',
      content: 'Our tools may be used for personal and commercial purposes. Using the website for any illegal or harmful purposes, or attempting to hack or disrupt the website, is prohibited.',
    },
    {
      title: 'Intellectual Property',
      content: 'All intellectual property rights for the website and tools are reserved by BestToolsHub. Copying, distributing, or modifying any part of the website without written permission is prohibited.',
    },
    {
      title: 'Liability',
      content: 'Tools are provided "as is" without any warranties. We assume no responsibility for any damages resulting from use of the website or tools. You are solely responsible for your files and data.',
    },
    {
      title: 'Advertising',
      content: 'The website displays ads from Google AdSense and other advertising networks. These ads help maintain the free service.',
    },
    {
      title: 'Modifications',
      content: 'We reserve the right to modify these terms at any time. Modifications will be posted on this page, and your continued use of the website means you accept the modified terms.',
    },
    {
      title: 'Applicable Law',
      content: 'These terms are governed by applicable laws. Any disputes arising from the use of the website will be resolved according to these laws.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'الشروط والأحكام - BestToolsHub' : 'Terms of Service - BestToolsHub'}</title>
        <meta name="description" content={isRTL 
          ? 'الشروط والأحكام لاستخدام موقع BestToolsHub. تعرف على قواعد وأحكام استخدام أدواتنا المجانية.'
          : 'Terms of Service for using BestToolsHub. Learn about the rules and terms for using our free tools.'
        } />
        <link rel="canonical" href="/terms" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {isRTL ? 'الشروط والأحكام' : 'Terms of Service'}
                </h1>
                <p className="text-muted-foreground">
                  {isRTL ? 'آخر تحديث: ديسمبر 2024' : 'Last updated: December 2024'}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mb-12">
            <AdSpace type="horizontal" />
          </div>

          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <div key={index}>
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 my-12">
            <AdSpace type="horizontal" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Terms;
