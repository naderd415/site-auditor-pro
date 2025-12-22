import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSpace } from '@/components/home/AdSpace';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: isRTL ? 'البريد الإلكتروني' : 'Email',
      value: 'support@besttoolshub.com',
    },
    {
      icon: MessageSquare,
      title: isRTL ? 'الدعم الفني' : 'Support',
      value: isRTL ? 'متاح 24/7' : 'Available 24/7',
    },
    {
      icon: MapPin,
      title: isRTL ? 'الموقع' : 'Location',
      value: isRTL ? 'عالمي - أونلاين' : 'Worldwide - Online',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'اتصل بنا - BestToolsHub' : 'Contact Us - BestToolsHub'}</title>
        <meta name="description" content={isRTL 
          ? 'تواصل معنا لأي استفسارات أو مقترحات. فريق BestToolsHub متاح لمساعدتك.'
          : 'Contact us for any inquiries or suggestions. The BestToolsHub team is available to help you.'
        } />
        <meta name="keywords" content="contact, support, BestToolsHub, help" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t.contact.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {isRTL 
                    ? 'نحن هنا لمساعدتك. لا تتردد في التواصل معنا!'
                    : 'We\'re here to help. Don\'t hesitate to reach out!'}
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mb-12">
            <AdSpace type="horizontal" />
          </div>

          {/* Contact Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {isRTL ? 'أرسل لنا رسالة' : 'Send us a Message'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contact.name}
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full"
                        placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contact.email}
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full"
                        placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t.contact.message}
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full"
                        placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting 
                        ? (isRTL ? 'جاري الإرسال...' : 'Sending...') 
                        : t.contact.send}
                    </Button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {isRTL ? 'معلومات التواصل' : 'Contact Information'}
                  </h2>
                  {contactInfo.map((info, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  ))}

                  <div className="glass-card p-6 rounded-xl mt-8">
                    <h3 className="font-semibold text-foreground mb-3">
                      {isRTL ? 'ساعات العمل' : 'Working Hours'}
                    </h3>
                    <p className="text-muted-foreground">
                      {isRTL 
                        ? 'نحن متاحون على مدار الساعة لمساعدتك. الأدوات تعمل 24/7 دون انقطاع.'
                        : 'We\'re available around the clock to help you. Tools work 24/7 without interruption.'}
                    </p>
                  </div>
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

export default Contact;
