import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, Zap, Image, Code, Clock, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

interface PerformanceResult {
  score: number;
  metrics: {
    fcp: number;
    lcp: number;
    cls: number;
    ttfb: number;
    tti: number;
    tbt: number;
  };
  audits: {
    name: string;
    score: number;
    displayValue: string;
  }[];
}

const WebsiteSpeedTest = () => {
  const { isRTL } = useLanguage();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PerformanceResult | null>(null);
  const [error, setError] = useState('');

  const runSpeedTest = async () => {
    if (!url) {
      toast.error(isRTL ? 'الرجاء إدخال رابط الموقع' : 'Please enter a website URL');
      return;
    }

    // Validate URL
    let testUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      testUrl = 'https://' + url;
    }

    try {
      new URL(testUrl);
    } catch {
      toast.error(isRTL ? 'رابط غير صالح' : 'Invalid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Use PageSpeed Insights API (free, no key required for basic usage)
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=mobile`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(isRTL ? 'فشل في تحليل الموقع' : 'Failed to analyze website');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      const lighthouse = data.lighthouseResult;
      const categories = lighthouse.categories;
      const audits = lighthouse.audits;

      setResult({
        score: Math.round((categories.performance?.score || 0) * 100),
        metrics: {
          fcp: parseFloat(audits['first-contentful-paint']?.numericValue || 0) / 1000,
          lcp: parseFloat(audits['largest-contentful-paint']?.numericValue || 0) / 1000,
          cls: parseFloat(audits['cumulative-layout-shift']?.numericValue || 0),
          ttfb: parseFloat(audits['server-response-time']?.numericValue || 0) / 1000,
          tti: parseFloat(audits['interactive']?.numericValue || 0) / 1000,
          tbt: parseFloat(audits['total-blocking-time']?.numericValue || 0) / 1000,
        },
        audits: [
          { name: isRTL ? 'أول رسم للمحتوى' : 'First Contentful Paint', score: audits['first-contentful-paint']?.score || 0, displayValue: audits['first-contentful-paint']?.displayValue || '' },
          { name: isRTL ? 'أكبر رسم للمحتوى' : 'Largest Contentful Paint', score: audits['largest-contentful-paint']?.score || 0, displayValue: audits['largest-contentful-paint']?.displayValue || '' },
          { name: isRTL ? 'وقت التفاعل' : 'Time to Interactive', score: audits['interactive']?.score || 0, displayValue: audits['interactive']?.displayValue || '' },
          { name: isRTL ? 'تغير التخطيط التراكمي' : 'Cumulative Layout Shift', score: audits['cumulative-layout-shift']?.score || 0, displayValue: audits['cumulative-layout-shift']?.displayValue || '' },
          { name: isRTL ? 'إجمالي وقت الحظر' : 'Total Blocking Time', score: audits['total-blocking-time']?.score || 0, displayValue: audits['total-blocking-time']?.displayValue || '' },
          { name: isRTL ? 'وقت استجابة الخادم' : 'Server Response Time', score: audits['server-response-time']?.score || 0, displayValue: audits['server-response-time']?.displayValue || '' },
        ]
      });

      toast.success(isRTL ? 'تم التحليل بنجاح!' : 'Analysis complete!');
    } catch (err) {
      console.error(err);
      setError(isRTL ? 'حدث خطأ أثناء تحليل الموقع. تأكد من صحة الرابط.' : 'Error analyzing website. Make sure the URL is correct.');
      toast.error(isRTL ? 'فشل التحليل' : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isRTL ? "اختبار سرعة الموقع AI" : "Website Speed Test AI",
    "description": isRTL ? "أداة مجانية لاختبار سرعة موقعك باستخدام Google PageSpeed API" : "Free tool to test your website speed using Google PageSpeed API",
    "url": "https://besttoolshub.online/tools/website-speed-test",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ToolPageLayout
        title={isRTL ? 'اختبار سرعة الموقع AI' : 'Website Speed Test AI'}
        description={isRTL ? 'اختبر سرعة موقعك مجاناً باستخدام Google PageSpeed API واحصل على تقرير مفصل' : 'Test your website speed for free using Google PageSpeed API and get a detailed report'}
        keywords="website speed test, page speed, performance test, lighthouse, core web vitals, اختبار سرعة الموقع"
        article={isRTL 
          ? 'اختبار سرعة الموقع هو أداة مجانية تستخدم Google PageSpeed Insights API لتحليل أداء موقعك. احصل على درجة الأداء ومقاييس Core Web Vitals الأساسية مثل LCP و FCP و CLS.'
          : 'Website Speed Test is a free tool that uses Google PageSpeed Insights API to analyze your website performance. Get performance score and Core Web Vitals metrics like LCP, FCP, and CLS.'
        }
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={isRTL ? 'أدخل رابط الموقع (مثال: example.com)' : 'Enter website URL (e.g., example.com)'}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && runSpeedTest()}
              />
              <Button onClick={runSpeedTest} disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Gauge className="w-4 h-4" />
                    {isRTL ? 'اختبار السرعة' : 'Test Speed'}
                  </>
                )}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}
          </Card>

          {/* Loading State */}
          {loading && (
            <Card className="p-8 text-center">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
              <p className="text-lg font-medium">{isRTL ? 'جاري تحليل الموقع...' : 'Analyzing website...'}</p>
              <p className="text-muted-foreground">{isRTL ? 'قد يستغرق هذا دقيقة أو أكثر' : 'This may take a minute or more'}</p>
            </Card>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Score */}
              <Card className="p-8 text-center">
                <div className={`text-7xl font-bold mb-4 ${getScoreColor(result.score)}`}>
                  {result.score}
                </div>
                <div className="text-lg font-medium mb-2">
                  {isRTL ? 'درجة الأداء' : 'Performance Score'}
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white ${getScoreBg(result.score)}`}>
                  {result.score >= 90 ? <CheckCircle className="w-5 h-5" /> : result.score >= 50 ? <Clock className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  {result.score >= 90 ? (isRTL ? 'ممتاز' : 'Excellent') : result.score >= 50 ? (isRTL ? 'يحتاج تحسين' : 'Needs Improvement') : (isRTL ? 'ضعيف' : 'Poor')}
                </div>
              </Card>

              {/* Core Web Vitals */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  {isRTL ? 'مقاييس Core Web Vitals' : 'Core Web Vitals'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {result.audits.map((audit, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">{audit.name}</div>
                      <div className={`text-lg font-bold ${getScoreColor(audit.score * 100)}`}>
                        {audit.displayValue || '-'}
                      </div>
                      <Progress value={audit.score * 100} className="h-1 mt-2" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tips */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {isRTL ? 'نصائح لتحسين السرعة' : 'Speed Optimization Tips'}
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Image className="w-5 h-5 text-primary mt-0.5" />
                    {isRTL ? 'قم بضغط الصور واستخدم صيغ حديثة مثل WebP' : 'Compress images and use modern formats like WebP'}
                  </li>
                  <li className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-primary mt-0.5" />
                    {isRTL ? 'قلل من حجم CSS و JavaScript غير الضروري' : 'Minimize unused CSS and JavaScript'}
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    {isRTL ? 'استخدم التخزين المؤقت للمتصفح (Browser Caching)' : 'Enable browser caching'}
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-0.5" />
                    {isRTL ? 'استخدم CDN لتسريع تحميل الملفات' : 'Use a CDN for faster file delivery'}
                  </li>
                </ul>
              </Card>
            </div>
          )}
        </div>
      </ToolPageLayout>
    </>
  );
};

export default WebsiteSpeedTest;
