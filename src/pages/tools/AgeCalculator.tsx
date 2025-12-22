import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Cake } from 'lucide-react';

const AgeCalculator = () => {
  const { t, isRTL } = useLanguage();
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    nextBirthday: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    if (birth > today) return;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, nextBirthday: daysUntilBirthday });
  };

  return (
    <ToolPageLayout
      title={t.tools.ageCalculator.name}
      description={t.tools.ageCalculator.description}
      article={t.tools.ageCalculator.article}
      keywords="age calculator, calculate age, birthday, حاسبة العمر"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}
          </label>
          <div className="flex gap-3">
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-1"
              dir="ltr"
            />
            <Button onClick={calculate} className="btn-primary">
              <Calendar className="w-4 h-4 me-2" />
              {isRTL ? 'احسب' : 'Calculate'}
            </Button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {/* Main Age */}
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-2">
                {isRTL ? 'عمرك هو' : 'Your age is'}
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="glass-card px-6 py-4 rounded-xl">
                  <p className="text-4xl font-bold text-primary">{result.years}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'سنة' : 'Years'}</p>
                </div>
                <div className="glass-card px-6 py-4 rounded-xl">
                  <p className="text-4xl font-bold text-secondary">{result.months}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'شهر' : 'Months'}</p>
                </div>
                <div className="glass-card px-6 py-4 rounded-xl">
                  <p className="text-4xl font-bold text-accent">{result.days}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'يوم' : 'Days'}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-foreground">
                  {result.totalDays.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'إجمالي الأيام التي عشتها' : 'Total days you have lived'}
                </p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Cake className="w-5 h-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">
                    {result.nextBirthday}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'يوم حتى عيد ميلادك القادم' : 'Days until your next birthday'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default AgeCalculator;
