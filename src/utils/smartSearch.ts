import Fuse from 'fuse.js';

export interface ToolData {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  keywordsAr: string[];
  keywordsEn: string[];
  path: string;
  category: string;
}

// Comprehensive tools dataset
export const toolsDataset: ToolData[] = [
  // QR Tools
  {
    id: 'qr-generator',
    nameAr: 'مولد رمز QR',
    nameEn: 'QR Code Generator',
    descriptionAr: 'إنشاء رموز QR مخصصة للروابط والنصوص والواي فاي',
    descriptionEn: 'Create custom QR codes for links, text, and WiFi',
    keywordsAr: ['كيو ار', 'باركود', 'رمز', 'إنشاء', 'صنع', 'توليد', 'رابط'],
    keywordsEn: ['qr', 'barcode', 'code', 'create', 'make', 'generate', 'link'],
    path: '/tools/qr-generator',
    category: 'qr'
  },
  {
    id: 'qr-scanner',
    nameAr: 'ماسح رمز QR',
    nameEn: 'QR Code Scanner',
    descriptionAr: 'مسح وقراءة رموز QR من الصور أو الكاميرا',
    descriptionEn: 'Scan and read QR codes from images or camera',
    keywordsAr: ['قراءة', 'مسح', 'فك', 'كيو ار', 'باركود', 'كاميرا'],
    keywordsEn: ['scan', 'read', 'decode', 'qr', 'barcode', 'camera'],
    path: '/tools/qr-scanner',
    category: 'qr'
  },

  // Image Tools
  {
    id: 'image-converter',
    nameAr: 'محول الصور',
    nameEn: 'Image Converter',
    descriptionAr: 'تحويل الصور بين صيغ PNG, JPG, WebP, GIF',
    descriptionEn: 'Convert images between PNG, JPG, WebP, GIF formats',
    keywordsAr: ['تحويل', 'صورة', 'صيغة', 'png', 'jpg', 'webp', 'gif'],
    keywordsEn: ['convert', 'image', 'format', 'png', 'jpg', 'webp', 'gif'],
    path: '/tools/image-converter',
    category: 'image'
  },
  {
    id: 'image-compressor',
    nameAr: 'ضغط الصور',
    nameEn: 'Image Compressor',
    descriptionAr: 'ضغط وتقليل حجم الصور مع الحفاظ على الجودة',
    descriptionEn: 'Compress and reduce image size while maintaining quality',
    keywordsAr: ['ضغط', 'تصغير', 'حجم', 'صورة', 'تقليل'],
    keywordsEn: ['compress', 'reduce', 'size', 'image', 'optimize'],
    path: '/tools/image-compressor',
    category: 'image'
  },
  {
    id: 'image-resizer',
    nameAr: 'تغيير حجم الصور',
    nameEn: 'Image Resizer',
    descriptionAr: 'تغيير أبعاد الصور بالبكسل أو النسبة المئوية',
    descriptionEn: 'Resize images by pixels or percentage',
    keywordsAr: ['تغيير', 'حجم', 'أبعاد', 'صورة', 'بكسل', 'تكبير', 'تصغير'],
    keywordsEn: ['resize', 'dimension', 'image', 'pixel', 'scale', 'enlarge'],
    path: '/tools/image-resizer',
    category: 'image'
  },
  {
    id: 'image-cropper',
    nameAr: 'قص الصور',
    nameEn: 'Image Cropper',
    descriptionAr: 'قص وتعديل الصور بدقة عالية',
    descriptionEn: 'Crop and edit images with precision',
    keywordsAr: ['قص', 'تقطيع', 'صورة', 'تعديل', 'اقتصاص'],
    keywordsEn: ['crop', 'cut', 'image', 'edit', 'trim'],
    path: '/tools/image-cropper',
    category: 'image'
  },
  {
    id: 'image-to-base64',
    nameAr: 'تحويل صورة إلى Base64',
    nameEn: 'Image to Base64',
    descriptionAr: 'تحويل الصور إلى نص Base64 للمطورين',
    descriptionEn: 'Convert images to Base64 text for developers',
    keywordsAr: ['base64', 'ترميز', 'صورة', 'نص', 'مطورين', 'كود'],
    keywordsEn: ['base64', 'encode', 'image', 'text', 'developer', 'code'],
    path: '/tools/image-to-base64',
    category: 'image'
  },
  {
    id: 'background-remover',
    nameAr: 'إزالة خلفية الصور',
    nameEn: 'Background Remover',
    descriptionAr: 'إزالة خلفية الصور تلقائياً بالذكاء الاصطناعي',
    descriptionEn: 'Remove image background automatically with AI',
    keywordsAr: ['إزالة', 'خلفية', 'صورة', 'شفاف', 'ذكاء اصطناعي', 'حذف'],
    keywordsEn: ['remove', 'background', 'image', 'transparent', 'ai', 'delete'],
    path: '/tools/background-remover',
    category: 'image'
  },

  // PDF Tools
  {
    id: 'pdf-merge',
    nameAr: 'دمج ملفات PDF',
    nameEn: 'PDF Merge',
    descriptionAr: 'دمج عدة ملفات PDF في ملف واحد',
    descriptionEn: 'Merge multiple PDF files into one',
    keywordsAr: ['دمج', 'pdf', 'ملف', 'جمع', 'توحيد', 'بي دي اف'],
    keywordsEn: ['merge', 'pdf', 'file', 'combine', 'join'],
    path: '/tools/pdf-merge',
    category: 'pdf'
  },
  {
    id: 'pdf-split',
    nameAr: 'تقسيم ملفات PDF',
    nameEn: 'PDF Split',
    descriptionAr: 'تقسيم ملف PDF إلى عدة ملفات',
    descriptionEn: 'Split PDF file into multiple files',
    keywordsAr: ['تقسيم', 'pdf', 'ملف', 'فصل', 'تجزئة'],
    keywordsEn: ['split', 'pdf', 'file', 'separate', 'divide'],
    path: '/tools/pdf-split',
    category: 'pdf'
  },
  {
    id: 'pdf-compress',
    nameAr: 'ضغط PDF',
    nameEn: 'PDF Compress',
    descriptionAr: 'ضغط وتقليل حجم ملفات PDF',
    descriptionEn: 'Compress and reduce PDF file size',
    keywordsAr: ['ضغط', 'pdf', 'ملف', 'حجم', 'تصغير'],
    keywordsEn: ['compress', 'pdf', 'file', 'size', 'reduce'],
    path: '/tools/pdf-compress',
    category: 'pdf'
  },
  {
    id: 'pdf-to-image',
    nameAr: 'تحويل PDF إلى صور',
    nameEn: 'PDF to Image',
    descriptionAr: 'تحويل صفحات PDF إلى صور',
    descriptionEn: 'Convert PDF pages to images',
    keywordsAr: ['تحويل', 'pdf', 'صورة', 'استخراج'],
    keywordsEn: ['convert', 'pdf', 'image', 'extract'],
    path: '/tools/pdf-to-image',
    category: 'pdf'
  },
  {
    id: 'image-to-pdf',
    nameAr: 'تحويل صور إلى PDF',
    nameEn: 'Image to PDF',
    descriptionAr: 'تحويل صور متعددة إلى ملف PDF واحد',
    descriptionEn: 'Convert multiple images to a single PDF',
    keywordsAr: ['تحويل', 'صورة', 'pdf', 'ملف'],
    keywordsEn: ['convert', 'image', 'pdf', 'file'],
    path: '/tools/image-to-pdf',
    category: 'pdf'
  },
  {
    id: 'pdf-to-word',
    nameAr: 'تحويل PDF إلى Word',
    nameEn: 'PDF to Word',
    descriptionAr: 'تحويل ملفات PDF إلى مستندات Word',
    descriptionEn: 'Convert PDF files to Word documents',
    keywordsAr: ['تحويل', 'pdf', 'word', 'وورد', 'docx', 'مستند'],
    keywordsEn: ['convert', 'pdf', 'word', 'docx', 'document'],
    path: '/tools/pdf-to-word',
    category: 'pdf'
  },
  {
    id: 'word-to-pdf',
    nameAr: 'تحويل Word إلى PDF',
    nameEn: 'Word to PDF',
    descriptionAr: 'تحويل مستندات Word إلى PDF',
    descriptionEn: 'Convert Word documents to PDF',
    keywordsAr: ['تحويل', 'word', 'وورد', 'pdf', 'docx'],
    keywordsEn: ['convert', 'word', 'pdf', 'docx'],
    path: '/tools/word-to-pdf',
    category: 'pdf'
  },
  {
    id: 'pdf-to-powerpoint',
    nameAr: 'تحويل PDF إلى PowerPoint',
    nameEn: 'PDF to PowerPoint',
    descriptionAr: 'تحويل ملفات PDF إلى عروض تقديمية',
    descriptionEn: 'Convert PDF to PowerPoint presentations',
    keywordsAr: ['تحويل', 'pdf', 'بوربوينت', 'عرض تقديمي', 'pptx'],
    keywordsEn: ['convert', 'pdf', 'powerpoint', 'presentation', 'pptx'],
    path: '/tools/pdf-to-powerpoint',
    category: 'pdf'
  },
  {
    id: 'powerpoint-to-pdf',
    nameAr: 'تحويل PowerPoint إلى PDF',
    nameEn: 'PowerPoint to PDF',
    descriptionAr: 'تحويل عروض PowerPoint إلى PDF',
    descriptionEn: 'Convert PowerPoint presentations to PDF',
    keywordsAr: ['تحويل', 'بوربوينت', 'pdf', 'عرض تقديمي', 'pptx'],
    keywordsEn: ['convert', 'powerpoint', 'pdf', 'presentation', 'pptx'],
    path: '/tools/powerpoint-to-pdf',
    category: 'pdf'
  },
  {
    id: 'pdf-to-excel',
    nameAr: 'تحويل PDF إلى Excel',
    nameEn: 'PDF to Excel',
    descriptionAr: 'تحويل ملفات PDF إلى جداول Excel',
    descriptionEn: 'Convert PDF files to Excel spreadsheets',
    keywordsAr: ['تحويل', 'pdf', 'اكسل', 'جدول', 'xlsx'],
    keywordsEn: ['convert', 'pdf', 'excel', 'spreadsheet', 'xlsx'],
    path: '/tools/pdf-to-excel',
    category: 'pdf'
  },
  {
    id: 'excel-to-pdf',
    nameAr: 'تحويل Excel إلى PDF',
    nameEn: 'Excel to PDF',
    descriptionAr: 'تحويل جداول Excel إلى PDF',
    descriptionEn: 'Convert Excel spreadsheets to PDF',
    keywordsAr: ['تحويل', 'اكسل', 'pdf', 'جدول', 'xlsx'],
    keywordsEn: ['convert', 'excel', 'pdf', 'spreadsheet', 'xlsx'],
    path: '/tools/excel-to-pdf',
    category: 'pdf'
  },
  {
    id: 'pdf-to-html',
    nameAr: 'تحويل PDF إلى HTML',
    nameEn: 'PDF to HTML',
    descriptionAr: 'تحويل ملفات PDF إلى صفحات ويب',
    descriptionEn: 'Convert PDF files to web pages',
    keywordsAr: ['تحويل', 'pdf', 'html', 'ويب', 'صفحة'],
    keywordsEn: ['convert', 'pdf', 'html', 'web', 'page'],
    path: '/tools/pdf-to-html',
    category: 'pdf'
  },
  {
    id: 'html-to-pdf',
    nameAr: 'تحويل HTML إلى PDF',
    nameEn: 'HTML to PDF',
    descriptionAr: 'تحويل صفحات الويب إلى PDF',
    descriptionEn: 'Convert web pages to PDF',
    keywordsAr: ['تحويل', 'html', 'pdf', 'ويب', 'صفحة'],
    keywordsEn: ['convert', 'html', 'pdf', 'web', 'page'],
    path: '/tools/html-to-pdf',
    category: 'pdf'
  },
  {
    id: 'pdf-rotate',
    nameAr: 'تدوير PDF',
    nameEn: 'PDF Rotate',
    descriptionAr: 'تدوير صفحات PDF',
    descriptionEn: 'Rotate PDF pages',
    keywordsAr: ['تدوير', 'pdf', 'صفحة', 'قلب'],
    keywordsEn: ['rotate', 'pdf', 'page', 'turn'],
    path: '/tools/pdf-rotate',
    category: 'pdf'
  },
  {
    id: 'pdf-sign',
    nameAr: 'توقيع PDF',
    nameEn: 'PDF Sign',
    descriptionAr: 'إضافة توقيع إلكتروني لملفات PDF',
    descriptionEn: 'Add electronic signature to PDF files',
    keywordsAr: ['توقيع', 'pdf', 'إلكتروني', 'امضاء'],
    keywordsEn: ['sign', 'pdf', 'electronic', 'signature'],
    path: '/tools/pdf-sign',
    category: 'pdf'
  },
  {
    id: 'pdf-watermark',
    nameAr: 'علامة مائية PDF',
    nameEn: 'PDF Watermark',
    descriptionAr: 'إضافة علامة مائية لملفات PDF',
    descriptionEn: 'Add watermark to PDF files',
    keywordsAr: ['علامة مائية', 'pdf', 'شعار', 'حماية'],
    keywordsEn: ['watermark', 'pdf', 'logo', 'protect'],
    path: '/tools/pdf-watermark',
    category: 'pdf'
  },
  {
    id: 'pdf-protect',
    nameAr: 'حماية PDF',
    nameEn: 'PDF Protect',
    descriptionAr: 'حماية ملفات PDF بكلمة مرور',
    descriptionEn: 'Protect PDF files with password',
    keywordsAr: ['حماية', 'pdf', 'كلمة مرور', 'تشفير', 'قفل'],
    keywordsEn: ['protect', 'pdf', 'password', 'encrypt', 'lock'],
    path: '/tools/pdf-protect',
    category: 'pdf'
  },
  {
    id: 'pdf-page-numbers',
    nameAr: 'ترقيم صفحات PDF',
    nameEn: 'PDF Page Numbers',
    descriptionAr: 'إضافة أرقام للصفحات في ملفات PDF',
    descriptionEn: 'Add page numbers to PDF files',
    keywordsAr: ['ترقيم', 'pdf', 'صفحة', 'أرقام'],
    keywordsEn: ['number', 'pdf', 'page', 'numbering'],
    path: '/tools/pdf-page-numbers',
    category: 'pdf'
  },

  // Text Tools
  {
    id: 'text-counter',
    nameAr: 'عداد النصوص',
    nameEn: 'Text Counter',
    descriptionAr: 'عد الحروف والكلمات والجمل',
    descriptionEn: 'Count characters, words, and sentences',
    keywordsAr: ['عد', 'نص', 'حروف', 'كلمات', 'جمل', 'عداد'],
    keywordsEn: ['count', 'text', 'characters', 'words', 'sentences', 'counter'],
    path: '/tools/text-counter',
    category: 'text'
  },
  {
    id: 'text-formatter',
    nameAr: 'تنسيق النصوص',
    nameEn: 'Text Formatter',
    descriptionAr: 'تنسيق وتحويل حالة النصوص',
    descriptionEn: 'Format and convert text case',
    keywordsAr: ['تنسيق', 'نص', 'حروف كبيرة', 'حروف صغيرة', 'تحويل'],
    keywordsEn: ['format', 'text', 'uppercase', 'lowercase', 'convert'],
    path: '/tools/text-formatter',
    category: 'text'
  },
  {
    id: 'text-diff',
    nameAr: 'مقارنة النصوص',
    nameEn: 'Text Diff',
    descriptionAr: 'مقارنة نصين وإظهار الفروقات',
    descriptionEn: 'Compare two texts and show differences',
    keywordsAr: ['مقارنة', 'نص', 'فرق', 'اختلاف'],
    keywordsEn: ['compare', 'text', 'diff', 'difference'],
    path: '/tools/text-diff',
    category: 'text'
  },
  {
    id: 'lorem-generator',
    nameAr: 'مولد نص عشوائي',
    nameEn: 'Lorem Generator',
    descriptionAr: 'توليد نص عشوائي للتصميم',
    descriptionEn: 'Generate placeholder text for design',
    keywordsAr: ['نص عشوائي', 'lorem', 'تصميم', 'نموذج'],
    keywordsEn: ['random text', 'lorem', 'design', 'placeholder'],
    path: '/tools/lorem-generator',
    category: 'text'
  },
  {
    id: 'slug-generator',
    nameAr: 'مولد الروابط',
    nameEn: 'Slug Generator',
    descriptionAr: 'تحويل النص إلى رابط صديق للسيو',
    descriptionEn: 'Convert text to SEO-friendly URL slug',
    keywordsAr: ['رابط', 'سيو', 'url', 'slug'],
    keywordsEn: ['slug', 'seo', 'url', 'link'],
    path: '/tools/slug-generator',
    category: 'text'
  },

  // Color Tools
  {
    id: 'color-picker',
    nameAr: 'منتقي الألوان',
    nameEn: 'Color Picker',
    descriptionAr: 'اختيار الألوان والحصول على الأكواد',
    descriptionEn: 'Pick colors and get color codes',
    keywordsAr: ['لون', 'منتقي', 'اختيار', 'كود'],
    keywordsEn: ['color', 'picker', 'choose', 'code'],
    path: '/tools/color-picker',
    category: 'color'
  },
  {
    id: 'color-converter',
    nameAr: 'محول الألوان',
    nameEn: 'Color Converter',
    descriptionAr: 'تحويل الألوان بين HEX, RGB, HSL',
    descriptionEn: 'Convert colors between HEX, RGB, HSL',
    keywordsAr: ['تحويل', 'لون', 'hex', 'rgb', 'hsl'],
    keywordsEn: ['convert', 'color', 'hex', 'rgb', 'hsl'],
    path: '/tools/color-converter',
    category: 'color'
  },
  {
    id: 'color-palette',
    nameAr: 'لوحة الألوان',
    nameEn: 'Color Palette',
    descriptionAr: 'إنشاء لوحات ألوان متناسقة',
    descriptionEn: 'Create harmonious color palettes',
    keywordsAr: ['لوحة', 'ألوان', 'تناسق', 'تصميم'],
    keywordsEn: ['palette', 'colors', 'harmony', 'design'],
    path: '/tools/color-palette',
    category: 'color'
  },
  {
    id: 'contrast-checker',
    nameAr: 'فاحص التباين',
    nameEn: 'Contrast Checker',
    descriptionAr: 'فحص تباين الألوان للوصولية',
    descriptionEn: 'Check color contrast for accessibility',
    keywordsAr: ['تباين', 'لون', 'وصولية', 'فحص'],
    keywordsEn: ['contrast', 'color', 'accessibility', 'check'],
    path: '/tools/contrast-checker',
    category: 'color'
  },
  {
    id: 'gradient-generator',
    nameAr: 'مولد التدرجات',
    nameEn: 'Gradient Generator',
    descriptionAr: 'إنشاء تدرجات لونية CSS',
    descriptionEn: 'Create CSS color gradients',
    keywordsAr: ['تدرج', 'لون', 'css', 'خلفية'],
    keywordsEn: ['gradient', 'color', 'css', 'background'],
    path: '/tools/gradient-generator',
    category: 'color'
  },

  // Calculator Tools
  {
    id: 'percentage-calculator',
    nameAr: 'حاسبة النسبة المئوية',
    nameEn: 'Percentage Calculator',
    descriptionAr: 'حساب النسب المئوية والخصومات',
    descriptionEn: 'Calculate percentages and discounts',
    keywordsAr: ['نسبة', 'مئوية', 'حساب', 'خصم'],
    keywordsEn: ['percentage', 'calculate', 'discount'],
    path: '/tools/percentage-calculator',
    category: 'calculator'
  },
  {
    id: 'age-calculator',
    nameAr: 'حاسبة العمر',
    nameEn: 'Age Calculator',
    descriptionAr: 'حساب العمر بالتفصيل',
    descriptionEn: 'Calculate age in detail',
    keywordsAr: ['عمر', 'حساب', 'تاريخ الميلاد', 'سن'],
    keywordsEn: ['age', 'calculate', 'birthday', 'years'],
    path: '/tools/age-calculator',
    category: 'calculator'
  },
  {
    id: 'bmi-calculator',
    nameAr: 'حاسبة مؤشر كتلة الجسم',
    nameEn: 'BMI Calculator',
    descriptionAr: 'حساب مؤشر كتلة الجسم',
    descriptionEn: 'Calculate Body Mass Index',
    keywordsAr: ['bmi', 'وزن', 'صحة', 'جسم', 'مؤشر'],
    keywordsEn: ['bmi', 'weight', 'health', 'body', 'index'],
    path: '/tools/bmi-calculator',
    category: 'calculator'
  },
  {
    id: 'unit-converter',
    nameAr: 'محول الوحدات',
    nameEn: 'Unit Converter',
    descriptionAr: 'تحويل بين الوحدات المختلفة',
    descriptionEn: 'Convert between different units',
    keywordsAr: ['تحويل', 'وحدات', 'متر', 'كيلو', 'قياس'],
    keywordsEn: ['convert', 'units', 'meter', 'kilo', 'measure'],
    path: '/tools/unit-converter',
    category: 'calculator'
  },
  {
    id: 'tip-calculator',
    nameAr: 'حاسبة البقشيش',
    nameEn: 'Tip Calculator',
    descriptionAr: 'حساب البقشيش وتقسيم الفاتورة',
    descriptionEn: 'Calculate tip and split bill',
    keywordsAr: ['بقشيش', 'فاتورة', 'حساب', 'تقسيم'],
    keywordsEn: ['tip', 'bill', 'calculate', 'split'],
    path: '/tools/tip-calculator',
    category: 'calculator'
  }
];

// Common questions dataset for chatbot
export interface QuestionData {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  keywords: string[];
  relatedTool?: string;
}

export const questionsDataset: QuestionData[] = [
  {
    questionAr: 'كيف أحول PDF إلى صورة؟',
    questionEn: 'How to convert PDF to image?',
    answerAr: 'يمكنك استخدام أداة "تحويل PDF إلى صور" لتحويل صفحات PDF إلى صور بجودة عالية.',
    answerEn: 'You can use the "PDF to Image" tool to convert PDF pages to high-quality images.',
    keywords: ['pdf', 'image', 'convert', 'صورة', 'تحويل'],
    relatedTool: 'pdf-to-image'
  },
  {
    questionAr: 'كيف أضغط حجم الصورة؟',
    questionEn: 'How to compress image size?',
    answerAr: 'استخدم أداة "ضغط الصور" لتقليل حجم الصورة مع الحفاظ على جودتها.',
    answerEn: 'Use the "Image Compressor" tool to reduce image size while maintaining quality.',
    keywords: ['compress', 'image', 'size', 'ضغط', 'صورة', 'حجم'],
    relatedTool: 'image-compressor'
  },
  {
    questionAr: 'كيف أدمج ملفات PDF؟',
    questionEn: 'How to merge PDF files?',
    answerAr: 'استخدم أداة "دمج ملفات PDF" لجمع عدة ملفات PDF في ملف واحد.',
    answerEn: 'Use the "PDF Merge" tool to combine multiple PDF files into one.',
    keywords: ['merge', 'pdf', 'combine', 'دمج', 'جمع'],
    relatedTool: 'pdf-merge'
  },
  {
    questionAr: 'كيف أنشئ رمز QR؟',
    questionEn: 'How to create QR code?',
    answerAr: 'استخدم أداة "مولد رمز QR" لإنشاء رموز QR مخصصة للروابط والنصوص.',
    answerEn: 'Use the "QR Code Generator" tool to create custom QR codes for links and text.',
    keywords: ['qr', 'create', 'code', 'إنشاء', 'كيو ار'],
    relatedTool: 'qr-generator'
  },
  {
    questionAr: 'كيف أحول صورة إلى PDF؟',
    questionEn: 'How to convert image to PDF?',
    answerAr: 'استخدم أداة "تحويل صور إلى PDF" لتحويل صورة أو مجموعة صور إلى ملف PDF.',
    answerEn: 'Use the "Image to PDF" tool to convert one or multiple images to a PDF file.',
    keywords: ['image', 'pdf', 'convert', 'صورة', 'تحويل'],
    relatedTool: 'image-to-pdf'
  },
  {
    questionAr: 'كيف أغير حجم الصورة؟',
    questionEn: 'How to resize image?',
    answerAr: 'استخدم أداة "تغيير حجم الصور" لتعديل أبعاد الصورة بالبكسل أو النسبة المئوية.',
    answerEn: 'Use the "Image Resizer" tool to adjust image dimensions by pixels or percentage.',
    keywords: ['resize', 'image', 'size', 'تغيير', 'حجم', 'صورة'],
    relatedTool: 'image-resizer'
  },
  {
    questionAr: 'هل الأدوات مجانية؟',
    questionEn: 'Are the tools free?',
    answerAr: 'نعم! جميع أدواتنا مجانية تماماً ولا تتطلب تسجيل حساب.',
    answerEn: 'Yes! All our tools are completely free and require no registration.',
    keywords: ['free', 'مجاني', 'مجانية', 'cost', 'price']
  },
  {
    questionAr: 'هل بياناتي آمنة؟',
    questionEn: 'Is my data safe?',
    answerAr: 'نعم، جميع العمليات تتم في متصفحك فقط ولا يتم رفع أي ملفات إلى خوادمنا.',
    answerEn: 'Yes, all processing happens in your browser only and no files are uploaded to our servers.',
    keywords: ['safe', 'secure', 'privacy', 'آمن', 'خصوصية', 'أمان']
  }
];

// Create Fuse instances
const toolsFuseOptions = {
  keys: ['nameAr', 'nameEn', 'descriptionAr', 'descriptionEn', 'keywordsAr', 'keywordsEn'],
  threshold: 0.4,
  includeScore: true
};

const questionsFuseOptions = {
  keys: ['questionAr', 'questionEn', 'keywords', 'answerAr', 'answerEn'],
  threshold: 0.4,
  includeScore: true
};

const toolsFuse = new Fuse(toolsDataset, toolsFuseOptions);
const questionsFuse = new Fuse(questionsDataset, questionsFuseOptions);

export interface SearchResult {
  type: 'tool' | 'question' | 'fallback';
  response: string;
  toolPath?: string;
  toolName?: string;
}

export function smartSearch(query: string, isRTL: boolean = true): SearchResult {
  if (!query.trim()) {
    return {
      type: 'fallback',
      response: isRTL 
        ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟ اكتب سؤالك أو ابحث عن أداة.' 
        : 'Hello! How can I help you today? Type your question or search for a tool.'
    };
  }

  // Search in questions first
  const questionResults = questionsFuse.search(query);
  if (questionResults.length > 0 && questionResults[0].score && questionResults[0].score < 0.3) {
    const match = questionResults[0].item;
    const response = isRTL ? match.answerAr : match.answerEn;
    
    if (match.relatedTool) {
      const tool = toolsDataset.find(t => t.id === match.relatedTool);
      if (tool) {
        return {
          type: 'question',
          response,
          toolPath: tool.path,
          toolName: isRTL ? tool.nameAr : tool.nameEn
        };
      }
    }
    
    return { type: 'question', response };
  }

  // Search in tools
  const toolResults = toolsFuse.search(query);
  if (toolResults.length > 0 && toolResults[0].score && toolResults[0].score < 0.4) {
    const tool = toolResults[0].item;
    const toolName = isRTL ? tool.nameAr : tool.nameEn;
    const toolDesc = isRTL ? tool.descriptionAr : tool.descriptionEn;
    
    const response = isRTL
      ? `وجدت لك أداة "${toolName}" - ${toolDesc}. انقر للانتقال إلى الأداة.`
      : `Found "${toolName}" - ${toolDesc}. Click to go to the tool.`;
    
    return {
      type: 'tool',
      response,
      toolPath: tool.path,
      toolName
    };
  }

  // If we have partial matches, suggest them
  if (toolResults.length > 0) {
    const suggestions = toolResults.slice(0, 3).map(r => isRTL ? r.item.nameAr : r.item.nameEn);
    const response = isRTL
      ? `لم أجد نتيجة دقيقة، لكن ربما تبحث عن: ${suggestions.join('، ')}`
      : `No exact match found, but you might be looking for: ${suggestions.join(', ')}`;
    
    return { type: 'fallback', response };
  }

  // Fallback response
  return {
    type: 'fallback',
    response: isRTL
      ? 'عذراً، لم أتمكن من العثور على ما تبحث عنه. جرب البحث بكلمات مختلفة أو تصفح الأدوات المتاحة.'
      : 'Sorry, I couldn\'t find what you\'re looking for. Try different keywords or browse available tools.'
  };
}
