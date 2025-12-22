import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const TextFormatter = () => {
  const { t, isRTL } = useLanguage();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const formatters = [
    { 
      id: 'uppercase', 
      label: isRTL ? 'أحرف كبيرة' : 'UPPERCASE',
      fn: (s: string) => s.toUpperCase()
    },
    { 
      id: 'lowercase', 
      label: isRTL ? 'أحرف صغيرة' : 'lowercase',
      fn: (s: string) => s.toLowerCase()
    },
    { 
      id: 'titlecase', 
      label: isRTL ? 'حرف أول كبير' : 'Title Case',
      fn: (s: string) => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
    },
    { 
      id: 'sentencecase', 
      label: isRTL ? 'بداية الجملة' : 'Sentence case',
      fn: (s: string) => s.toLowerCase().replace(/(^\w|[.!?]\s+\w)/g, c => c.toUpperCase())
    },
    { 
      id: 'reverse', 
      label: isRTL ? 'عكس النص' : 'Reverse',
      fn: (s: string) => s.split('').reverse().join('')
    },
    { 
      id: 'removespaces', 
      label: isRTL ? 'إزالة المسافات الزائدة' : 'Remove Extra Spaces',
      fn: (s: string) => s.replace(/\s+/g, ' ').trim()
    },
    { 
      id: 'removelinebreaks', 
      label: isRTL ? 'إزالة فواصل الأسطر' : 'Remove Line Breaks',
      fn: (s: string) => s.replace(/\n+/g, ' ').trim()
    },
    { 
      id: 'trim', 
      label: isRTL ? 'تقليم' : 'Trim',
      fn: (s: string) => s.trim()
    },
  ];

  const applyFormat = (fn: (s: string) => string) => {
    if (!text.trim()) {
      toast.error(isRTL ? 'يرجى إدخال نص' : 'Please enter text');
      return;
    }
    setResult(fn(text));
    toast.success(isRTL ? 'تم التنسيق!' : 'Formatted!');
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const clearAll = () => {
    setText('');
    setResult('');
  };

  return (
    <ToolPageLayout
      title={t.tools.textFormatter.name}
      description={t.tools.textFormatter.description}
      article={t.tools.textFormatter.article}
      keywords="text formatter, uppercase, lowercase, title case, منسق النصوص"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'النص الأصلي' : 'Original Text'}
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isRTL ? 'أدخل النص هنا...' : 'Enter text here...'}
            rows={6}
          />
        </div>

        {/* Format Buttons */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {isRTL ? 'اختر التنسيق' : 'Choose Format'}
          </label>
          <div className="flex flex-wrap gap-2">
            {formatters.map((formatter) => (
              <Button
                key={formatter.id}
                variant="outline"
                size="sm"
                onClick={() => applyFormat(formatter.fn)}
              >
                {formatter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                {isRTL ? 'النتيجة' : 'Result'}
              </label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyResult}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-xl min-h-[150px]">
              <p className="text-foreground whitespace-pre-wrap break-all">{result}</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default TextFormatter;
