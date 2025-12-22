import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Textarea } from '@/components/ui/textarea';
import { AlignLeft, FileText, Clock, Hash } from 'lucide-react';

const TextCounter = () => {
  const { t, isRTL } = useLanguage();
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? (text.match(/[.!?]+/g) || []).length || (text.trim() ? 1 : 0) : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    lines: text.trim() ? text.split('\n').length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  };

  const statCards = [
    { 
      icon: Hash, 
      label: isRTL ? 'الأحرف' : 'Characters', 
      value: stats.characters,
      subLabel: isRTL ? 'بدون مسافات' : 'No spaces',
      subValue: stats.charactersNoSpaces
    },
    { 
      icon: FileText, 
      label: isRTL ? 'الكلمات' : 'Words', 
      value: stats.words,
      subLabel: isRTL ? 'الجمل' : 'Sentences',
      subValue: stats.sentences
    },
    { 
      icon: AlignLeft, 
      label: isRTL ? 'الفقرات' : 'Paragraphs', 
      value: stats.paragraphs,
      subLabel: isRTL ? 'الأسطر' : 'Lines',
      subValue: stats.lines
    },
    { 
      icon: Clock, 
      label: isRTL ? 'وقت القراءة' : 'Reading Time', 
      value: `${stats.readingTime} ${isRTL ? 'دقيقة' : 'min'}`,
      subLabel: isRTL ? '(200 كلمة/دقيقة)' : '(200 wpm)',
      subValue: ''
    },
  ];

  return (
    <ToolPageLayout
      title={t.tools.textCounter.name}
      description={t.tools.textCounter.description}
      article={t.tools.textCounter.article}
      keywords="text counter, word counter, character counter, عداد الكلمات, عداد الأحرف"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div key={index} className="glass-card p-4 rounded-xl text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.subValue !== '' && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subLabel}: {stat.subValue}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'أدخل النص هنا' : 'Enter your text here'}
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isRTL ? 'ابدأ الكتابة أو الصق النص هنا...' : 'Start typing or paste text here...'}
            rows={12}
            className="min-h-[300px] resize-y"
          />
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TextCounter;
