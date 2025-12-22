import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';

const Privacy = () => {
  const { isRTL } = useLanguage();

  const sections = isRTL ? [
    {
      title: 'مقدمة',
      content: 'نحن في BestToolsHub نأخذ خصوصيتك على محمل الجد. هذه السياسة توضح كيف نتعامل مع بياناتك عند استخدام موقعنا وأدواتنا.',
    },
    {
      title: 'البيانات التي نجمعها',
      content: 'نحن لا نجمع أي بيانات شخصية من خلال أدواتنا. جميع العمليات تتم محلياً على جهازك، ولا يتم رفع أي ملفات إلى خوادمنا. قد نجمع بيانات تحليلية مجهولة الهوية لتحسين تجربة المستخدم.',
    },
    {
      title: 'ملفات تعريف الارتباط (Cookies)',
      content: 'نستخدم ملفات تعريف الارتباط لحفظ تفضيلاتك مثل اللغة والمظهر. كما قد تستخدم خدمات الإعلانات (مثل Google AdSense) ملفات تعريف الارتباط لعرض إعلانات مخصصة.',
    },
    {
      title: 'الإعلانات',
      content: 'نستخدم Google AdSense لعرض الإعلانات. قد تستخدم Google ملفات تعريف الارتباط لعرض إعلانات بناءً على اهتماماتك. يمكنك إدارة تفضيلات الإعلانات من خلال إعدادات Google.',
    },
    {
      title: 'أمان البيانات',
      content: 'ملفاتك لا تغادر جهازك أبداً. جميع عمليات معالجة الصور وملفات PDF والنصوص تتم بالكامل في متصفحك باستخدام JavaScript.',
    },
    {
      title: 'حقوقك',
      content: 'لديك الحق في الوصول إلى بياناتك وتصحيحها وحذفها. نظراً لأننا لا نخزن بياناتك، فإن هذا يحدث تلقائياً عند إغلاق المتصفح.',
    },
    {
      title: 'التغييرات على السياسة',
      content: 'قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة.',
    },
    {
      title: 'اتصل بنا',
      content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر صفحة الاتصال.',
    },
  ] : [
    {
      title: 'Introduction',
      content: 'At BestToolsHub, we take your privacy seriously. This policy explains how we handle your data when using our website and tools.',
    },
    {
      title: 'Data We Collect',
      content: 'We do not collect any personal data through our tools. All processing is done locally on your device, and no files are uploaded to our servers. We may collect anonymous analytics data to improve user experience.',
    },
    {
      title: 'Cookies',
      content: 'We use cookies to save your preferences such as language and theme. Advertising services (such as Google AdSense) may also use cookies to display personalized ads.',
    },
    {
      title: 'Advertising',
      content: 'We use Google AdSense to display ads. Google may use cookies to display ads based on your interests. You can manage your ad preferences through Google settings.',
    },
    {
      title: 'Data Security',
      content: 'Your files never leave your device. All image, PDF, and text processing is done entirely in your browser using JavaScript.',
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, and delete your data. Since we don\'t store your data, this happens automatically when you close your browser.',
    },
    {
      title: 'Policy Changes',
      content: 'We may update this policy from time to time. Any changes will be posted on this page.',
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about the privacy policy, please contact us through the contact page.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'سياسة الخصوصية - BestToolsHub' : 'Privacy Policy - BestToolsHub'}</title>
        <meta name="description" content={isRTL 
          ? 'سياسة الخصوصية لموقع BestToolsHub. تعرف على كيفية تعاملنا مع بياناتك وحماية خصوصيتك.'
          : 'Privacy Policy for BestToolsHub. Learn how we handle your data and protect your privacy.'
        } />
        <link rel="canonical" href="/privacy" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
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

export default Privacy;
