import { useState, useRef, useCallback } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Upload, Download, Copy, Binary } from 'lucide-react';
import { toast } from 'sonner';

const ImageToBase64 = () => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Result, setBase64Result] = useState<string>('');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string } | null>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDataUrl(result);
      setPreviewUrl(result);
      
      // Extract just the base64 part
      const base64 = result.split(',')[1];
      setBase64Result(base64);
      
      toast.success(isRTL ? 'تم التحويل بنجاح!' : 'Conversion successful!');
    };
    reader.readAsDataURL(file);
  }, [isRTL]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(isRTL ? `تم نسخ ${label}!` : `${label} copied!`);
    } catch {
      toast.error(isRTL ? 'فشل النسخ' : 'Failed to copy');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <ToolPageLayout
      title={t.tools.imageToBase64.name}
      description={t.tools.imageToBase64.description}
      article={t.tools.imageToBase64.article}
      keywords="image to base64, base64 encoder, data URL, صورة إلى Base64"
    >
      <div className="glass-card p-6 rounded-2xl space-y-6">
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {previewUrl ? (
            <div className="space-y-4">
              <img src={previewUrl} alt="Preview" className="max-w-full max-h-[200px] mx-auto rounded-lg" />
              {fileInfo && (
                <div className="text-sm text-muted-foreground">
                  <p>{fileInfo.name}</p>
                  <p>{formatSize(fileInfo.size)} • {fileInfo.type}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Binary className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  {isRTL ? 'اسحب صورة هنا أو اضغط للاختيار' : 'Drag image here or click to select'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {base64Result && (
          <div className="space-y-4">
            {/* Data URL */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">
                  Data URL ({isRTL ? 'للاستخدام في HTML' : 'for HTML img src'})
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(dataUrl, 'Data URL')}
                >
                  <Copy className="w-4 h-4 me-1" />
                  {isRTL ? 'نسخ' : 'Copy'}
                </Button>
              </div>
              <div className="bg-muted p-3 rounded-lg max-h-24 overflow-auto">
                <code className="text-xs text-muted-foreground break-all" dir="ltr">
                  {dataUrl.substring(0, 200)}...
                </code>
              </div>
            </div>

            {/* Base64 Only */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">
                  Base64 ({isRTL ? 'بدون prefix' : 'without prefix'})
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(base64Result, 'Base64')}
                >
                  <Copy className="w-4 h-4 me-1" />
                  {isRTL ? 'نسخ' : 'Copy'}
                </Button>
              </div>
              <div className="bg-muted p-3 rounded-lg max-h-24 overflow-auto">
                <code className="text-xs text-muted-foreground break-all" dir="ltr">
                  {base64Result.substring(0, 200)}...
                </code>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="glass-card p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">{isRTL ? 'الحجم الأصلي' : 'Original Size'}</p>
                <p className="text-lg font-bold text-foreground">{fileInfo ? formatSize(fileInfo.size) : '-'}</p>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">{isRTL ? 'حجم Base64' : 'Base64 Size'}</p>
                <p className="text-lg font-bold text-foreground">{formatSize(base64Result.length)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToBase64;
