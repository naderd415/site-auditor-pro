import { useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const LoremGenerator = () => {
  const { t, isRTL } = useLanguage();
  
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [result, setResult] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const getRandomWord = () => loremWords[Math.floor(Math.random() * loremWords.length)];

  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const generateWords = (wordCount: number) => {
    const words = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(getRandomWord());
    }
    return words.join(' ');
  };

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5;
    return capitalizeFirst(generateWords(wordCount)) + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let text = '';
    
    if (type === 'words') {
      text = capitalizeFirst(generateWords(count)) + '.';
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      text = sentences.join(' ');
    } else {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      text = paragraphs.join('\n\n');
    }
    
    // Start with "Lorem ipsum dolor sit amet" for first paragraph
    if (type === 'paragraphs' && count > 0) {
      text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + text.slice(text.indexOf('.') + 2);
    }
    
    setResult(text);
  };

  const copyToClipboard = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success(isRTL ? 'تم النسخ!' : 'Copied!');
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  return (
    <ToolPageLayout
      title={t.tools.loremGenerator.name}
      description={t.tools.loremGenerator.description}
      article={t.tools.loremGenerator.article}
      keywords="lorem ipsum generator, placeholder text, مولد Lorem Ipsum"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {isRTL ? 'نوع المحتوى' : 'Content Type'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <Button
                key={t}
                variant={type === t ? 'default' : 'outline'}
                onClick={() => setType(t)}
              >
                {t === 'paragraphs' ? (isRTL ? 'فقرات' : 'Paragraphs') :
                 t === 'sentences' ? (isRTL ? 'جمل' : 'Sentences') :
                 (isRTL ? 'كلمات' : 'Words')}
              </Button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {isRTL ? 'العدد' : 'Count'}: {count}
          </label>
          <Slider
            value={[count]}
            onValueChange={([v]) => setCount(v)}
            min={1}
            max={type === 'words' ? 100 : type === 'sentences' ? 20 : 10}
            step={1}
          />
        </div>

        {/* Generate Button */}
        <Button onClick={generate} className="w-full btn-primary">
          <RefreshCw className="w-4 h-4 me-2" />
          {isRTL ? 'إنشاء' : 'Generate'}
        </Button>

        {/* Result */}
        {result && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                {isRTL ? 'النتيجة' : 'Result'}
              </label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 me-1" />
                {isRTL ? 'نسخ' : 'Copy'}
              </Button>
            </div>
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground text-center">
              {result.split(/\s+/).length} {isRTL ? 'كلمة' : 'words'}
            </p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default LoremGenerator;
