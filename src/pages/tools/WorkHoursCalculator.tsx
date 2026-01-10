import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/i18n';
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  Percent, 
  Briefcase,
  TrendingUp,
  PiggyBank,
  CalendarDays
} from 'lucide-react';

interface CalculationResult {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const WorkHoursCalculator = () => {
  const { t, isRTL } = useLanguage();

  // Tab 1: Hourly Rate Calculator
  const [totalIncome, setTotalIncome] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [hourlyResult, setHourlyResult] = useState<CalculationResult[]>([]);

  // Tab 2: Income Calculator
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [incomeResult, setIncomeResult] = useState<CalculationResult[]>([]);

  // Tab 3: Tax Calculator
  const [grossIncome, setGrossIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [taxResult, setTaxResult] = useState<CalculationResult[]>([]);

  // Tab 4: Freelance Project Calculator
  const [projectHours, setProjectHours] = useState('');
  const [projectRate, setProjectRate] = useState('');
  const [projectExpenses, setProjectExpenses] = useState('');
  const [projectTaxRate, setProjectTaxRate] = useState('15');
  const [projectResult, setProjectResult] = useState<CalculationResult[]>([]);

  // Calculate Hourly Rate
  const calculateHourlyRate = () => {
    const income = parseFloat(totalIncome);
    const hours = parseFloat(totalHours);
    
    if (isNaN(income) || isNaN(hours) || hours === 0) {
      setHourlyResult([]);
      return;
    }

    const rate = income / hours;
    const dailyRate = rate * 8; // 8-hour workday
    const weeklyRate = rate * 40; // 40-hour week
    const monthlyRate = rate * 160; // 160 hours/month

    setHourlyResult([
      {
        label: isRTL ? 'سعر الساعة' : 'Hourly Rate',
        value: `$${rate.toFixed(2)}`,
        icon: <Clock className="w-5 h-5" />,
        highlight: true,
      },
      {
        label: isRTL ? 'الدخل اليومي (8 ساعات)' : 'Daily Income (8 hrs)',
        value: `$${dailyRate.toFixed(2)}`,
        icon: <CalendarDays className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'الدخل الأسبوعي (40 ساعة)' : 'Weekly Income (40 hrs)',
        value: `$${weeklyRate.toFixed(2)}`,
        icon: <TrendingUp className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'الدخل الشهري (160 ساعة)' : 'Monthly Income (160 hrs)',
        value: `$${monthlyRate.toFixed(2)}`,
        icon: <PiggyBank className="w-5 h-5" />,
      },
    ]);
  };

  // Calculate Income from Hours
  const calculateIncome = () => {
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursWorked);
    
    if (isNaN(rate) || isNaN(hours)) {
      setIncomeResult([]);
      return;
    }

    const gross = rate * hours;
    const overtime = hours > 40 ? (hours - 40) * rate * 0.5 : 0; // 1.5x after 40 hrs
    const totalWithOvertime = gross + overtime;

    setIncomeResult([
      {
        label: isRTL ? 'الدخل الإجمالي' : 'Gross Income',
        value: `$${gross.toFixed(2)}`,
        icon: <DollarSign className="w-5 h-5" />,
        highlight: true,
      },
      {
        label: isRTL ? 'مكافأة الوقت الإضافي (1.5x بعد 40 ساعة)' : 'Overtime Bonus (1.5x after 40 hrs)',
        value: `$${overtime.toFixed(2)}`,
        icon: <TrendingUp className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'إجمالي مع الوقت الإضافي' : 'Total with Overtime',
        value: `$${totalWithOvertime.toFixed(2)}`,
        icon: <PiggyBank className="w-5 h-5" />,
      },
    ]);
  };

  // Calculate Tax
  const calculateTax = () => {
    const income = parseFloat(grossIncome);
    const rate = parseFloat(taxRate);
    
    if (isNaN(income) || isNaN(rate)) {
      setTaxResult([]);
      return;
    }

    const taxAmount = income * (rate / 100);
    const netIncome = income - taxAmount;
    const effectiveRate = (taxAmount / income) * 100;

    setTaxResult([
      {
        label: isRTL ? 'مبلغ الضريبة' : 'Tax Amount',
        value: `$${taxAmount.toFixed(2)}`,
        icon: <Percent className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'صافي الدخل بعد الضريبة' : 'Net Income After Tax',
        value: `$${netIncome.toFixed(2)}`,
        icon: <DollarSign className="w-5 h-5" />,
        highlight: true,
      },
      {
        label: isRTL ? 'النسبة الفعلية' : 'Effective Rate',
        value: `${effectiveRate.toFixed(1)}%`,
        icon: <TrendingUp className="w-5 h-5" />,
      },
    ]);
  };

  // Calculate Freelance Project
  const calculateProject = () => {
    const hours = parseFloat(projectHours);
    const rate = parseFloat(projectRate);
    const expenses = parseFloat(projectExpenses) || 0;
    const tax = parseFloat(projectTaxRate) || 0;
    
    if (isNaN(hours) || isNaN(rate)) {
      setProjectResult([]);
      return;
    }

    const grossRevenue = hours * rate;
    const taxAmount = grossRevenue * (tax / 100);
    const netBeforeExpenses = grossRevenue - taxAmount;
    const profit = netBeforeExpenses - expenses;
    const effectiveHourlyRate = profit / hours;

    setProjectResult([
      {
        label: isRTL ? 'إجمالي الإيرادات' : 'Gross Revenue',
        value: `$${grossRevenue.toFixed(2)}`,
        icon: <DollarSign className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'الضريبة المستحقة' : 'Tax Due',
        value: `$${taxAmount.toFixed(2)}`,
        icon: <Percent className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'المصاريف' : 'Expenses',
        value: `$${expenses.toFixed(2)}`,
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        label: isRTL ? 'صافي الربح' : 'Net Profit',
        value: `$${profit.toFixed(2)}`,
        icon: <PiggyBank className="w-5 h-5" />,
        highlight: true,
      },
      {
        label: isRTL ? 'سعر الساعة الفعلي' : 'Effective Hourly Rate',
        value: `$${effectiveHourlyRate.toFixed(2)}`,
        icon: <Clock className="w-5 h-5" />,
      },
    ]);
  };

  const ResultCard = ({ results }: { results: CalculationResult[] }) => (
    <div className="grid gap-3 mt-6">
      {results.map((result, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 rounded-xl transition-all ${
            result.highlight 
              ? 'bg-primary/10 border-2 border-primary' 
              : 'bg-muted/50 border border-border'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${result.highlight ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
              {result.icon}
            </div>
            <span className={`font-medium ${result.highlight ? 'text-primary' : 'text-foreground'}`}>
              {result.label}
            </span>
          </div>
          <span className={`text-xl font-bold tabular-nums ${result.highlight ? 'text-primary' : 'text-foreground'}`}>
            {result.value}
          </span>
        </div>
      ))}
    </div>
  );

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isRTL ? "حاسبة ساعات العمل والدخل" : "Work Hours & Income Calculator",
    "description": isRTL 
      ? "حاسبة مجانية لحساب سعر الساعة، الدخل من العمل، والضرائب للموظفين والمستقلين"
      : "Free calculator to compute hourly rates, work income, and taxes for employees and freelancers",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const seoArticle = isRTL 
    ? `حاسبة ساعات العمل والدخل هي أداة مجانية شاملة صممت خصيصاً للموظفين والمستقلين وأصحاب الأعمال الحرة. تتيح لك حساب سعر الساعة، الدخل الإجمالي، الضرائب المستحقة، وأرباح المشاريع الحرة بسهولة ودقة.

ما الذي يمكنك حسابه؟
- سعر الساعة: أدخل إجمالي دخلك وساعات عملك لمعرفة قيمة ساعة عملك الفعلية.
- الدخل من الساعات: احسب إجمالي دخلك بناءً على سعر الساعة وعدد ساعات العمل، مع حساب الوقت الإضافي.
- الضرائب: اعرف مقدار الضريبة المستحقة وصافي دخلك بعد الخصم.
- أرباح المشاريع الحرة: احسب أرباحك الفعلية من المشاريع بعد خصم الضرائب والمصاريف.

لماذا تستخدم هذه الحاسبة؟
سواء كنت موظفاً تريد معرفة قيمة وقتك الحقيقية، أو مستقلاً يحتاج لتسعير خدماته بشكل صحيح، أو صاحب عمل حر يريد حساب أرباحه الفعلية - هذه الأداة توفر لك كل ما تحتاجه في مكان واحد.`
    : `The Work Hours & Income Calculator is a comprehensive free tool designed specifically for employees, freelancers, and business owners. It allows you to easily and accurately calculate hourly rates, gross income, taxes due, and freelance project profits.

What Can You Calculate?
- Hourly Rate: Enter your total income and hours worked to find your actual hourly value.
- Income from Hours: Calculate your total income based on hourly rate and hours worked, including overtime.
- Taxes: Know how much tax is due and your net income after deductions.
- Freelance Project Profits: Calculate your actual project profits after taxes and expenses.

Why Use This Calculator?
Whether you're an employee wanting to know your real time value, a freelancer needing to price services correctly, or a business owner wanting to calculate actual profits - this tool provides everything you need in one place.`;

  const seoKeywords = isRTL 
    ? 'حاسبة ساعات العمل, حساب سعر الساعة, حاسبة الدخل, حاسبة الضرائب, حساب أرباح المشاريع, حاسبة المستقلين'
    : 'work hours calculator, hourly rate calculator, income calculator, tax calculator, freelance calculator, project profit calculator';

  return (
    <ToolPageLayout
      title={isRTL ? 'حاسبة ساعات العمل والدخل' : 'Work Hours & Income Calculator'}
      description={isRTL 
        ? 'احسب سعر الساعة، الدخل، الضرائب، وأرباح مشاريعك بسهولة'
        : 'Calculate hourly rates, income, taxes, and project profits easily'
      }
      article={seoArticle}
      keywords={seoKeywords}
    >
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="hourly" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
              <TabsTrigger 
                value="hourly" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'سعر الساعة' : 'Hourly Rate'}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="income" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
              >
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'الدخل' : 'Income'}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tax" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
              >
                <Percent className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'الضريبة' : 'Tax'}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="freelance" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
              >
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'مشروع حر' : 'Freelance'}</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Hourly Rate Calculator */}
            <TabsContent value="hourly" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {isRTL ? 'حساب سعر الساعة' : 'Calculate Hourly Rate'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {isRTL 
                      ? 'أدخل إجمالي الدخل وعدد ساعات العمل لمعرفة سعر الساعة'
                      : 'Enter your total income and hours worked to find your hourly rate'
                    }
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="totalIncome">
                        {isRTL ? 'إجمالي الدخل ($)' : 'Total Income ($)'}
                      </Label>
                      <Input
                        id="totalIncome"
                        type="number"
                        placeholder="5000"
                        value={totalIncome}
                        onChange={(e) => setTotalIncome(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalHours">
                        {isRTL ? 'عدد الساعات' : 'Hours Worked'}
                      </Label>
                      <Input
                        id="totalHours"
                        type="number"
                        placeholder="160"
                        value={totalHours}
                        onChange={(e) => setTotalHours(e.target.value)}
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateHourlyRate} className="w-full">
                    <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'احسب سعر الساعة' : 'Calculate Hourly Rate'}
                  </Button>

                  {hourlyResult.length > 0 && <ResultCard results={hourlyResult} />}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Income Calculator */}
            <TabsContent value="income" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    {isRTL ? 'حساب الدخل من الساعات' : 'Calculate Income from Hours'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {isRTL 
                      ? 'أدخل سعر الساعة وعدد ساعات العمل لحساب إجمالي الدخل'
                      : 'Enter your hourly rate and hours worked to calculate total income'
                    }
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">
                        {isRTL ? 'سعر الساعة ($)' : 'Hourly Rate ($)'}
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="25"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hoursWorked">
                        {isRTL ? 'عدد الساعات' : 'Hours Worked'}
                      </Label>
                      <Input
                        id="hoursWorked"
                        type="number"
                        placeholder="45"
                        value={hoursWorked}
                        onChange={(e) => setHoursWorked(e.target.value)}
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateIncome} className="w-full">
                    <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'احسب الدخل' : 'Calculate Income'}
                  </Button>

                  {incomeResult.length > 0 && <ResultCard results={incomeResult} />}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 3: Tax Calculator */}
            <TabsContent value="tax" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-primary" />
                    {isRTL ? 'حساب الضريبة' : 'Tax Calculator'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {isRTL 
                      ? 'أدخل الدخل الإجمالي ونسبة الضريبة لحساب صافي الدخل'
                      : 'Enter gross income and tax rate to calculate net income'
                    }
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="grossIncome">
                        {isRTL ? 'الدخل الإجمالي ($)' : 'Gross Income ($)'}
                      </Label>
                      <Input
                        id="grossIncome"
                        type="number"
                        placeholder="5000"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">
                        {isRTL ? 'نسبة الضريبة (%)' : 'Tax Rate (%)'}
                      </Label>
                      <Input
                        id="taxRate"
                        type="number"
                        placeholder="22"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateTax} className="w-full">
                    <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'احسب الضريبة' : 'Calculate Tax'}
                  </Button>

                  {taxResult.length > 0 && <ResultCard results={taxResult} />}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 4: Freelance Project Calculator */}
            <TabsContent value="freelance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    {isRTL ? 'حاسبة المشاريع الحرة' : 'Freelance Project Calculator'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {isRTL 
                      ? 'احسب أرباحك من المشاريع الحرة بعد خصم الضرائب والمصاريف'
                      : 'Calculate your freelance project profits after taxes and expenses'
                    }
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="projectHours">
                        {isRTL ? 'ساعات المشروع' : 'Project Hours'}
                      </Label>
                      <Input
                        id="projectHours"
                        type="number"
                        placeholder="40"
                        value={projectHours}
                        onChange={(e) => setProjectHours(e.target.value)}
                        min="0"
                        step="0.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectRate">
                        {isRTL ? 'سعر الساعة ($)' : 'Hourly Rate ($)'}
                      </Label>
                      <Input
                        id="projectRate"
                        type="number"
                        placeholder="50"
                        value={projectRate}
                        onChange={(e) => setProjectRate(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectExpenses">
                        {isRTL ? 'المصاريف ($)' : 'Expenses ($)'}
                      </Label>
                      <Input
                        id="projectExpenses"
                        type="number"
                        placeholder="100"
                        value={projectExpenses}
                        onChange={(e) => setProjectExpenses(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectTaxRate">
                        {isRTL ? 'نسبة الضريبة (%)' : 'Tax Rate (%)'}
                      </Label>
                      <Input
                        id="projectTaxRate"
                        type="number"
                        placeholder="15"
                        value={projectTaxRate}
                        onChange={(e) => setProjectTaxRate(e.target.value)}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateProject} className="w-full">
                    <Calculator className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'احسب ربح المشروع' : 'Calculate Project Profit'}
                  </Button>

                  {projectResult.length > 0 && <ResultCard results={projectResult} />}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* SEO Article Content */}
          <article className="mt-12 prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
            <h2>{isRTL ? 'حاسبة ساعات العمل والدخل الشاملة' : 'Comprehensive Work Hours & Income Calculator'}</h2>
            
            <p>
              {isRTL 
                ? 'حاسبة ساعات العمل والدخل هي أداة مجانية شاملة صممت خصيصاً للموظفين والمستقلين وأصحاب الأعمال الحرة. تتيح لك حساب سعر الساعة، الدخل الإجمالي، الضرائب المستحقة، وأرباح المشاريع الحرة بسهولة ودقة.'
                : 'The Work Hours & Income Calculator is a comprehensive free tool designed specifically for employees, freelancers, and business owners. It allows you to easily and accurately calculate hourly rates, gross income, taxes due, and freelance project profits.'
              }
            </p>

            <h3>{isRTL ? 'ما الذي يمكنك حسابه؟' : 'What Can You Calculate?'}</h3>
            
            <ul>
              <li>
                <strong>{isRTL ? 'سعر الساعة:' : 'Hourly Rate:'}</strong>{' '}
                {isRTL 
                  ? 'أدخل إجمالي دخلك وساعات عملك لمعرفة قيمة ساعة عملك الفعلية.'
                  : 'Enter your total income and hours worked to find your actual hourly value.'
                }
              </li>
              <li>
                <strong>{isRTL ? 'الدخل من الساعات:' : 'Income from Hours:'}</strong>{' '}
                {isRTL 
                  ? 'احسب إجمالي دخلك بناءً على سعر الساعة وعدد ساعات العمل، مع حساب الوقت الإضافي.'
                  : 'Calculate your total income based on hourly rate and hours worked, including overtime.'
                }
              </li>
              <li>
                <strong>{isRTL ? 'الضرائب:' : 'Taxes:'}</strong>{' '}
                {isRTL 
                  ? 'اعرف مقدار الضريبة المستحقة وصافي دخلك بعد الخصم.'
                  : 'Know how much tax is due and your net income after deductions.'
                }
              </li>
              <li>
                <strong>{isRTL ? 'أرباح المشاريع الحرة:' : 'Freelance Project Profits:'}</strong>{' '}
                {isRTL 
                  ? 'احسب أرباحك الفعلية من المشاريع بعد خصم الضرائب والمصاريف.'
                  : 'Calculate your actual project profits after taxes and expenses.'
                }
              </li>
            </ul>

            <h3>{isRTL ? 'لماذا تستخدم هذه الحاسبة؟' : 'Why Use This Calculator?'}</h3>
            
            <p>
              {isRTL 
                ? 'سواء كنت موظفاً تريد معرفة قيمة وقتك الحقيقية، أو مستقلاً يحتاج لتسعير خدماته بشكل صحيح، أو صاحب عمل حر يريد حساب أرباحه الفعلية - هذه الأداة توفر لك كل ما تحتاجه في مكان واحد.'
                : 'Whether you\'re an employee wanting to know your real time value, a freelancer needing to price services correctly, or a business owner wanting to calculate actual profits - this tool provides everything you need in one place.'
              }
            </p>

            <h3>{isRTL ? 'نصائح للاستخدام الأمثل' : 'Tips for Best Use'}</h3>
            
            <ol>
              <li>
                {isRTL 
                  ? 'عند حساب سعر الساعة، تأكد من تضمين جميع ساعات العمل الفعلية بما في ذلك الوقت الإضافي.'
                  : 'When calculating hourly rate, make sure to include all actual work hours including overtime.'
                }
              </li>
              <li>
                {isRTL 
                  ? 'للمستقلين: لا تنسَ احتساب المصاريف الخفية مثل الأدوات والاشتراكات.'
                  : 'For freelancers: Don\'t forget to account for hidden expenses like tools and subscriptions.'
                }
              </li>
              <li>
                {isRTL 
                  ? 'راجع نسبة الضريبة المطبقة في بلدك للحصول على نتائج دقيقة.'
                  : 'Check the applicable tax rate in your country for accurate results.'
                }
              </li>
            </ol>
          </article>
        </div>
      </ToolPageLayout>
  );
};

export default WorkHoursCalculator;
