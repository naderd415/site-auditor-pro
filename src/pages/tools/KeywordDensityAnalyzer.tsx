import { useState, useMemo } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Search, BarChart3, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

interface KeywordData {
  word: string;
  count: number;
  density: number;
}

const KeywordDensityAnalyzer = () => {
  const { isRTL } = useLanguage();
  const [text, setText] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [minWordLength, setMinWordLength] = useState(3);

  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'we', 'us', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'i', 'my', 'me',
    'في', 'من', 'على', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'ذلك', 'تلك', 'التي', 'الذي', 'هو', 'هي', 'هم', 'نحن', 'أنت', 'أنا', 'كان', 'كانت', 'يكون', 'أن', 'لا', 'ما', 'كل', 'بعض', 'كما', 'لكن', 'أو', 'و', 'ثم', 'حتى', 'إذا', 'قد', 'لم', 'لن', 'ليس', 'بل', 'منذ', 'خلال', 'بين', 'عند', 'حين', 'إذ', 'كي', 'لأن', 'رغم'
  ]);

  const analysis = useMemo(() => {
    if (!text.trim()) return null;

    const words = text.toLowerCase()
      .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= minWordLength && !stopWords.has(word));

    const totalWords = words.length;
    const wordCounts: Record<string, number> = {};

    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    const keywords: KeywordData[] = Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / totalWords) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    // Two-word phrases
    const phrases: KeywordData[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      const existing = phrases.find(p => p.word === phrase);
      if (existing) {
        existing.count++;
      } else {
        phrases.push({ word: phrase, count: 1, density: 0 });
      }
    }
    phrases.forEach(p => p.density = (p.count / (totalWords - 1)) * 100);
    const topPhrases = phrases.filter(p => p.count > 1).sort((a, b) => b.count - a.count).slice(0, 10);

    // Target keyword analysis
    let targetData = null;
    if (targetKeyword.trim()) {
      const targetLower = targetKeyword.toLowerCase();
      const targetCount = (text.toLowerCase().match(new RegExp(targetLower, 'g')) || []).length;
      const targetDensity = (targetCount / totalWords) * 100;
      targetData = {
        count: targetCount,
        density: targetDensity,
        status: targetDensity >= 1 && targetDensity <= 3 ? 'good' : targetDensity > 3 ? 'high' : 'low'
      };
    }

    return {
      totalWords,
      uniqueWords: Object.keys(wordCounts).length,
      keywords,
      phrases: topPhrases,
      targetData,
      readingTime: Math.ceil(totalWords / 200)
    };
  }, [text, targetKeyword, minWordLength]);

  const getDensityColor = (density: number) => {
    if (density >= 1 && density <= 3) return 'text-green-600';
    if (density > 3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getDensityStatus = (density: number) => {
    if (density >= 1 && density <= 3) return isRTL ? 'مثالي' : 'Optimal';
    if (density > 3) return isRTL ? 'مفرط' : 'Over-optimized';
    return isRTL ? 'منخفض' : 'Low';
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'محلل كثافة الكلمات المفتاحية AI' : 'Keyword Density Analyzer AI'}
      description={isRTL 
        ? 'حلل كثافة الكلمات المفتاحية في محتواك. اكتشف الكلمات الأكثر استخداماً وحسّن SEO.' 
        : 'Analyze keyword density in your content. Discover most used words and optimize SEO.'}
      keywords="keyword density, SEO analyzer, content optimization, keyword frequency, SEO tools, content analysis"
      article={isRTL 
        ? 'محلل كثافة الكلمات المفتاحية يساعدك على تحليل محتواك واكتشاف الكلمات المفتاحية الأكثر تكراراً. النسبة المثالية للكثافة هي 1-3%. استخدم هذه الأداة لتحسين محتواك لمحركات البحث.'
        : 'Keyword Density Analyzer helps you analyze your content and discover the most frequently used keywords. The ideal density ratio is 1-3%. Use this tool to optimize your content for search engines.'}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                {isRTL ? 'أدخل المحتوى' : 'Enter Content'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'الكلمة المفتاحية المستهدفة' : 'Target Keyword'}
                  </label>
                  <Input
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    placeholder={isRTL ? 'أدخل الكلمة المفتاحية...' : 'Enter target keyword...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'المحتوى النصي' : 'Text Content'}
                  </label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={isRTL ? 'الصق المحتوى هنا للتحليل...' : 'Paste your content here for analysis...'}
                    rows={15}
                    className="font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'الحد الأدنى لطول الكلمة' : 'Minimum Word Length'}
                  </label>
                  <Input
                    type="number"
                    value={minWordLength}
                    onChange={(e) => setMinWordLength(parseInt(e.target.value) || 2)}
                    min={2}
                    max={10}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Stats */}
            {analysis && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{analysis.totalWords}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'إجمالي الكلمات' : 'Total Words'}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{analysis.uniqueWords}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'كلمات فريدة' : 'Unique Words'}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{analysis.readingTime}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'دقائق قراءة' : 'Min Read'}</p>
                  </div>
                </div>

                {/* Target Keyword Analysis */}
                {analysis.targetData && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      {isRTL ? 'تحليل الكلمة المستهدفة' : 'Target Keyword Analysis'}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">"{targetKeyword}"</span>
                          <span className={`text-sm font-bold ${getDensityColor(analysis.targetData.density)}`}>
                            {analysis.targetData.density.toFixed(2)}%
                          </span>
                        </div>
                        <Progress value={Math.min(analysis.targetData.density * 20, 100)} className="h-2" />
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        analysis.targetData.status === 'good' ? 'bg-green-100 text-green-700' :
                        analysis.targetData.status === 'high' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {analysis.targetData.status === 'good' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {getDensityStatus(analysis.targetData.density)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {isRTL ? `عدد مرات الظهور: ${analysis.targetData.count}` : `Occurrences: ${analysis.targetData.count}`}
                    </p>
                  </div>
                )}

                {/* Top Keywords */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    {isRTL ? 'أهم الكلمات المفتاحية' : 'Top Keywords'}
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {analysis.keywords.map((kw, index) => (
                      <div key={kw.word} className="flex items-center gap-2">
                        <span className="w-6 text-xs text-muted-foreground">{index + 1}.</span>
                        <span className="flex-1 text-sm font-medium truncate">{kw.word}</span>
                        <span className="text-xs text-muted-foreground">{kw.count}x</span>
                        <span className={`text-xs font-bold w-14 text-right ${getDensityColor(kw.density)}`}>
                          {kw.density.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Phrases */}
                {analysis.phrases.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <h3 className="font-bold mb-3">
                      {isRTL ? 'أهم العبارات المكونة من كلمتين' : 'Top Two-Word Phrases'}
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {analysis.phrases.map((phrase, index) => (
                        <div key={phrase.word} className="flex items-center gap-2">
                          <span className="w-6 text-xs text-muted-foreground">{index + 1}.</span>
                          <span className="flex-1 text-sm font-medium truncate">{phrase.word}</span>
                          <span className="text-xs text-muted-foreground">{phrase.count}x</span>
                          <span className="text-xs font-bold text-primary w-14 text-right">
                            {phrase.density.toFixed(2)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEO Tips */}
                <div className="bg-muted/50 border border-border rounded-xl p-4">
                  <h3 className="font-bold mb-2">
                    {isRTL ? 'نصائح SEO' : 'SEO Tips'}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {isRTL ? 'كثافة الكلمات المثالية: 1-3%' : 'Ideal keyword density: 1-3%'}</li>
                    <li>• {isRTL ? 'تجنب حشو الكلمات المفتاحية' : 'Avoid keyword stuffing'}</li>
                    <li>• {isRTL ? 'استخدم مرادفات وكلمات ذات صلة' : 'Use synonyms and related words'}</li>
                    <li>• {isRTL ? 'ركز على الجودة وليس الكمية' : 'Focus on quality, not quantity'}</li>
                  </ul>
                </div>
              </>
            )}

            {!analysis && (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isRTL ? 'أدخل النص للبدء في التحليل' : 'Enter text to start analysis'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default KeywordDensityAnalyzer;
