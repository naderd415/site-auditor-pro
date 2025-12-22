import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Ruler } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume';

interface UnitConfig {
  name: string;
  units: { id: string; name: string; toBase: number }[];
}

const UnitConverter = () => {
  const { t, isRTL } = useLanguage();
  
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const categories: Record<UnitCategory, UnitConfig> = {
    length: {
      name: isRTL ? 'الطول' : 'Length',
      units: [
        { id: 'm', name: isRTL ? 'متر' : 'Meter', toBase: 1 },
        { id: 'km', name: isRTL ? 'كيلومتر' : 'Kilometer', toBase: 1000 },
        { id: 'cm', name: isRTL ? 'سنتيمتر' : 'Centimeter', toBase: 0.01 },
        { id: 'mm', name: isRTL ? 'ميليمتر' : 'Millimeter', toBase: 0.001 },
        { id: 'mi', name: isRTL ? 'ميل' : 'Mile', toBase: 1609.344 },
        { id: 'yd', name: isRTL ? 'ياردة' : 'Yard', toBase: 0.9144 },
        { id: 'ft', name: isRTL ? 'قدم' : 'Foot', toBase: 0.3048 },
        { id: 'in', name: isRTL ? 'بوصة' : 'Inch', toBase: 0.0254 },
      ],
    },
    weight: {
      name: isRTL ? 'الوزن' : 'Weight',
      units: [
        { id: 'kg', name: isRTL ? 'كيلوغرام' : 'Kilogram', toBase: 1 },
        { id: 'g', name: isRTL ? 'غرام' : 'Gram', toBase: 0.001 },
        { id: 'mg', name: isRTL ? 'ميليغرام' : 'Milligram', toBase: 0.000001 },
        { id: 'lb', name: isRTL ? 'رطل' : 'Pound', toBase: 0.453592 },
        { id: 'oz', name: isRTL ? 'أونصة' : 'Ounce', toBase: 0.0283495 },
        { id: 't', name: isRTL ? 'طن' : 'Ton', toBase: 1000 },
      ],
    },
    temperature: {
      name: isRTL ? 'الحرارة' : 'Temperature',
      units: [
        { id: 'c', name: isRTL ? 'سيلسيوس' : 'Celsius', toBase: 1 },
        { id: 'f', name: isRTL ? 'فهرنهايت' : 'Fahrenheit', toBase: 1 },
        { id: 'k', name: isRTL ? 'كلفن' : 'Kelvin', toBase: 1 },
      ],
    },
    area: {
      name: isRTL ? 'المساحة' : 'Area',
      units: [
        { id: 'm2', name: isRTL ? 'متر مربع' : 'Square Meter', toBase: 1 },
        { id: 'km2', name: isRTL ? 'كم مربع' : 'Square Kilometer', toBase: 1000000 },
        { id: 'ft2', name: isRTL ? 'قدم مربع' : 'Square Foot', toBase: 0.092903 },
        { id: 'acre', name: isRTL ? 'فدان' : 'Acre', toBase: 4046.86 },
        { id: 'ha', name: isRTL ? 'هكتار' : 'Hectare', toBase: 10000 },
      ],
    },
    volume: {
      name: isRTL ? 'الحجم' : 'Volume',
      units: [
        { id: 'l', name: isRTL ? 'لتر' : 'Liter', toBase: 1 },
        { id: 'ml', name: isRTL ? 'ميليلتر' : 'Milliliter', toBase: 0.001 },
        { id: 'gal', name: isRTL ? 'غالون' : 'Gallon', toBase: 3.78541 },
        { id: 'qt', name: isRTL ? 'ربع غالون' : 'Quart', toBase: 0.946353 },
        { id: 'pt', name: isRTL ? 'باينت' : 'Pint', toBase: 0.473176 },
        { id: 'm3', name: isRTL ? 'متر مكعب' : 'Cubic Meter', toBase: 1000 },
      ],
    },
  };

  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setToValue('');
      return;
    }

    if (category === 'temperature') {
      let result: number;
      // Convert to Celsius first
      let celsius: number;
      if (fromUnit === 'c') celsius = value;
      else if (fromUnit === 'f') celsius = (value - 32) * 5/9;
      else celsius = value - 273.15;
      
      // Convert from Celsius to target
      if (toUnit === 'c') result = celsius;
      else if (toUnit === 'f') result = celsius * 9/5 + 32;
      else result = celsius + 273.15;
      
      setToValue(result.toFixed(4));
    } else {
      const units = categories[category].units;
      const from = units.find(u => u.id === fromUnit);
      const to = units.find(u => u.id === toUnit);
      
      if (from && to) {
        const baseValue = value * from.toBase;
        const result = baseValue / to.toBase;
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
      }
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <ToolPageLayout
      title={t.tools.unitConverter.name}
      description={t.tools.unitConverter.description}
      article={t.tools.unitConverter.article}
      keywords="unit converter, length converter, weight converter, محول الوحدات"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(categories) as UnitCategory[]).map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setCategory(cat);
                setFromUnit(categories[cat].units[0].id);
                setToUnit(categories[cat].units[1].id);
                setFromValue('1');
                setToValue('');
              }}
            >
              {categories[cat].name}
            </Button>
          ))}
        </div>

        {/* Converter */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{isRTL ? 'من' : 'From'}</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground"
            >
              {categories[category].units.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.name}</option>
              ))}
            </select>
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="text-lg"
              dir="ltr"
            />
          </div>

          {/* Swap Button */}
          <Button variant="outline" size="icon" onClick={swapUnits} className="mb-2">
            <ArrowRightLeft className="w-4 h-4" />
          </Button>

          {/* To */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{isRTL ? 'إلى' : 'To'}</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground"
            >
              {categories[category].units.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.name}</option>
              ))}
            </select>
            <Input
              type="text"
              value={toValue}
              readOnly
              className="text-lg bg-muted"
              dir="ltr"
            />
          </div>
        </div>

        <Button onClick={convert} className="w-full btn-primary">
          <Ruler className="w-4 h-4 me-2" />
          {isRTL ? 'تحويل' : 'Convert'}
        </Button>
      </div>
    </ToolPageLayout>
  );
};

export default UnitConverter;
