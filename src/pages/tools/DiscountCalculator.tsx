import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, Percent, DollarSign, ShoppingCart, Calculator, TrendingDown, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { toast } from 'sonner';

const DiscountCalculator = () => {
  const { isRTL, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Discount Calculator
  const [originalPrice, setOriginalPrice] = useState<string>('100');
  const [discountPercent, setDiscountPercent] = useState<string>('20');
  const [discountResult, setDiscountResult] = useState({ savings: 0, finalPrice: 0 });

  // Reverse Calculator (Find discount %)
  const [originalForReverse, setOriginalForReverse] = useState<string>('100');
  const [salePrice, setSalePrice] = useState<string>('80');
  const [reverseResult, setReverseResult] = useState({ discountPercent: 0, savings: 0 });

  // Double Discount
  const [doubleOriginal, setDoubleOriginal] = useState<string>('100');
  const [firstDiscount, setFirstDiscount] = useState<string>('20');
  const [secondDiscount, setSecondDiscount] = useState<string>('10');
  const [doubleResult, setDoubleResult] = useState({ afterFirst: 0, afterSecond: 0, totalSavings: 0, effectiveDiscount: 0 });

  // Tax Calculator
  const [priceBeforeTax, setPriceBeforeTax] = useState<string>('100');
  const [taxRate, setTaxRate] = useState<string>('15');
  const [taxResult, setTaxResult] = useState({ taxAmount: 0, finalPrice: 0 });

  // Calculate Discount
  useEffect(() => {
    const price = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountPercent) || 0;
    const savings = (price * discount) / 100;
    const finalPrice = price - savings;
    setDiscountResult({ savings, finalPrice });
  }, [originalPrice, discountPercent]);

  // Calculate Reverse
  useEffect(() => {
    const original = parseFloat(originalForReverse) || 0;
    const sale = parseFloat(salePrice) || 0;
    const savings = original - sale;
    const discountPercent = original > 0 ? (savings / original) * 100 : 0;
    setReverseResult({ discountPercent, savings });
  }, [originalForReverse, salePrice]);

  // Calculate Double Discount
  useEffect(() => {
    const original = parseFloat(doubleOriginal) || 0;
    const first = parseFloat(firstDiscount) || 0;
    const second = parseFloat(secondDiscount) || 0;
    
    const afterFirst = original * (1 - first / 100);
    const afterSecond = afterFirst * (1 - second / 100);
    const totalSavings = original - afterSecond;
    const effectiveDiscount = original > 0 ? (totalSavings / original) * 100 : 0;
    
    setDoubleResult({ afterFirst, afterSecond, totalSavings, effectiveDiscount });
  }, [doubleOriginal, firstDiscount, secondDiscount]);

  // Calculate Tax
  useEffect(() => {
    const price = parseFloat(priceBeforeTax) || 0;
    const tax = parseFloat(taxRate) || 0;
    const taxAmount = (price * tax) / 100;
    const finalPrice = price + taxAmount;
    setTaxResult({ taxAmount, finalPrice });
  }, [priceBeforeTax, taxRate]);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString(isRTL ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const article = isRTL
    ? `حاسبة الخصومات المجانية هي أداة شاملة لحساب الخصومات والتخفيضات على المشتريات. تساعدك في معرفة السعر النهائي بعد الخصم، حساب نسبة الخصم، وحساب الخصومات المتعددة.

سواء كنت متسوقاً تبحث عن أفضل العروض، صاحب متجر يريد حساب الأسعار، أو محاسباً يحتاج لحسابات دقيقة، هذه الأداة توفر لك كل ما تحتاجه.

تتضمن الأداة حاسبة الضريبة (VAT) لحساب المبلغ الإجمالي مع الضريبة المضافة، مما يجعلها مثالية للتجار وأصحاب الأعمال في دول الخليج وحول العالم.`
    : `The Free Discount Calculator is a comprehensive tool for calculating discounts and savings on purchases. It helps you find the final price after discount, calculate discount percentages, and handle multiple discounts.

Whether you're a shopper looking for the best deals, a store owner calculating prices, or an accountant needing accurate calculations, this tool provides everything you need.

The tool includes a Tax (VAT) calculator to compute the total amount with added tax, making it perfect for merchants and business owners worldwide. All calculations are performed locally in your browser for maximum privacy and speed.`;

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'حاسبة الخصومات المجانية | احسب التخفيضات والضرائب - BestToolsHub' : 'Free Discount Calculator | Calculate Discounts & Tax - BestToolsHub'}</title>
        <meta name="description" content={isRTL
          ? 'حاسبة خصومات مجانية ودقيقة. احسب نسبة الخصم، السعر بعد الخصم، الخصومات المتعددة، والضريبة المضافة VAT بسهولة.'
          : 'Free and accurate discount calculator. Calculate discount percentage, price after discount, multiple discounts, and VAT easily.'
        } />
        <meta name="keywords" content="discount calculator, percentage off, sale price calculator, VAT calculator, tax calculator, حاسبة الخصم, حاسبة التخفيض" />
        <link rel="canonical" href="/tools/discount-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Discount Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Free online discount and tax calculator for shopping, business, and accounting"
          })}
        </script>
      </Helmet>

      <ToolPageLayout
        title={isRTL ? 'حاسبة الخصومات' : 'Discount Calculator'}
        description={isRTL
          ? 'احسب الخصومات والتخفيضات والضرائب بسهولة'
          : 'Calculate discounts, savings, and taxes easily'}
        keywords="discount calculator, percentage off, sale price calculator, VAT calculator, tax calculator, حاسبة الخصم, حاسبة التخفيض"
        article={article}
      >
        <Tabs defaultValue="discount" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="discount" className="text-xs sm:text-sm">
              <Percent className="w-4 h-4 me-1 hidden sm:inline" />
              {isRTL ? 'خصم' : 'Discount'}
            </TabsTrigger>
            <TabsTrigger value="reverse" className="text-xs sm:text-sm">
              <TrendingDown className="w-4 h-4 me-1 hidden sm:inline" />
              {isRTL ? 'عكسي' : 'Reverse'}
            </TabsTrigger>
            <TabsTrigger value="double" className="text-xs sm:text-sm">
              <ShoppingCart className="w-4 h-4 me-1 hidden sm:inline" />
              {isRTL ? 'مزدوج' : 'Double'}
            </TabsTrigger>
            <TabsTrigger value="tax" className="text-xs sm:text-sm">
              <DollarSign className="w-4 h-4 me-1 hidden sm:inline" />
              {isRTL ? 'ضريبة' : 'Tax'}
            </TabsTrigger>
          </TabsList>

          {/* Discount Calculator */}
          <TabsContent value="discount" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'السعر الأصلي' : 'Original Price'}</Label>
                <div className="relative">
                  <DollarSign className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="ps-9"
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'نسبة الخصم (%)' : 'Discount (%)'}</Label>
                <div className="relative">
                  <Percent className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="ps-9"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Quick Discount Buttons */}
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15, 20, 25, 30, 40, 50, 70].map((percent) => (
                <Button
                  key={percent}
                  variant={discountPercent === percent.toString() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDiscountPercent(percent.toString())}
                >
                  {percent}%
                </Button>
              ))}
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'التوفير' : 'You Save'}</div>
                <div className="text-2xl font-bold text-red-500">
                  {formatCurrency(discountResult.savings)}
                </div>
              </div>
              <div 
                className="p-4 bg-green-500/10 rounded-lg cursor-pointer hover:bg-green-500/20 transition-colors"
                onClick={() => copyToClipboard(formatCurrency(discountResult.finalPrice))}
              >
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  {isRTL ? 'السعر النهائي' : 'Final Price'}
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
                <div className="text-2xl font-bold text-green-500">
                  {formatCurrency(discountResult.finalPrice)}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reverse Calculator */}
          <TabsContent value="reverse" className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {isRTL 
                ? 'اكتشف نسبة الخصم من السعر الأصلي وسعر البيع'
                : 'Find out the discount percentage from original and sale price'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'السعر الأصلي' : 'Original Price'}</Label>
                <Input
                  type="number"
                  value={originalForReverse}
                  onChange={(e) => setOriginalForReverse(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'سعر البيع' : 'Sale Price'}</Label>
                <Input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'نسبة الخصم' : 'Discount Percentage'}</div>
                <div className="text-2xl font-bold text-primary">
                  {reverseResult.discountPercent.toFixed(1)}%
                </div>
              </div>
              <div className="p-4 bg-red-500/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'المبلغ الموفر' : 'Amount Saved'}</div>
                <div className="text-2xl font-bold text-red-500">
                  {formatCurrency(reverseResult.savings)}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Double Discount */}
          <TabsContent value="double" className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {isRTL 
                ? 'احسب الخصومات المتتالية (مثل خصم 20% + 10% إضافية)'
                : 'Calculate stacked discounts (e.g., 20% off + extra 10% off)'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'السعر الأصلي' : 'Original Price'}</Label>
                <Input
                  type="number"
                  value={doubleOriginal}
                  onChange={(e) => setDoubleOriginal(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'الخصم الأول (%)' : 'First Discount (%)'}</Label>
                <Input
                  type="number"
                  value={firstDiscount}
                  onChange={(e) => setFirstDiscount(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'الخصم الثاني (%)' : 'Second Discount (%)'}</Label>
                <Input
                  type="number"
                  value={secondDiscount}
                  onChange={(e) => setSecondDiscount(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground">{isRTL ? 'بعد الخصم الأول' : 'After 1st'}</div>
                <div className="font-bold">{formatCurrency(doubleResult.afterFirst)}</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <div className="text-xs text-muted-foreground">{isRTL ? 'السعر النهائي' : 'Final Price'}</div>
                <div className="font-bold text-green-500">{formatCurrency(doubleResult.afterSecond)}</div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg">
                <div className="text-xs text-muted-foreground">{isRTL ? 'إجمالي التوفير' : 'Total Savings'}</div>
                <div className="font-bold text-red-500">{formatCurrency(doubleResult.totalSavings)}</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="text-xs text-muted-foreground">{isRTL ? 'الخصم الفعلي' : 'Effective %'}</div>
                <div className="font-bold text-primary">{doubleResult.effectiveDiscount.toFixed(1)}%</div>
              </div>
            </div>
          </TabsContent>

          {/* Tax Calculator */}
          <TabsContent value="tax" className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {isRTL 
                ? 'احسب الضريبة المضافة (VAT) على المشتريات'
                : 'Calculate Value Added Tax (VAT) on purchases'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'السعر قبل الضريبة' : 'Price Before Tax'}</Label>
                <Input
                  type="number"
                  value={priceBeforeTax}
                  onChange={(e) => setPriceBeforeTax(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'نسبة الضريبة (%)' : 'Tax Rate (%)'}</Label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            {/* Quick Tax Rates */}
            <div className="flex flex-wrap gap-2">
              {[5, 7, 10, 13, 15, 19, 20, 21, 25].map((rate) => (
                <Button
                  key={rate}
                  variant={taxRate === rate.toString() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTaxRate(rate.toString())}
                >
                  {rate}% {rate === 15 && (isRTL ? '(السعودية)' : '(SA)')}
                  {rate === 5 && (isRTL ? '(الإمارات)' : '(UAE)')}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-orange-500/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'مبلغ الضريبة' : 'Tax Amount'}</div>
                <div className="text-2xl font-bold text-orange-500">
                  {formatCurrency(taxResult.taxAmount)}
                </div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'المجموع مع الضريبة' : 'Total with Tax'}</div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(taxResult.finalPrice)}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ToolPageLayout>
    </>
  );
};

export default DiscountCalculator;
