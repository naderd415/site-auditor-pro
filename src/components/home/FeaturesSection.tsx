import { useLanguage } from '@/lib/i18n';
import { Zap, Shield, DollarSign, Globe, Lock, Smartphone } from 'lucide-react';

export function FeaturesSection() {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: isRTL ? 'سريع جداً' : 'Super Fast',
      description: isRTL ? 'معالجة فورية مباشرة من المتصفح' : 'Instant processing directly in browser',
      color: 'cyan',
    },
    {
      icon: DollarSign,
      title: isRTL ? 'مجاني 100%' : '100% Free',
      description: isRTL ? 'جميع الأدوات مجانية بدون قيود' : 'All tools are free without limits',
      color: 'green',
    },
    {
      icon: Shield,
      title: isRTL ? 'آمن وخاص' : 'Safe & Private',
      description: isRTL ? 'ملفاتك لا تغادر جهازك أبداً' : 'Your files never leave your device',
      color: 'purple',
    },
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: isRTL ? 'يعمل بدون إنترنت' : 'Works Offline',
      description: isRTL ? 'استخدم الأدوات بدون اتصال' : 'Use tools without connection',
    },
    {
      icon: Lock,
      title: isRTL ? 'بدون تسجيل' : 'No Registration',
      description: isRTL ? 'استخدم مباشرة بدون حساب' : 'Use directly without account',
    },
    {
      icon: Smartphone,
      title: isRTL ? 'متوافق مع الموبايل' : 'Mobile Friendly',
      description: isRTL ? 'يعمل على جميع الأجهزة' : 'Works on all devices',
    },
  ];

  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isRTL ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? 'أدوات احترافية مجانية تعمل مباشرة من متصفحك بدون الحاجة لتحميل أي برامج'
              : 'Professional free tools that work directly from your browser without downloading any software'
            }
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`feature-icon ${
                feature.color === 'cyan' ? 'glow-cyan' :
                feature.color === 'green' ? 'glow-green' : 'glow-purple'
              }`}>
                <feature.icon className={`w-6 h-6 ${
                  feature.color === 'cyan' ? 'text-neon-cyan' :
                  feature.color === 'green' ? 'text-neon-green' : 'text-neon-purple'
                }`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
