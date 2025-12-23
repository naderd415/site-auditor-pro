import { useState, useRef, useCallback } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Pen, Type, Image, Trash2, Move } from 'lucide-react';
import { toast } from 'sonner';

interface SignaturePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
}

const PDFSign = () => {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'image'>('draw');
  const [typedName, setTypedName] = useState('');
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [drawnSignature, setDrawnSignature] = useState<string | null>(null);
  const [position, setPosition] = useState<SignaturePosition>({ x: 50, y: 50, width: 200, height: 80, page: 1 });
  const [signing, setSigning] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Drawing functions
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    lastPoint.current = { x, y };
  }, []);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !lastPoint.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPoint.current = { x, y };
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && canvasRef.current) {
      setDrawnSignature(canvasRef.current.toDataURL());
    }
    setIsDrawing(false);
    lastPoint.current = null;
  }, [isDrawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDrawnSignature(null);
    }
  };

  const signPDF = async () => {
    if (!file) {
      toast.error(isRTL ? 'يرجى اختيار ملف PDF' : 'Please select a PDF file');
      return;
    }

    let signatureDataUrl: string | null = null;
    
    if (signatureType === 'draw' && drawnSignature) {
      signatureDataUrl = drawnSignature;
    } else if (signatureType === 'image' && signatureImage) {
      signatureDataUrl = signatureImage;
    } else if (signatureType === 'type' && typedName) {
      // Create signature from text
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'italic 48px "Brush Script MT", cursive, serif';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
        signatureDataUrl = canvas.toDataURL('image/png');
      }
    }

    if (!signatureDataUrl) {
      toast.error(isRTL ? 'يرجى إنشاء توقيع أولاً' : 'Please create a signature first');
      return;
    }

    setSigning(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const page = pages[Math.min(position.page - 1, pages.length - 1)];
      const { height } = page.getSize();

      // Embed the signature image
      const signatureBytes = await fetch(signatureDataUrl).then(res => res.arrayBuffer());
      const signatureImageEmbed = await pdfDoc.embedPng(new Uint8Array(signatureBytes));

      // Draw signature on page
      page.drawImage(signatureImageEmbed, {
        x: position.x,
        y: height - position.y - position.height,
        width: position.width,
        height: position.height,
      });

      // Add timestamp
      const now = new Date();
      page.drawText(`Signed: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, {
        x: position.x,
        y: height - position.y - position.height - 15,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });

      const signedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(signedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace('.pdf', '_signed.pdf');
      link.click();
      URL.revokeObjectURL(url);

      toast.success(isRTL ? 'تم التوقيع بنجاح!' : 'Signed successfully!');
    } catch (error) {
      console.error('Signing error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء التوقيع' : 'Error signing PDF');
    } finally {
      setSigning(false);
    }
  };

  return (
    <ToolPageLayout
      title={isRTL ? 'توقيع PDF' : 'Sign PDF'}
      description={isRTL ? 'أضف توقيعك الإلكتروني على ملفات PDF' : 'Add your electronic signature to PDF files'}
      keywords="PDF signature, sign PDF, electronic signature, توقيع PDF, توقيع إلكتروني"
      article=""
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Signature Creation */}
          <div className="space-y-6">
            <Tabs value={signatureType} onValueChange={(v) => setSignatureType(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="draw" className="flex items-center gap-1">
                  <Pen className="w-4 h-4" />
                  {isRTL ? 'رسم' : 'Draw'}
                </TabsTrigger>
                <TabsTrigger value="type" className="flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  {isRTL ? 'كتابة' : 'Type'}
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-1">
                  <Image className="w-4 h-4" />
                  {isRTL ? 'صورة' : 'Image'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="draw" className="mt-4">
                <div className="border-2 border-border rounded-lg p-2 bg-white">
                  <canvas
                    ref={canvasRef}
                    width={350}
                    height={150}
                    className="w-full cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearCanvas}
                  className="mt-2"
                >
                  <Trash2 className="w-4 h-4 me-2" />
                  {isRTL ? 'مسح' : 'Clear'}
                </Button>
              </TabsContent>

              <TabsContent value="type" className="mt-4 space-y-4">
                <Input
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder={isRTL ? 'اكتب اسمك هنا' : 'Type your name here'}
                  className="text-2xl font-serif italic"
                />
                {typedName && (
                  <div className="p-4 bg-white border rounded-lg text-center">
                    <span className="text-3xl italic font-serif">{typedName}</span>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="image" className="mt-4">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 me-2" />
                  {isRTL ? 'رفع صورة التوقيع' : 'Upload signature image'}
                </Button>
                {signatureImage && (
                  <div className="mt-4 p-4 bg-white border rounded-lg">
                    <img 
                      src={signatureImage} 
                      alt="Signature" 
                      className="max-h-24 mx-auto"
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Position Settings */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium flex items-center gap-2">
                <Move className="w-4 h-4" />
                {isRTL ? 'موضع التوقيع' : 'Signature Position'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    X: {position.x}px
                  </label>
                  <Slider
                    value={[position.x]}
                    onValueChange={([x]) => setPosition({ ...position, x })}
                    min={0}
                    max={500}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Y: {position.y}px
                  </label>
                  <Slider
                    value={[position.y]}
                    onValueChange={([y]) => setPosition({ ...position, y })}
                    min={0}
                    max={800}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {isRTL ? 'العرض' : 'Width'}: {position.width}px
                  </label>
                  <Slider
                    value={[position.width]}
                    onValueChange={([width]) => setPosition({ ...position, width })}
                    min={50}
                    max={400}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {isRTL ? 'الصفحة' : 'Page'}: {position.page}
                  </label>
                  <Slider
                    value={[position.page]}
                    onValueChange={([page]) => setPosition({ ...position, page })}
                    min={1}
                    max={10}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: PDF Selection */}
          <div className="space-y-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium">
                {file ? file.name : (isRTL ? 'اختر ملف PDF' : 'Select PDF file')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {isRTL ? 'اضغط أو اسحب الملف هنا' : 'Click or drag file here'}
              </p>
            </div>

            {/* Sign Button */}
            <Button 
              onClick={signPDF} 
              className="w-full btn-primary"
              disabled={!file || signing}
            >
              <Pen className="w-4 h-4 me-2" />
              {signing 
                ? (isRTL ? 'جاري التوقيع...' : 'Signing...') 
                : (isRTL ? 'توقيع وتحميل' : 'Sign & Download')
              }
            </Button>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-2">{isRTL ? 'تعليمات:' : 'Instructions:'}</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>{isRTL ? 'أنشئ توقيعك (رسم، كتابة، أو صورة)' : 'Create your signature (draw, type, or image)'}</li>
                <li>{isRTL ? 'حدد موضع التوقيع' : 'Set signature position'}</li>
                <li>{isRTL ? 'اختر ملف PDF' : 'Select PDF file'}</li>
                <li>{isRTL ? 'اضغط توقيع وتحميل' : 'Click Sign & Download'}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PDFSign;
