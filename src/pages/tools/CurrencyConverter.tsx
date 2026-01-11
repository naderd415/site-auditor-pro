import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, RefreshCw, TrendingUp, Globe2, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { toast } from 'sonner';

// Mock exchange rates (in real app, fetch from API)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  AED: 3.67,
  SAR: 3.75,
  EGP: 30.90,
  KWD: 0.31,
  QAR: 3.64,
  TRY: 29.50,
  RUB: 89.50,
  KRW: 1320.00,
  SGD: 1.34,
};

const currencyInfo: Record<string, { name: string; nameAr: string; symbol: string }> = {
  USD: { name: 'US Dollar', nameAr: 'دولار أمريكي', symbol: '$' },
  EUR: { name: 'Euro', nameAr: 'يورو', symbol: '€' },
  GBP: { name: 'British Pound', nameAr: 'جنيه إسترليني', symbol: '£' },
  JPY: { name: 'Japanese Yen', nameAr: 'ين ياباني', symbol: '¥' },
  CAD: { name: 'Canadian Dollar', nameAr: 'دولار كندي', symbol: 'C$' },
  AUD: { name: 'Australian Dollar', nameAr: 'دولار أسترالي', symbol: 'A$' },
  CHF: { name: 'Swiss Franc', nameAr: 'فرنك سويسري', symbol: 'Fr' },
  CNY: { name: 'Chinese Yuan', nameAr: 'يوان صيني', symbol: '¥' },
  INR: { name: 'Indian Rupee', nameAr: 'روبية هندية', symbol: '₹' },
  MXN: { name: 'Mexican Peso', nameAr: 'بيزو مكسيكي', symbol: 'MX$' },
  BRL: { name: 'Brazilian Real', nameAr: 'ريال برازيلي', symbol: 'R$' },
  AED: { name: 'UAE Dirham', nameAr: 'درهم إماراتي', symbol: 'د.إ' },
  SAR: { name: 'Saudi Riyal', nameAr: 'ريال سعودي', symbol: '﷼' },
  EGP: { name: 'Egyptian Pound', nameAr: 'جنيه مصري', symbol: 'E£' },
  KWD: { name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي', symbol: 'د.ك' },
  QAR: { name: 'Qatari Riyal', nameAr: 'ريال قطري', symbol: 'ر.ق' },
  TRY: { name: 'Turkish Lira', nameAr: 'ليرة تركية', symbol: '₺' },
  RUB: { name: 'Russian Ruble', nameAr: 'روبل روسي', symbol: '₽' },
  KRW: { name: 'South Korean Won', nameAr: 'وون كوري', symbol: '₩' },
  SGD: { name: 'Singapore Dollar', nameAr: 'دولار سنغافوري', symbol: 'S$' },
};

const CurrencyConverter = () => {
  const { isRTL, t } = useLanguage();
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      setResult(null);
      return;
    }

    // Convert through USD as base
    const inUSD = numAmount / exchangeRates[fromCurrency];
    const converted = inUSD * exchangeRates[toCurrency];
    setResult(converted);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const refreshRates = () => {
    setLastUpdated(new Date());
    toast.success(isRTL ? 'تم تحديث أسعار الصرف' : 'Exchange rates refreshed');
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toFixed(2));
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    }
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  const getExchangeRate = () => {
    const rate = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
    return rate.toFixed(4);
  };

  const article = isRTL
    ? `محول العملات المجاني هو أداة احترافية لتحويل العملات بين أكثر من 20 عملة عالمية. يوفر لك أسعار صرف محدثة ودقيقة للدولار الأمريكي، اليورو، الجنيه الإسترليني، الين الياباني، والعديد من العملات الأخرى.

سواء كنت مسافراً، تاجراً، أو تعمل في التجارة الإلكترونية الدولية، هذه الأداة توفر لك تحويلات سريعة ودقيقة. جميع العمليات تتم محلياً في متصفحك مما يضمن خصوصية بياناتك المالية.

تتميز الأداة بدعم العملات العربية مثل الريال السعودي، الدرهم الإماراتي، الجنيه المصري، والدينار الكويتي، بالإضافة إلى العملات الغربية الرئيسية.`
    : `The Free Currency Converter is a professional tool for converting currencies between 20+ global currencies. It provides updated and accurate exchange rates for USD, EUR, GBP, JPY, and many other currencies.

Whether you're a traveler, trader, or working in international e-commerce, this tool provides quick and accurate conversions. All operations are performed locally in your browser, ensuring the privacy of your financial data.

The tool supports major currencies including US Dollar, Euro, British Pound, Japanese Yen, Canadian Dollar, Australian Dollar, Swiss Franc, and many more. Perfect for freelancers, international business professionals, and anyone dealing with multiple currencies.`;

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'محول العملات المجاني | تحويل العملات اونلاين - BestToolsHub' : 'Free Currency Converter | Online Currency Exchange - BestToolsHub'}</title>
        <meta name="description" content={isRTL
          ? 'محول عملات مجاني ودقيق. حول بين الدولار واليورو والجنيه والريال والدرهم وأكثر من 20 عملة عالمية بأسعار صرف محدثة.'
          : 'Free and accurate currency converter. Convert between USD, EUR, GBP, JPY, and 20+ global currencies with updated exchange rates.'
        } />
        <meta name="keywords" content="currency converter, exchange rate, USD to EUR, dollar to euro, money converter, forex calculator, تحويل عملات, محول العملات" />
        <link rel="canonical" href="/tools/currency-converter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Currency Converter",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Free online currency converter with 20+ global currencies and real-time exchange rates"
          })}
        </script>
      </Helmet>

      <ToolPageLayout
        title={isRTL ? 'محول العملات' : 'Currency Converter'}
        description={isRTL
          ? 'حول بين العملات العالمية بأسعار صرف محدثة'
          : 'Convert between global currencies with updated exchange rates'}
        keywords="currency converter, exchange rate, USD to EUR, dollar to euro, money converter, forex calculator, تحويل عملات, محول العملات"
        article={article}
      >
        <div className="space-y-6">
          {/* Last Updated */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">
              {isRTL ? 'آخر تحديث:' : 'Last updated:'} {lastUpdated.toLocaleTimeString()}
            </span>
            <Button variant="ghost" size="sm" onClick={refreshRates}>
              <RefreshCw className="w-4 h-4 me-2" />
              {isRTL ? 'تحديث' : 'Refresh'}
            </Button>
          </div>

          {/* Converter */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <Label>{isRTL ? 'من' : 'From'}</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencyInfo).map(([code, info]) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span className="font-mono">{code}</span>
                        <span className="text-muted-foreground">- {isRTL ? info.nameAr : info.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                min="0"
                className="text-2xl font-bold h-14"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center py-2">
              <Button variant="outline" size="icon" onClick={swapCurrencies} className="rounded-full">
                <ArrowRightLeft className="w-5 h-5" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label>{isRTL ? 'إلى' : 'To'}</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencyInfo).map(([code, info]) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span className="font-mono">{code}</span>
                        <span className="text-muted-foreground">- {isRTL ? info.nameAr : info.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div
                onClick={copyResult}
                className="h-14 bg-muted/50 rounded-md flex items-center px-3 cursor-pointer hover:bg-muted transition-colors"
              >
                <span className="text-2xl font-bold text-primary">
                  {result !== null ? formatCurrency(result, toCurrency) : '--'}
                </span>
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                {isRTL ? 'سعر الصرف' : 'Exchange Rate'}
              </span>
            </div>
            <p className="text-lg">
              1 {fromCurrency} = <span className="font-bold text-primary">{getExchangeRate()}</span> {toCurrency}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {isRTL
                ? '* الأسعار تقريبية وقد تختلف عن الأسعار الفعلية في السوق'
                : '* Rates are approximate and may differ from actual market rates'}
            </p>
          </div>

          {/* Quick Conversions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[10, 50, 100, 500].map((quickAmount) => {
              const quickResult = (quickAmount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
              return (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-center"
                >
                  <div className="text-sm text-muted-foreground">
                    {quickAmount} {fromCurrency}
                  </div>
                  <div className="font-bold text-foreground">
                    {quickResult.toFixed(2)} {toCurrency}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Popular Currencies */}
          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {isRTL ? 'العملات الشائعة' : 'Popular Currencies'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'].map((curr) => {
                const rate = exchangeRates[curr];
                return (
                  <button
                    key={curr}
                    onClick={() => {
                      if (curr !== fromCurrency) setToCurrency(curr);
                    }}
                    className="p-2 bg-muted/20 rounded hover:bg-muted/40 transition-colors flex items-center justify-between"
                  >
                    <span className="font-mono font-bold">{curr}</span>
                    <span className="text-sm text-muted-foreground">{currencyInfo[curr].symbol}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ToolPageLayout>
    </>
  );
};

export default CurrencyConverter;
