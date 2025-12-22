import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator } from 'lucide-react';

const PercentageCalculator = () => {
  const { t, isRTL } = useLanguage();
  
  // Calculator 1: X% of Y
  const [percent1, setPercent1] = useState('');
  const [value1, setValue1] = useState('');
  const [result1, setResult1] = useState<number | null>(null);

  // Calculator 2: X is what % of Y
  const [value2a, setValue2a] = useState('');
  const [value2b, setValue2b] = useState('');
  const [result2, setResult2] = useState<number | null>(null);

  // Calculator 3: Increase/Decrease
  const [value3, setValue3] = useState('');
  const [percent3, setPercent3] = useState('');
  const [result3Increase, setResult3Increase] = useState<number | null>(null);
  const [result3Decrease, setResult3Decrease] = useState<number | null>(null);

  const calculate1 = () => {
    const p = parseFloat(percent1);
    const v = parseFloat(value1);
    if (!isNaN(p) && !isNaN(v)) {
      setResult1((p / 100) * v);
    }
  };

  const calculate2 = () => {
    const a = parseFloat(value2a);
    const b = parseFloat(value2b);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      setResult2((a / b) * 100);
    }
  };

  const calculate3 = () => {
    const v = parseFloat(value3);
    const p = parseFloat(percent3);
    if (!isNaN(v) && !isNaN(p)) {
      setResult3Increase(v + (v * p / 100));
      setResult3Decrease(v - (v * p / 100));
    }
  };

  return (
    <ToolPageLayout
      title={t.tools.percentageCalculator.name}
      description={t.tools.percentageCalculator.description}
      article={t.tools.percentageCalculator.article}
      keywords="percentage calculator, percent, حاسبة النسبة المئوية"
    >
      <div className="space-y-6">
        {/* Calculator 1 */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            {isRTL ? 'ما هو X% من Y؟' : 'What is X% of Y?'}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              type="number"
              value={percent1}
              onChange={(e) => setPercent1(e.target.value)}
              placeholder="%"
              className="w-24"
              dir="ltr"
            />
            <span className="text-muted-foreground">%</span>
            <span className="text-muted-foreground">{isRTL ? 'من' : 'of'}</span>
            <Input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder={isRTL ? 'القيمة' : 'Value'}
              className="w-32"
              dir="ltr"
            />
            <Button onClick={calculate1} size="sm">
              {isRTL ? 'احسب' : 'Calculate'}
            </Button>
          </div>
          {result1 !== null && (
            <p className="text-xl font-bold text-primary">
              = {result1.toFixed(2)}
            </p>
          )}
        </div>

        {/* Calculator 2 */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            {isRTL ? 'X هي كم % من Y؟' : 'X is what % of Y?'}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              type="number"
              value={value2a}
              onChange={(e) => setValue2a(e.target.value)}
              placeholder="X"
              className="w-24"
              dir="ltr"
            />
            <span className="text-muted-foreground">{isRTL ? 'هي كم % من' : 'is what % of'}</span>
            <Input
              type="number"
              value={value2b}
              onChange={(e) => setValue2b(e.target.value)}
              placeholder="Y"
              className="w-24"
              dir="ltr"
            />
            <Button onClick={calculate2} size="sm">
              {isRTL ? 'احسب' : 'Calculate'}
            </Button>
          </div>
          {result2 !== null && (
            <p className="text-xl font-bold text-primary">
              = {result2.toFixed(2)}%
            </p>
          )}
        </div>

        {/* Calculator 3 */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            {isRTL ? 'زيادة / نقصان بنسبة' : 'Increase / Decrease by %'}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              type="number"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              placeholder={isRTL ? 'القيمة' : 'Value'}
              className="w-32"
              dir="ltr"
            />
            <span className="text-muted-foreground">±</span>
            <Input
              type="number"
              value={percent3}
              onChange={(e) => setPercent3(e.target.value)}
              placeholder="%"
              className="w-24"
              dir="ltr"
            />
            <span className="text-muted-foreground">%</span>
            <Button onClick={calculate3} size="sm">
              {isRTL ? 'احسب' : 'Calculate'}
            </Button>
          </div>
          {result3Increase !== null && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{isRTL ? 'بعد الزيادة' : 'After Increase'}</p>
                <p className="text-xl font-bold text-accent">{result3Increase.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{isRTL ? 'بعد النقصان' : 'After Decrease'}</p>
                <p className="text-xl font-bold text-destructive">{result3Decrease?.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PercentageCalculator;
