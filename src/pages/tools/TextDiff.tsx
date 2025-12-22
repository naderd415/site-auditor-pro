import { useState, useMemo } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const TextDiff = () => {
  const { isRTL } = useLanguage();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const diffResult = useMemo(() => {
    if (!text1 && !text2) return [];

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const result: Array<{ line1: string; line2: string; status: 'same' | 'different' | 'added' | 'removed' }> = [];

    for (let i = 0; i < maxLines; i++) {
      const l1 = lines1[i] ?? '';
      const l2 = lines2[i] ?? '';

      if (l1 === l2) {
        result.push({ line1: l1, line2: l2, status: 'same' });
      } else if (l1 && !l2 && i >= lines2.length) {
        result.push({ line1: l1, line2: '', status: 'removed' });
      } else if (!l1 && l2 && i >= lines1.length) {
        result.push({ line1: '', line2: l2, status: 'added' });
      } else {
        result.push({ line1: l1, line2: l2, status: 'different' });
      }
    }

    return result;
  }, [text1, text2]);

  const stats = useMemo(() => {
    const same = diffResult.filter(r => r.status === 'same').length;
    const different = diffResult.filter(r => r.status === 'different').length;
    const added = diffResult.filter(r => r.status === 'added').length;
    const removed = diffResult.filter(r => r.status === 'removed').length;
    return { same, different, added, removed, total: diffResult.length };
  }, [diffResult]);

  const clearAll = () => {
    setText1('');
    setText2('');
  };

  const swapTexts = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'same': return 'bg-transparent';
      case 'different': return 'bg-yellow-500/20 border-l-4 border-yellow-500';
      case 'added': return 'bg-green-500/20 border-l-4 border-green-500';
      case 'removed': return 'bg-red-500/20 border-l-4 border-red-500';
      default: return '';
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'مقارنة النصوص' : 'Text Diff / Compare'}
      description={isRTL 
        ? 'قارن بين نصين واكتشف الاختلافات بينهما سطراً بسطر'
        : 'Compare two texts and find differences line by line'}
      keywords="text diff, text compare, diff checker, compare texts"
      article={isRTL 
        ? 'أداة مقارنة النصوص تساعدك على اكتشاف الاختلافات بين نسختين من النص. يتم عرض الأسطر المتطابقة والمختلفة والمضافة والمحذوفة بألوان مختلفة لسهولة التمييز.'
        : 'The text diff tool helps you find differences between two versions of text. Matching, different, added, and removed lines are displayed in different colors for easy distinction.'}
    >
      <div className="space-y-6">
        {/* Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-lg">
              {isRTL ? 'النص الأول (الأصلي)' : 'Text 1 (Original)'}
            </Label>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder={isRTL ? 'أدخل النص الأول هنا...' : 'Enter first text here...'}
              className="min-h-[200px] font-mono"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-lg">
              {isRTL ? 'النص الثاني (المعدل)' : 'Text 2 (Modified)'}
            </Label>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder={isRTL ? 'أدخل النص الثاني هنا...' : 'Enter second text here...'}
              className="min-h-[200px] font-mono"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" onClick={swapTexts}>
            {isRTL ? 'تبديل النصوص' : 'Swap Texts'}
          </Button>
          <Button variant="outline" onClick={clearAll} className="gap-2">
            <Trash2 className="w-4 h-4" />
            {isRTL ? 'مسح الكل' : 'Clear All'}
          </Button>
        </div>

        {/* Stats */}
        {diffResult.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الأسطر' : 'Total Lines'}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-foreground">{stats.same}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? 'متطابق' : 'Same'}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center border-l-4 border-yellow-500">
              <p className="text-2xl font-bold text-yellow-500">{stats.different}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? 'مختلف' : 'Different'}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center border-l-4 border-green-500">
              <p className="text-2xl font-bold text-green-500">{stats.added}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? 'مضاف' : 'Added'}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center border-l-4 border-red-500">
              <p className="text-2xl font-bold text-red-500">{stats.removed}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? 'محذوف' : 'Removed'}</p>
            </div>
          </div>
        )}

        {/* Diff Result */}
        {diffResult.length > 0 && (
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-bold text-lg text-foreground mb-4">
              {isRTL ? 'نتيجة المقارنة' : 'Comparison Result'}
            </h3>
            <div className="space-y-1 font-mono text-sm max-h-[400px] overflow-auto">
              {diffResult.map((row, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div className={`p-2 rounded ${row.status === 'removed' || row.status === 'different' ? getStatusColor(row.status === 'removed' ? 'removed' : 'different') : 'bg-transparent'}`}>
                    <span className="text-muted-foreground mr-2">{index + 1}</span>
                    {row.line1 || <span className="text-muted-foreground/50">—</span>}
                  </div>
                  <div className={`p-2 rounded ${row.status === 'added' || row.status === 'different' ? getStatusColor(row.status === 'added' ? 'added' : 'different') : 'bg-transparent'}`}>
                    <span className="text-muted-foreground mr-2">{index + 1}</span>
                    {row.line2 || <span className="text-muted-foreground/50">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/40 rounded"></div>
            <span className="text-muted-foreground">{isRTL ? 'مختلف' : 'Different'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/40 rounded"></div>
            <span className="text-muted-foreground">{isRTL ? 'مضاف' : 'Added'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/40 rounded"></div>
            <span className="text-muted-foreground">{isRTL ? 'محذوف' : 'Removed'}</span>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextDiff;
