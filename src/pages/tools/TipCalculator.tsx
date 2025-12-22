import { useState, useMemo } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';

const TipCalculator = () => {
  const { isRTL } = useLanguage();
  const [billAmount, setBillAmount] = useState<string>('100');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');

  const tipPresets = [10, 15, 18, 20, 25];

  const calculations = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    
    const tipAmount = bill * (tipPercentage / 100);
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / people;
    const totalPerPerson = totalAmount / people;

    return {
      tipAmount,
      totalAmount,
      tipPerPerson,
      totalPerPerson
    };
  }, [billAmount, tipPercentage, numberOfPeople]);

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'حاسبة الإكرامية' : 'Tip Calculator'}
      description={isRTL 
        ? 'احسب الإكرامية والمبلغ الإجمالي بسهولة مع تقسيم الفاتورة'
        : 'Easily calculate tip and total amount with bill splitting'}
      keywords="tip calculator, gratuity calculator, bill splitter, restaurant tip"
      article={isRTL 
        ? 'حاسبة الإكرامية تساعدك على حساب قيمة الإكرامية المناسبة في المطاعم والمقاهي. أدخل قيمة الفاتورة واختر نسبة الإكرامية، ويمكنك أيضاً تقسيم الفاتورة على عدة أشخاص.'
        : 'The tip calculator helps you calculate the appropriate tip amount at restaurants and cafes. Enter the bill amount and choose a tip percentage, and you can also split the bill among multiple people.'}
    >
      <div className="max-w-xl mx-auto space-y-8">
        {/* Bill Amount */}
        <div className="space-y-3">
          <Label className="text-lg">{isRTL ? 'قيمة الفاتورة' : 'Bill Amount'}</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
              $
            </span>
            <Input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="text-2xl h-14 pl-10"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Tip Percentage */}
        <div className="space-y-3">
          <Label className="text-lg">
            {isRTL ? 'نسبة الإكرامية' : 'Tip Percentage'}: {tipPercentage}%
          </Label>
          <div className="flex flex-wrap gap-2">
            {tipPresets.map((preset) => (
              <Button
                key={preset}
                variant={tipPercentage === preset ? 'default' : 'outline'}
                onClick={() => setTipPercentage(preset)}
                className="flex-1 min-w-[60px]"
              >
                {preset}%
              </Button>
            ))}
          </div>
          <Input
            type="range"
            min="0"
            max="50"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(parseInt(e.target.value))}
            className="w-full h-2 accent-primary"
          />
        </div>

        {/* Number of People */}
        <div className="space-y-3">
          <Label className="text-lg">{isRTL ? 'عدد الأشخاص' : 'Number of People'}</Label>
          <Input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            className="text-xl h-14"
          />
        </div>

        {/* Results */}
        <div className="glass-card p-6 rounded-xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-1">
                {isRTL ? 'قيمة الإكرامية' : 'Tip Amount'}
              </p>
              <p className="text-3xl font-bold text-primary">
                ${formatCurrency(calculations.tipAmount)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">
                {isRTL ? 'المجموع الكلي' : 'Total Amount'}
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${formatCurrency(calculations.totalAmount)}
              </p>
            </div>
          </div>

          {parseInt(numberOfPeople) > 1 && (
            <>
              <hr className="border-border" />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-1">
                    {isRTL ? 'الإكرامية لكل شخص' : 'Tip per Person'}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${formatCurrency(calculations.tipPerPerson)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    {isRTL ? 'المجموع لكل شخص' : 'Total per Person'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ${formatCurrency(calculations.totalPerPerson)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Tips Table */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-bold text-lg text-foreground mb-4">
            {isRTL ? 'جدول سريع للإكراميات' : 'Quick Tip Reference'}
          </h3>
          <div className="space-y-2">
            {[10, 15, 18, 20, 25].map((percent) => {
              const bill = parseFloat(billAmount) || 0;
              const tip = bill * (percent / 100);
              return (
                <div key={percent} className="flex justify-between text-muted-foreground">
                  <span>{percent}%</span>
                  <span>${formatCurrency(tip)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TipCalculator;
