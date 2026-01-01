import { useLanguage } from '@/lib/i18n';
import { Image, FileText, Type, Palette, Calculator, QrCode, LayoutGrid, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const categories = [
  { id: 'all', icon: LayoutGrid, labelKey: 'categories.all' },
  { id: 'image', icon: Image, labelKey: 'categories.image' },
  { id: 'pdf', icon: FileText, labelKey: 'categories.pdf' },
  { id: 'text', icon: Type, labelKey: 'categories.text' },
  { id: 'color', icon: Palette, labelKey: 'categories.color' },
  { id: 'calculator', icon: Calculator, labelKey: 'categories.calculator' },
  { id: 'qr', icon: QrCode, labelKey: 'categories.qr' },
  { id: 'seo', icon: Search, labelKey: 'categories.seo' },
];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { t } = useLanguage();

  const getCategoryLabel = (key: string) => {
    const keys = key.split('.');
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isSelected = selected === category.id;
        return (
          <Button
            key={category.id}
            variant={isSelected ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onChange(category.id)}
            className={`gap-2 rounded-full px-4 transition-all ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(180,100%,50%,0.3)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{getCategoryLabel(category.labelKey)}</span>
          </Button>
        );
      })}
    </div>
  );
}
