import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Scale } from 'lucide-react';

const BMICalculator = () => {
  const { t, isRTL } = useLanguage();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const calculate = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    if (unit === 'imperial') {
      // Convert lbs to kg and inches to meters
      w = w * 0.453592;
      h = h * 0.0254;
    } else {
      // Convert cm to meters
      h = h / 100;
    }

    const bmi = w / (h * h);
    
    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = isRTL ? 'نحافة' : 'Underweight';
      color = 'text-blue-500';
    } else if (bmi < 25) {
      category = isRTL ? 'وزن طبيعي' : 'Normal weight';
      color = 'text-green-500';
    } else if (bmi < 30) {
      category = isRTL ? 'وزن زائد' : 'Overweight';
      color = 'text-yellow-500';
    } else {
      category = isRTL ? 'سمنة' : 'Obese';
      color = 'text-red-500';
    }

    setResult({ bmi, category, color });
  };

  const bmiRanges = [
    { range: '< 18.5', label: isRTL ? 'نحافة' : 'Underweight', color: 'bg-blue-500' },
    { range: '18.5 - 24.9', label: isRTL ? 'طبيعي' : 'Normal', color: 'bg-green-500' },
    { range: '25 - 29.9', label: isRTL ? 'زائد' : 'Overweight', color: 'bg-yellow-500' },
    { range: '≥ 30', label: isRTL ? 'سمنة' : 'Obese', color: 'bg-red-500' },
  ];

  return (
    <ToolPageLayout
      title={t.tools.bmiCalculator.name}
      description={t.tools.bmiCalculator.description}
      article={t.tools.bmiCalculator.article}
      keywords="BMI calculator, body mass index, حاسبة مؤشر كتلة الجسم"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Unit Toggle */}
        <div className="flex justify-center gap-2">
          <Button
            variant={unit === 'metric' ? 'default' : 'outline'}
            onClick={() => setUnit('metric')}
          >
            {isRTL ? 'متري (كجم/سم)' : 'Metric (kg/cm)'}
          </Button>
          <Button
            variant={unit === 'imperial' ? 'default' : 'outline'}
            onClick={() => setUnit('imperial')}
          >
            {isRTL ? 'إمبراطوري (رطل/بوصة)' : 'Imperial (lbs/in)'}
          </Button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {isRTL ? 'الوزن' : 'Weight'} ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <div className="relative">
              <Scale className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? '70' : '154'}
                className="ps-10"
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {isRTL ? 'الطول' : 'Height'} ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <div className="relative">
              <Activity className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? '175' : '69'}
                className="ps-10"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <Button onClick={calculate} className="w-full btn-primary">
          {isRTL ? 'احسب BMI' : 'Calculate BMI'}
        </Button>

        {/* Result */}
        {result && (
          <div className="text-center py-6 space-y-4">
            <p className="text-6xl font-bold text-foreground">
              {result.bmi.toFixed(1)}
            </p>
            <p className={`text-2xl font-semibold ${result.color}`}>
              {result.category}
            </p>
          </div>
        )}

        {/* BMI Scale */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground text-center mb-3">
            {isRTL ? 'مقياس BMI' : 'BMI Scale'}
          </p>
          <div className="flex rounded-lg overflow-hidden">
            {bmiRanges.map((range, i) => (
              <div key={i} className={`flex-1 ${range.color} py-2 text-center`}>
                <p className="text-xs text-white font-medium">{range.range}</p>
              </div>
            ))}
          </div>
          <div className="flex">
            {bmiRanges.map((range, i) => (
              <p key={i} className="flex-1 text-xs text-muted-foreground text-center">
                {range.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default BMICalculator;
