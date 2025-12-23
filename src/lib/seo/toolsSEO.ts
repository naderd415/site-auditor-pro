// SEO-optimized content for all tools
// Title: Max 60 chars | Description: Max 160 chars | Article: 300-500 words

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string;
  article: string;
}

export interface ToolsSEOData {
  imageConverter: ToolSEO;
  imageCompressor: ToolSEO;
  imageResizer: ToolSEO;
  imageCropper: ToolSEO;
  backgroundRemover: ToolSEO;
  imageToBase64: ToolSEO;
  pdfMerge: ToolSEO;
  pdfSplit: ToolSEO;
  pdfCompress: ToolSEO;
  pdfToImage: ToolSEO;
  imageToPdf: ToolSEO;
  textCounter: ToolSEO;
  textFormatter: ToolSEO;
  textDiff: ToolSEO;
  loremGenerator: ToolSEO;
  slugGenerator: ToolSEO;
  colorPicker: ToolSEO;
  colorPalette: ToolSEO;
  colorConverter: ToolSEO;
  gradientGenerator: ToolSEO;
  contrastChecker: ToolSEO;
  percentageCalculator: ToolSEO;
  ageCalculator: ToolSEO;
  bmiCalculator: ToolSEO;
  unitConverter: ToolSEO;
  tipCalculator: ToolSEO;
  qrGenerator: ToolSEO;
  qrScanner: ToolSEO;
}

export const toolsSEO: Record<'ar' | 'en', ToolsSEOData> = {
  ar: {
    imageConverter: {
      title: 'محول الصور المجاني - حول PNG, JPG, WebP اونلاين',
      description: 'محول صور مجاني اونلاين. حول صورك بين PNG, JPG, WebP, GIF بسرعة وجودة عالية. بدون تسجيل أو تحميل برامج.',
      keywords: 'محول الصور, تحويل الصور, PNG إلى JPG, JPG إلى PNG, WebP, تحويل صيغة الصورة, محول صور اونلاين, image converter',
      article: `محول الصور المجاني هو أداة احترافية تتيح لك تحويل صورك بين مختلف الصيغ الشائعة مثل PNG و JPG و WebP و GIF بكل سهولة ودون الحاجة لتثبيت أي برامج.

لماذا تحتاج محول الصور؟
تختلف صيغ الصور في خصائصها واستخداماتها. فصيغة PNG تدعم الشفافية وتناسب الشعارات والأيقونات، بينما صيغة JPG أصغر حجماً وتناسب الصور الفوتوغرافية. أما WebP فهي الصيغة الأحدث التي توفر ضغطاً أفضل مع جودة عالية.

مميزات أداتنا:
- تحويل فوري بدون انتظار أو تحميل على خوادم
- دعم جميع الصيغ الشائعة (PNG, JPG, WebP, GIF, BMP)
- الحفاظ على جودة الصورة الأصلية
- خيار تحديد جودة الضغط
- عمل مباشر من المتصفح بدون رفع ملفاتك
- مجاني 100% بدون حدود للاستخدام

كيفية الاستخدام:
1. ارفع صورتك بالسحب والإفلات أو بالضغط
2. اختر الصيغة المطلوبة (PNG, JPG, WebP)
3. حدد جودة الضغط إن أردت
4. اضغط تحويل واحصل على صورتك فوراً

نصائح للاستخدام الأمثل:
- استخدم PNG للصور التي تحتاج شفافية
- استخدم JPG للصور الفوتوغرافية لحجم أصغر
- استخدم WebP للحصول على أفضل توازن بين الحجم والجودة`
    },
    imageCompressor: {
      title: 'ضاغط الصور المجاني - قلل حجم صورك اونلاين',
      description: 'اضغط صورك اونلاين مجاناً. قلل حجم الصور مع الحفاظ على الجودة. دعم PNG, JPG, WebP. سريع وآمن بدون رفع للسيرفر.',
      keywords: 'ضغط الصور, تقليل حجم الصور, ضاغط صور, compress image, تصغير حجم الصورة, ضغط PNG, ضغط JPG',
      article: `ضاغط الصور المجاني يساعدك على تقليل حجم ملفات صورك بشكل كبير مع الحفاظ على جودتها المرئية. أداة أساسية لتحسين سرعة موقعك وتوفير مساحة التخزين.

لماذا ضغط الصور مهم؟
الصور كبيرة الحجم تبطئ تحميل المواقع وتؤثر سلباً على تجربة المستخدم وترتيب محركات البحث. ضغط الصور يساعد على:
- تسريع تحميل صفحات الموقع
- تحسين ترتيب SEO في جوجل
- توفير استهلاك البيانات للزوار
- تسهيل مشاركة الصور عبر البريد والتطبيقات

مميزات ضاغط الصور لدينا:
- ضغط ذكي يحافظ على الجودة
- تحكم كامل في نسبة الضغط
- معاينة فورية للنتيجة
- دعم PNG, JPG, WebP
- لا حاجة لتسجيل أو اشتراك
- خصوصية تامة - الملفات لا ترفع للسيرفر

كيف تستخدم ضاغط الصور؟
1. ارفع صورتك
2. حدد مستوى الجودة المطلوب
3. شاهد الحجم قبل وبعد الضغط
4. حمّل الصورة المضغوطة`
    },
    imageResizer: {
      title: 'تغيير حجم الصور مجاناً - أداة تعديل أبعاد الصور',
      description: 'غير حجم وأبعاد صورك اونلاين مجاناً. أداة سهلة لتكبير وتصغير الصور مع الحفاظ على النسبة. دعم جميع الصيغ.',
      keywords: 'تغيير حجم الصور, تعديل أبعاد الصور, resize image, تكبير الصور, تصغير الصور, أبعاد الصورة',
      article: `أداة تغيير حجم الصور المجانية تتيح لك تعديل أبعاد صورك بسهولة ودقة. سواء كنت تريد تصغير صورة للويب أو تكبيرها للطباعة، هذه الأداة تلبي احتياجاتك.

استخدامات تغيير حجم الصور:
- تحضير صور للسوشيال ميديا (انستغرام، فيسبوك، تويتر)
- تصغير الصور للبريد الإلكتروني
- تجهيز صور للطباعة بدقة عالية
- توحيد أحجام صور المنتجات للمتاجر
- إنشاء صور مصغرة thumbnails

مميزات أداتنا:
- قفل/فتح نسبة الأبعاد
- أحجام سريعة معدة مسبقاً (50%, 75%, 150%, 200%)
- تحديد الأبعاد بالبكسل بدقة
- جودة عالية في التكبير والتصغير
- معاينة فورية للنتيجة

نصائح لتغيير الحجم:
- احتفظ بنسبة الأبعاد الأصلية لتجنب التشوه
- للويب: استخدم أبعاد مناسبة لتسريع التحميل
- للطباعة: تأكد من دقة 300 DPI على الأقل`
    },
    imageCropper: {
      title: 'قص الصور اونلاين مجاناً - أداة اقتصاص الصور',
      description: 'اقتص صورك اونلاين مجاناً. أداة قص الصور السهلة مع خيارات تدوير وقلب. مثالية لصور البروفايل والسوشيال ميديا.',
      keywords: 'قص الصور, اقتصاص الصور, crop image, تدوير الصور, قص صورة, أداة قص الصور اونلاين',
      article: `أداة قص الصور المجانية تمكنك من اقتصاص وتعديل صورك باحترافية. حدد المنطقة التي تريدها بدقة واحصل على صورة مثالية.

استخدامات قص الصور:
- إنشاء صور بروفايل مربعة
- إزالة الأجزاء غير المرغوبة من الصورة
- تركيز الانتباه على العنصر الرئيسي
- تحضير صور للسوشيال ميديا بنسب محددة
- قص صور المنتجات للمتاجر الإلكترونية

مميزات أداة القص:
- تحديد حر لمنطقة القص
- نسب أبعاد محددة مسبقاً (1:1, 4:3, 16:9)
- تدوير الصورة 90 درجة
- قلب الصورة أفقياً وعمودياً
- معاينة فورية للنتيجة
- تحميل بجودة أصلية

كيفية القص:
1. ارفع صورتك
2. حدد المنطقة المراد قصها بالماوس
3. استخدم أدوات التدوير إن أردت
4. اضغط قص وحمّل الصورة`
    },
    backgroundRemover: {
      title: 'إزالة خلفية الصور بالذكاء الاصطناعي - مجاني',
      description: 'أزل خلفية صورك تلقائياً بالذكاء الاصطناعي. مثالي لصور المنتجات والبورتريه. مجاني 100% ويعمل من المتصفح.',
      keywords: 'إزالة الخلفية, حذف خلفية الصورة, remove background, خلفية شفافة, إزالة خلفية الصور, AI background remover',
      article: `أداة إزالة خلفية الصور تستخدم تقنية الذكاء الاصطناعي المتقدمة لحذف خلفية صورك تلقائياً والحصول على صورة بخلفية شفافة.

استخدامات إزالة الخلفية:
- صور المنتجات للمتاجر الإلكترونية
- صور البورتريه الاحترافية
- تصميم الشعارات والجرافيك
- إنشاء ملصقات واستيكرات
- تحرير الصور للسوشيال ميديا
- تصميم المطبوعات

مميزات أداتنا:
- ذكاء اصطناعي متقدم للكشف الدقيق عن الحواف
- معالجة فورية من المتصفح
- دعم صور بدقة عالية
- تحميل بصيغة PNG مع شفافية
- لا حاجة لتسجيل أو اشتراك
- خصوصية تامة - الصور تعالج محلياً

كيفية الاستخدام:
1. ارفع الصورة المراد إزالة خلفيتها
2. انتظر معالجة الذكاء الاصطناعي
3. شاهد النتيجة بخلفية شفافة
4. حمّل الصورة بصيغة PNG

نصائح للحصول على أفضل نتيجة:
- استخدم صور بإضاءة جيدة
- تجنب الصور ذات الحواف المعقدة جداً
- الصور عالية الدقة تعطي نتائج أفضل`
    },
    imageToBase64: {
      title: 'تحويل الصور إلى Base64 - أداة ترميز الصور',
      description: 'حول صورك إلى كود Base64 مجاناً. مفيد للمطورين لتضمين الصور في HTML وCSS مباشرة. نسخ سريع للكود.',
      keywords: 'صورة إلى Base64, تحويل Base64, data URL, ترميز الصور, image to base64, encode image',
      article: `أداة تحويل الصور إلى Base64 تحول صورك إلى نص مشفر يمكن استخدامه مباشرة في الكود دون الحاجة لملف خارجي.

ما هو Base64؟
Base64 هو نظام ترميز يحول البيانات الثنائية (مثل الصور) إلى نص. هذا يسمح بتضمين الصور مباشرة في HTML, CSS, أو JavaScript.

استخدامات Base64:
- تضمين الصور الصغيرة مباشرة في HTML
- إنشاء Data URLs للـ CSS backgrounds
- تخزين الصور في قواعد البيانات
- إرسال الصور عبر APIs
- تضمين الأيقونات في ملفات CSS

مميزات الأداة:
- تحويل فوري لأي صورة
- نسخ الكود بضغطة واحدة
- عرض حجم البيانات المشفرة
- دعم جميع صيغ الصور
- معاينة الصورة الأصلية

متى تستخدم Base64؟
- للصور الصغيرة (أقل من 10KB)
- لتقليل طلبات HTTP
- عندما تحتاج صورة في ملف واحد`
    },
    pdfMerge: {
      title: 'دمج ملفات PDF مجاناً - أداة جمع PDF اونلاين',
      description: 'ادمج ملفات PDF متعددة في ملف واحد مجاناً. رتب الملفات كما تريد. سريع وآمن بدون رفع للسيرفر.',
      keywords: 'دمج PDF, جمع ملفات PDF, merge PDF, combine PDF, دمج ملفات PDF اونلاين',
      article: `أداة دمج PDF تتيح لك جمع عدة ملفات PDF في ملف واحد بسهولة وسرعة. مثالية لتنظيم المستندات وإنشاء ملفات موحدة.

لماذا تدمج ملفات PDF؟
- تجميع فصول كتاب في ملف واحد
- جمع مستندات مشروع معاً
- إنشاء تقارير شاملة
- تنظيم الفواتير والإيصالات
- تحضير ملفات للطباعة

مميزات أداة الدمج:
- إضافة ملفات متعددة دفعة واحدة
- إعادة ترتيب الملفات بالسحب والإفلات
- عرض عدد صفحات كل ملف
- معالجة سريعة في المتصفح
- لا حدود لحجم أو عدد الملفات
- تحميل الملف المدمج فوراً

كيفية الدمج:
1. اضغط لاختيار ملفات PDF
2. رتب الملفات بالترتيب المطلوب
3. اضغط دمج وتحميل
4. احصل على ملف PDF موحد`
    },
    pdfSplit: {
      title: 'تقسيم PDF مجاناً - فصل صفحات PDF اونلاين',
      description: 'قسم ملف PDF إلى ملفات منفصلة مجاناً. استخرج صفحات محددة أو قسم الملف كاملاً. سهل وسريع.',
      keywords: 'تقسيم PDF, فصل PDF, split PDF, استخراج صفحات PDF, تجزئة ملف PDF',
      article: `أداة تقسيم PDF تمكنك من فصل ملف PDF إلى ملفات متعددة أو استخراج صفحات محددة بسهولة.

استخدامات تقسيم PDF:
- استخراج فصل من كتاب
- فصل صفحات محددة للمشاركة
- تقسيم تقرير طويل
- استخراج صفحة واحدة
- تجزئة ملف كبير لسهولة الإرسال

مميزات الأداة:
- استخراج صفحات محددة
- تقسيم لملفات منفصلة لكل صفحة
- عرض عدد الصفحات الإجمالي
- معالجة سريعة وآمنة
- تحميل كل صفحة منفردة
- مجاني بدون حدود

كيفية التقسيم:
1. ارفع ملف PDF
2. اختر الصفحات المراد استخراجها
3. اضغط تقسيم
4. حمّل الملفات المنفصلة`
    },
    pdfCompress: {
      title: 'ضغط PDF مجاناً - تقليل حجم ملفات PDF',
      description: 'اضغط ملفات PDF وقلل حجمها مجاناً. حافظ على الجودة مع تصغير الحجم. مثالي للإيميل والمشاركة.',
      keywords: 'ضغط PDF, تصغير حجم PDF, compress PDF, تقليل حجم ملف PDF, ضغط ملفات PDF اونلاين',
      article: `أداة ضغط PDF تساعدك على تقليل حجم ملفات PDF الكبيرة مع الحفاظ على جودة المحتوى والصور.

لماذا تضغط PDF؟
- تسهيل الإرسال عبر البريد الإلكتروني
- توفير مساحة التخزين
- تسريع تحميل الملفات
- تقليل استهلاك البيانات
- مشاركة أسهل عبر الإنترنت

مميزات ضاغط PDF:
- ضغط ذكي يحافظ على الجودة
- تخفيض يصل إلى 80% من الحجم
- معالجة سريعة في المتصفح
- لا حاجة لتسجيل
- خصوصية تامة للملفات
- مجاني 100%

مستويات الضغط:
- ضغط خفيف: جودة عالية، تخفيض 30%
- ضغط متوسط: توازن جيد، تخفيض 50%
- ضغط قوي: حجم أصغر، تخفيض 70%+`
    },
    pdfToImage: {
      title: 'تحويل PDF إلى صور مجاناً - PDF to Image',
      description: 'حول صفحات PDF إلى صور PNG عالية الجودة مجاناً. استخرج كل صفحة كصورة منفصلة. سريع وسهل.',
      keywords: 'PDF إلى صورة, تحويل PDF لصور, PDF to PNG, PDF to image, تحويل PDF اونلاين',
      article: `أداة تحويل PDF إلى صور تحول كل صفحة من ملف PDF إلى صورة PNG عالية الجودة.

استخدامات تحويل PDF لصور:
- مشاركة صفحات محددة على السوشيال ميديا
- تحرير محتوى PDF في برامج الصور
- عرض صفحات PDF كصور في المواقع
- إنشاء عروض تقديمية
- حفظ صفحات مهمة كصور

مميزات الأداة:
- تحويل جميع الصفحات دفعة واحدة
- جودة صور عالية (PNG)
- تحميل كل صورة منفردة
- تحميل جميع الصور دفعة واحدة
- معالجة سريعة
- مجاني بدون حدود

كيفية التحويل:
1. ارفع ملف PDF
2. اضغط تحويل إلى صور
3. شاهد معاينة كل صفحة
4. حمّل الصور`
    },
    imageToPdf: {
      title: 'تحويل الصور إلى PDF مجاناً - دمج صور في PDF',
      description: 'حول صورك إلى ملف PDF واحد مجاناً. رتب الصور ودمجها في PDF. مثالي لإنشاء ألبومات ومستندات.',
      keywords: 'صورة إلى PDF, تحويل صور لـ PDF, image to PDF, دمج صور في PDF, إنشاء PDF من صور',
      article: `أداة تحويل الصور إلى PDF تجمع صورك المتعددة في ملف PDF واحد منظم وسهل المشاركة.

استخدامات الأداة:
- إنشاء ألبوم صور رقمي
- تجميع مستندات ممسوحة
- إنشاء كتالوج منتجات
- تحضير portfolio
- جمع صور مشروع في ملف واحد

مميزات الأداة:
- إضافة صور متعددة
- إعادة ترتيب الصور بالسحب
- معاينة قبل التحويل
- جودة عالية للصور في PDF
- ملف PDF قابل للطباعة
- مجاني بدون حدود

كيفية التحويل:
1. اختر صورك (يمكن اختيار عدة صور)
2. رتب الصور بالترتيب المطلوب
3. اضغط تحويل إلى PDF
4. حمّل ملف PDF`
    },
    textCounter: {
      title: 'عداد الكلمات والحروف مجاناً - Text Counter',
      description: 'احسب عدد الكلمات، الحروف، الجمل والفقرات في نصك. عداد نصوص دقيق مع وقت القراءة المتوقع.',
      keywords: 'عداد الكلمات, عداد الحروف, word counter, character counter, حساب الكلمات, عد الحروف',
      article: `عداد النصوص هو أداة أساسية للكتاب والمحررين والطلاب لقياس وتحليل نصوصهم بدقة.

إحصائيات النص:
- عدد الأحرف (مع وبدون مسافات)
- عدد الكلمات
- عدد الجمل
- عدد الفقرات
- عدد الأسطر
- وقت القراءة المتوقع

استخدامات عداد النصوص:
- التأكد من عدد كلمات المقالات
- حساب أحرف تغريدات تويتر
- قياس طول المحتوى لـ SEO
- التحقق من حدود النصوص في النماذج
- تقدير وقت القراءة للقراء

مميزات الأداة:
- إحصائيات فورية أثناء الكتابة
- حسابات دقيقة
- واجهة سهلة الاستخدام
- دعم العربية والإنجليزية
- مجاني بدون حدود`
    },
    textFormatter: {
      title: 'منسق النصوص - تحويل الأحرف الكبيرة والصغيرة',
      description: 'نسق نصك: أحرف كبيرة، صغيرة، عنوان، جملة والمزيد. أداة تنسيق نصوص مجانية وسهلة الاستخدام.',
      keywords: 'تنسيق النص, أحرف كبيرة, أحرف صغيرة, uppercase, lowercase, title case, منسق النصوص',
      article: `منسق النصوص يوفر تحويلات متعددة لتنسيق نصوصك بسرعة وسهولة.

خيارات التنسيق:
- UPPERCASE: تحويل لأحرف كبيرة
- lowercase: تحويل لأحرف صغيرة
- Title Case: كل كلمة تبدأ بحرف كبير
- Sentence case: بداية الجملة فقط كبيرة
- aLtErNaTiNg: تبديل بين كبير وصغير
- إزالة المسافات الزائدة

استخدامات التنسيق:
- تصحيح نصوص مكتوبة بـ CAPS LOCK
- تنسيق عناوين المقالات
- توحيد تنسيق البيانات
- تحضير نصوص للنشر
- تنظيف النصوص المنسوخة

كيفية الاستخدام:
1. ألصق أو اكتب نصك
2. اختر التنسيق المطلوب
3. انسخ النص المنسق`
    },
    textDiff: {
      title: 'مقارنة النصوص - اعثر على الاختلافات بين نصين',
      description: 'قارن بين نصين واعثر على الفروقات. أداة مقارنة نصوص مجانية تظهر الإضافات والحذف والتعديلات.',
      keywords: 'مقارنة النصوص, فروقات النصوص, text diff, compare text, مقارنة ملفات نصية',
      article: `أداة مقارنة النصوص تساعدك على اكتشاف الفروقات بين نصين بدقة، مع تحديد الإضافات والحذف.

استخدامات مقارنة النصوص:
- مراجعة تعديلات المستندات
- مقارنة إصدارات الكود
- اكتشاف التغييرات في العقود
- مراجعة تعديلات المقالات
- التحقق من النسخ الصحيحة

ما تظهره الأداة:
- النص المضاف (باللون الأخضر)
- النص المحذوف (باللون الأحمر)
- النص المتغير
- النص المتطابق

مميزات الأداة:
- مقارنة فورية
- تحديد واضح للفروقات بالألوان
- دعم النصوص الطويلة
- مجانية بالكامل`
    },
    loremGenerator: {
      title: 'مولد Lorem Ipsum - نص تجريبي للتصميم',
      description: 'أنشئ نص Lorem Ipsum للتصميم والتطوير. حدد عدد الفقرات أو الكلمات. مولد نص وهمي احترافي.',
      keywords: 'Lorem Ipsum, نص تجريبي, نص وهمي, placeholder text, مولد نص, dummy text',
      article: `مولد Lorem Ipsum يوفر نصوص تجريبية للمصممين والمطورين لملء التصاميم قبل توفر المحتوى الحقيقي.

ما هو Lorem Ipsum؟
Lorem Ipsum هو نص لاتيني وهمي يستخدم في صناعة الطباعة والتصميم منذ القرن السادس عشر. يوفر توزيعاً طبيعياً للحروف يشبه النص الحقيقي.

استخداماته:
- ملء تصاميم المواقع
- اختبار الخطوط والتنسيقات
- عرض نماذج التصميم للعملاء
- تطوير قوالب الطباعة
- اختبار طول المحتوى

خيارات التوليد:
- عدد الفقرات
- عدد الكلمات
- عدد الجمل
- بداية بـ "Lorem ipsum dolor sit amet..."`
    },
    slugGenerator: {
      title: 'مولد Slug - روابط URL صديقة للسيو',
      description: 'حول نصوصك إلى روابط URL نظيفة ومحسنة للسيو. مولد Slug مجاني يدعم العربية والإنجليزية.',
      keywords: 'مولد Slug, URL slug, روابط SEO, slug generator, رابط صديق للسيو, تحويل لـ URL',
      article: `مولد Slug يحول عناوينك ونصوصك إلى روابط URL نظيفة ومُحسنة لمحركات البحث.

ما هو Slug؟
Slug هو جزء من رابط URL يصف محتوى الصفحة بشكل مقروء. مثلاً:
example.com/blog/best-seo-practices

أهمية Slug الجيد:
- تحسين ترتيب محركات البحث (SEO)
- سهولة فهم الرابط للمستخدمين
- مشاركة أسهل على السوشيال ميديا
- تنظيم أفضل للموقع

التحويلات التي تتم:
- استبدال المسافات بشرطات
- تحويل للأحرف الصغيرة
- إزالة الأحرف الخاصة
- معالجة الأحرف العربية

استخدامات الأداة:
- إنشاء روابط للمقالات
- روابط صفحات المنتجات
- عناوين URL للصفحات`
    },
    colorPicker: {
      title: 'منتقي الألوان - احصل على كود HEX RGB HSL',
      description: 'اختر أي لون واحصل على كوده بصيغ HEX, RGB, HSL. منتقي ألوان مجاني للمصممين والمطورين.',
      keywords: 'منتقي الألوان, color picker, HEX, RGB, HSL, اختيار الألوان, كود اللون',
      article: `منتقي الألوان أداة أساسية للمصممين والمطورين للحصول على أكواد الألوان بمختلف الصيغ.

صيغ الألوان المدعومة:
- HEX: #00bcd4 (للويب وCSS)
- RGB: rgb(0, 188, 212) (للتصميم)
- HSL: hsl(187, 100%, 42%) (للتعديلات)

مميزات الأداة:
- اختيار لون من الطيف الكامل
- عرض جميع الصيغ فوراً
- نسخ الكود بضغطة واحدة
- توليد لون عشوائي
- معاينة اللون المختار

استخدامات منتقي الألوان:
- اختيار ألوان للتصميم
- مطابقة ألوان من صورة
- الحصول على أكواد للكود
- استكشاف الألوان`
    },
    colorPalette: {
      title: 'مولد لوحة الألوان - أنشئ تدرجات متناسقة',
      description: 'أنشئ لوحات ألوان متناسقة ومتكاملة لتصاميمك. مولد ألوان احترافي مع خيارات التناغم اللوني.',
      keywords: 'لوحة ألوان, color palette, تناغم الألوان, color harmony, مولد ألوان, palette generator',
      article: `مولد لوحة الألوان يساعدك على إنشاء مجموعات ألوان متناسقة ومتكاملة لمشاريعك.

أنواع التناغم اللوني:
- ألوان مكملة (Complementary)
- ألوان متجاورة (Analogous)
- ألوان ثلاثية (Triadic)
- ألوان منقسمة (Split-complementary)

استخدامات لوحات الألوان:
- تصميم الهوية البصرية
- واجهات المواقع والتطبيقات
- التصميم الداخلي
- تصميم المطبوعات
- السوشيال ميديا

مميزات الأداة:
- توليد فوري للألوان المتناسقة
- تصدير الأكواد بجميع الصيغ
- حفظ ومشاركة اللوحات
- تخصيص الألوان يدوياً`
    },
    colorConverter: {
      title: 'محول الألوان - HEX RGB HSL CMYK',
      description: 'حول بين صيغ الألوان المختلفة: HEX, RGB, HSL, CMYK. محول ألوان دقيق ومجاني للمصممين.',
      keywords: 'محول الألوان, تحويل HEX, RGB to HSL, color converter, تحويل ألوان, CMYK',
      article: `محول الألوان يحول بين جميع صيغ الألوان المستخدمة في التصميم والويب والطباعة.

الصيغ المدعومة:
- HEX (#RRGGBB): للويب
- RGB (Red, Green, Blue): للشاشات
- HSL (Hue, Saturation, Lightness): للتعديلات
- CMYK: للطباعة

لماذا التحويل مهم؟
- كل وسيط يستخدم صيغة مختلفة
- الويب يحتاج HEX أو RGB
- الطباعة تحتاج CMYK
- التعديلات أسهل بـ HSL

كيفية الاستخدام:
1. أدخل اللون بأي صيغة
2. احصل على جميع الصيغ الأخرى فوراً
3. انسخ الصيغة المطلوبة`
    },
    gradientGenerator: {
      title: 'مولد التدرج اللوني - CSS Gradient Generator',
      description: 'أنشئ تدرجات لونية جميلة واحصل على كود CSS. مولد gradient مجاني مع خيارات الاتجاه والألوان.',
      keywords: 'تدرج لوني, gradient generator, CSS gradient, مولد تدرجات, linear gradient, تدرج ألوان',
      article: `مولد التدرج اللوني يتيح لك إنشاء تدرجات ألوان رائعة والحصول على كود CSS الجاهز للاستخدام.

أنواع التدرجات:
- Linear Gradient: تدرج خطي
- Radial Gradient: تدرج دائري
- Conic Gradient: تدرج مخروطي

خيارات التخصيص:
- اختيار ألوان التدرج
- تحديد اتجاه التدرج
- إضافة نقاط ألوان متعددة
- تعديل مواقع الألوان

الحصول على الكود:
- كود CSS جاهز للنسخ
- دعم prefixes للمتصفحات
- كود خلفية مباشر

استخدامات التدرجات:
- خلفيات المواقع
- أزرار وعناصر UI
- تصميمات السوشيال ميديا
- لافتات وإعلانات`
    },
    contrastChecker: {
      title: 'فاحص التباين - تحقق من معايير WCAG',
      description: 'تحقق من تباين الألوان وفق معايير WCAG للوصولية. فاحص تباين مجاني لضمان قابلية القراءة.',
      keywords: 'تباين الألوان, contrast checker, WCAG, وصولية, accessibility, نسبة التباين',
      article: `فاحص التباين يساعدك على التأكد من أن ألوان النص والخلفية تحقق معايير الوصولية العالمية.

ما هو WCAG؟
WCAG هي إرشادات الوصولية لمحتوى الويب. تحدد نسب التباين المطلوبة:
- AA: نسبة 4.5:1 للنص العادي
- AAA: نسبة 7:1 للنص العادي

أهمية التباين:
- قراءة أسهل لجميع المستخدمين
- مساعدة ضعاف البصر
- تحسين تجربة المستخدم
- متطلبات قانونية في بعض الدول

كيفية الاستخدام:
1. أدخل لون النص ولون الخلفية
2. شاهد نسبة التباين
3. تحقق من تطابق WCAG AA و AAA
4. عدّل الألوان حسب الحاجة`
    },
    percentageCalculator: {
      title: 'حاسبة النسبة المئوية - احسب النسب بسهولة',
      description: 'احسب النسب المئوية بسرعة: نسبة من قيمة، زيادة، نقصان، فرق النسب. حاسبة مجانية ودقيقة.',
      keywords: 'حاسبة النسبة المئوية, percentage calculator, حساب النسبة, نسبة مئوية, حاسبة النسب',
      article: `حاسبة النسبة المئوية توفر حسابات سريعة ودقيقة لمختلف أنواع النسب المئوية.

أنواع الحسابات:
- ما هي X% من Y؟
- كم نسبة X من Y؟
- زيادة X بنسبة Y%
- نقصان X بنسبة Y%
- الفرق بين رقمين بالنسبة المئوية

استخدامات الحاسبة:
- حساب الخصومات والتخفيضات
- حساب الضرائب والرسوم
- تحليل البيانات المالية
- حساب نسب النمو
- حسابات المدرسة والجامعة

مميزات الحاسبة:
- نتائج فورية
- جميع أنواع الحسابات
- دقة عالية
- واجهة سهلة`
    },
    ageCalculator: {
      title: 'حاسبة العمر - احسب عمرك بالتفصيل',
      description: 'احسب عمرك بالسنوات والأشهر والأيام. اعرف كم يوم عشت وموعد عيد ميلادك القادم. حاسبة عمر دقيقة.',
      keywords: 'حاسبة العمر, حساب العمر, age calculator, تاريخ الميلاد, عيد الميلاد, كم عمري',
      article: `حاسبة العمر تحسب عمرك بدقة وتوفر معلومات تفصيلية عن تاريخ ميلادك.

ما تحسبه الأداة:
- العمر بالسنوات والأشهر والأيام
- إجمالي الأيام التي عشتها
- إجمالي الأسابيع والساعات
- الأيام المتبقية لعيد ميلادك القادم

استخدامات حاسبة العمر:
- معرفة العمر الدقيق
- حساب فارق العمر
- تحديد أهلية خدمات معينة
- التخطيط للاحتفالات

كيفية الاستخدام:
1. أدخل تاريخ ميلادك
2. اضغط احسب
3. احصل على جميع التفاصيل`
    },
    bmiCalculator: {
      title: 'حاسبة مؤشر كتلة الجسم BMI - مجانية',
      description: 'احسب مؤشر كتلة جسمك BMI واعرف إذا كان وزنك صحياً. حاسبة BMI بالنظام المتري والإمبراطوري.',
      keywords: 'حاسبة BMI, مؤشر كتلة الجسم, BMI calculator, وزن صحي, حاسبة الوزن المثالي',
      article: `حاسبة مؤشر كتلة الجسم (BMI) تساعدك على تقييم ما إذا كان وزنك صحياً بالنسبة لطولك.

ما هو BMI؟
مؤشر كتلة الجسم = الوزن (كجم) ÷ الطول² (م)

تصنيفات BMI:
- أقل من 18.5: نحافة
- 18.5 - 24.9: وزن طبيعي
- 25 - 29.9: وزن زائد
- 30 فأكثر: سمنة

كيفية الاستخدام:
1. اختر النظام (متري/إمبراطوري)
2. أدخل وزنك
3. أدخل طولك
4. احصل على BMI وتصنيفك

ملاحظة: BMI مقياس عام ولا يأخذ في الاعتبار كتلة العضلات أو توزيع الدهون.`
    },
    unitConverter: {
      title: 'محول الوحدات - حول بين وحدات القياس',
      description: 'حول بين وحدات الطول والوزن والحجم والمساحة ودرجة الحرارة. محول وحدات شامل ومجاني.',
      keywords: 'محول الوحدات, unit converter, تحويل الوحدات, متر إلى قدم, كيلو إلى باوند, تحويل درجة الحرارة',
      article: `محول الوحدات الشامل يحول بين جميع وحدات القياس المستخدمة في الحياة اليومية والعمل.

الفئات المدعومة:
- الطول: متر، قدم، بوصة، كيلومتر، ميل
- الوزن: كيلوغرام، باوند، أونصة، غرام
- الحجم: لتر، جالون، ملليلتر
- المساحة: متر مربع، قدم مربع، هكتار
- درجة الحرارة: مئوية، فهرنهايت، كلفن
- الوقت: ثانية، دقيقة، ساعة، يوم

كيفية الاستخدام:
1. اختر فئة الوحدة
2. أدخل القيمة
3. اختر الوحدة الأصلية والهدف
4. احصل على النتيجة فوراً`
    },
    tipCalculator: {
      title: 'حاسبة الإكرامية - احسب البقشيش وقسم الفاتورة',
      description: 'احسب الإكرامية المناسبة وقسم الفاتورة بين عدة أشخاص. حاسبة بقشيش سهلة ومجانية.',
      keywords: 'حاسبة الإكرامية, tip calculator, حاسبة البقشيش, تقسيم الفاتورة, split bill',
      article: `حاسبة الإكرامية تساعدك على حساب البقشيش المناسب وتقسيم الفاتورة بين مجموعة.

ما تحسبه الأداة:
- مبلغ الإكرامية
- الإجمالي مع الإكرامية
- حصة كل شخص عند التقسيم

نسب الإكرامية الشائعة:
- 10%: خدمة عادية
- 15%: خدمة جيدة
- 20%: خدمة ممتازة
- 25%: خدمة استثنائية

كيفية الاستخدام:
1. أدخل مبلغ الفاتورة
2. اختر نسبة الإكرامية
3. حدد عدد الأشخاص للتقسيم
4. احصل على جميع الحسابات`
    },
    qrGenerator: {
      title: 'مولد رمز QR مجاني - أنشئ QR Code',
      description: 'أنشئ رموز QR للروابط والنصوص والواي فاي والإيميل. مولد QR مجاني مع خيارات تخصيص الألوان.',
      keywords: 'مولد QR, QR code generator, رمز QR, إنشاء QR, QR للواي فاي, باركود QR',
      article: `مولد رموز QR يتيح لك إنشاء رموز QR احترافية لمختلف الاستخدامات.

أنواع محتوى QR:
- روابط URL
- نص عادي
- معلومات واي فاي
- البريد الإلكتروني
- رقم الهاتف
- رسائل SMS

خيارات التخصيص:
- حجم الرمز
- لون QR ولون الخلفية
- مستوى تصحيح الأخطاء
- إضافة شعار (اختياري)

استخدامات QR:
- مشاركة روابط المواقع
- بطاقات العمل الرقمية
- مشاركة كلمة سر الواي فاي
- ملصقات المنتجات
- القوائم الرقمية للمطاعم

تنزيل بصيغ:
- PNG للويب
- SVG للطباعة
- JPG للمشاركة`
    },
    qrScanner: {
      title: 'ماسح رمز QR - اقرأ QR من الصور',
      description: 'امسح رموز QR من الصور واستخرج المحتوى. قارئ QR مجاني يعمل من المتصفح بدون تطبيقات.',
      keywords: 'ماسح QR, QR scanner, قارئ QR, مسح رمز QR, QR code reader, قراءة باركود',
      article: `ماسح رموز QR يقرأ رموز QR من الصور ويستخرج محتواها بسهولة.

كيفية الاستخدام:
1. ارفع صورة تحتوي على رمز QR
2. الأداة تكتشف الرمز تلقائياً
3. يظهر المحتوى (رابط، نص، إلخ)
4. انسخ المحتوى أو افتح الرابط

ما يمكن مسحه:
- رموز QR من صور الموبايل
- لقطات شاشة
- صور من الإنترنت
- مستندات PDF (كصور)

مميزات الأداة:
- كشف تلقائي للرمز
- دعم جميع صيغ QR
- عمل بدون إنترنت
- خصوصية تامة - لا رفع للسيرفر
- مجاني 100%`
    }
  },
  en: {
    imageConverter: {
      title: 'Free Image Converter - Convert PNG, JPG, WebP Online',
      description: 'Free online image converter. Convert images between PNG, JPG, WebP, GIF with high quality. No registration or software needed.',
      keywords: 'image converter, convert image, PNG to JPG, JPG to PNG, WebP converter, image format converter, free image converter',
      article: `The free image converter is a professional tool that lets you convert images between popular formats like PNG, JPG, WebP, and GIF easily without installing any software.

Why do you need an image converter?
Different image formats have different properties and uses. PNG supports transparency and is ideal for logos and icons, while JPG is smaller and better for photographs. WebP is the newest format offering better compression with high quality.

Features:
- Instant conversion without waiting or server uploads
- Support for all popular formats (PNG, JPG, WebP, GIF, BMP)
- Preserve original image quality
- Compression quality control option
- Works directly in browser without uploading files
- 100% free with no usage limits

How to use:
1. Upload your image by drag and drop or click
2. Choose the target format (PNG, JPG, WebP)
3. Set compression quality if needed
4. Click convert and get your image instantly

Tips for optimal use:
- Use PNG for images requiring transparency
- Use JPG for photographs for smaller size
- Use WebP for the best balance of size and quality`
    },
    imageCompressor: {
      title: 'Free Image Compressor - Reduce Image Size Online',
      description: 'Compress images online for free. Reduce image file size while maintaining quality. Supports PNG, JPG, WebP. Fast and secure.',
      keywords: 'image compressor, compress image, reduce image size, compress PNG, compress JPG, image optimization',
      article: `The free image compressor helps you significantly reduce image file sizes while maintaining visual quality. An essential tool for improving website speed and saving storage space.

Why is image compression important?
Large images slow down website loading and negatively affect user experience and search engine rankings. Image compression helps:
- Speed up page loading
- Improve SEO rankings on Google
- Save visitor data consumption
- Make sharing via email and apps easier

Our compressor features:
- Smart compression that preserves quality
- Full control over compression ratio
- Instant preview of results
- Supports PNG, JPG, WebP
- No registration required
- Complete privacy - files don't upload to server
- 100% free`
    },
    imageResizer: {
      title: 'Free Image Resizer - Resize Images Online',
      description: 'Resize and change image dimensions online for free. Easy tool to enlarge or shrink images while maintaining aspect ratio.',
      keywords: 'image resizer, resize image, change image size, enlarge image, shrink image, image dimensions',
      article: `The free image resizer tool lets you adjust image dimensions easily and precisely. Whether you want to shrink an image for the web or enlarge it for printing, this tool meets your needs.

Uses for image resizing:
- Preparing images for social media (Instagram, Facebook, Twitter)
- Shrinking images for email
- Preparing high-resolution images for printing
- Standardizing product image sizes for stores
- Creating thumbnails

Our tool features:
- Lock/unlock aspect ratio
- Preset quick sizes (50%, 75%, 150%, 200%)
- Precise pixel dimension input
- High quality for enlarging and shrinking
- Instant preview of results`
    },
    imageCropper: {
      title: 'Free Image Cropper - Crop Images Online',
      description: 'Crop images online for free. Easy cropping tool with rotate and flip options. Perfect for profile pictures and social media.',
      keywords: 'image cropper, crop image, crop photo, rotate image, image editor, photo cropper',
      article: `The free image cropper lets you crop and edit images professionally. Select your desired area precisely and get the perfect image.

Uses for image cropping:
- Creating square profile pictures
- Removing unwanted parts from images
- Focusing attention on the main subject
- Preparing images for social media with specific ratios
- Cropping product images for e-commerce

Cropping tool features:
- Free selection of crop area
- Preset aspect ratios (1:1, 4:3, 16:9)
- 90-degree image rotation
- Horizontal and vertical flip
- Instant preview
- Download in original quality`
    },
    backgroundRemover: {
      title: 'AI Background Remover - Free Background Removal',
      description: 'Automatically remove image backgrounds with AI. Perfect for product photos and portraits. 100% free and works in browser.',
      keywords: 'background remover, remove background, transparent background, AI background removal, remove image background',
      article: `The background removal tool uses advanced AI technology to automatically remove image backgrounds and get transparent images.

Uses for background removal:
- Product photos for e-commerce stores
- Professional portrait photos
- Logo and graphic design
- Creating stickers and decals
- Social media photo editing
- Print design

Our tool features:
- Advanced AI for precise edge detection
- Instant browser-based processing
- High-resolution image support
- Download as PNG with transparency
- No registration required
- Complete privacy - images processed locally`
    },
    imageToBase64: {
      title: 'Image to Base64 Converter - Encode Images',
      description: 'Convert images to Base64 code for free. Useful for developers to embed images directly in HTML and CSS. Quick code copying.',
      keywords: 'image to base64, base64 encoder, data URL, encode image, base64 converter, image encoding',
      article: `The image to Base64 converter transforms images into encoded text that can be used directly in code without external files.

What is Base64?
Base64 is an encoding system that converts binary data (like images) to text. This allows embedding images directly in HTML, CSS, or JavaScript.

Uses for Base64:
- Embedding small images directly in HTML
- Creating Data URLs for CSS backgrounds
- Storing images in databases
- Sending images via APIs
- Embedding icons in CSS files

Tool features:
- Instant conversion for any image
- One-click code copying
- Display encoded data size
- Support for all image formats
- Original image preview`
    },
    pdfMerge: {
      title: 'Free PDF Merger - Combine PDF Files Online',
      description: 'Merge multiple PDF files into one for free. Arrange files as you want. Fast and secure without server uploads.',
      keywords: 'merge PDF, combine PDF, join PDF, PDF merger, merge PDF files online, PDF combiner',
      article: `The PDF merger tool lets you combine multiple PDF files into one easily and quickly. Perfect for organizing documents and creating unified files.

Why merge PDF files?
- Combining book chapters into one file
- Gathering project documents together
- Creating comprehensive reports
- Organizing invoices and receipts
- Preparing files for printing

Merger tool features:
- Add multiple files at once
- Reorder files with drag and drop
- Display page count for each file
- Fast browser processing
- No limits on size or file count
- Instant download of merged file`
    },
    pdfSplit: {
      title: 'Free PDF Splitter - Split PDF Files Online',
      description: 'Split PDF files into separate files for free. Extract specific pages or split entire files. Easy and fast.',
      keywords: 'split PDF, PDF splitter, extract PDF pages, separate PDF, divide PDF, PDF page extractor',
      article: `The PDF splitter tool lets you separate PDF files into multiple files or extract specific pages easily.

Uses for PDF splitting:
- Extracting a chapter from a book
- Separating specific pages for sharing
- Splitting long reports
- Extracting single pages
- Breaking large files for easier sending

Tool features:
- Extract specific pages
- Split into separate files per page
- Display total page count
- Fast and secure processing
- Download each page individually
- Free with no limits`
    },
    pdfCompress: {
      title: 'Free PDF Compressor - Reduce PDF File Size',
      description: 'Compress PDF files and reduce size for free. Maintain quality while shrinking size. Perfect for email and sharing.',
      keywords: 'compress PDF, reduce PDF size, PDF compressor, shrink PDF, PDF file compression, optimize PDF',
      article: `The PDF compressor helps you reduce large PDF file sizes while maintaining content and image quality.

Why compress PDF?
- Easier email sending
- Save storage space
- Faster file loading
- Reduce data consumption
- Easier online sharing

PDF compressor features:
- Smart compression preserving quality
- Up to 80% size reduction
- Fast browser processing
- No registration needed
- Complete file privacy
- 100% free`
    },
    pdfToImage: {
      title: 'Free PDF to Image Converter - PDF to PNG',
      description: 'Convert PDF pages to high-quality PNG images for free. Extract each page as a separate image. Fast and easy.',
      keywords: 'PDF to image, PDF to PNG, convert PDF to images, PDF converter, PDF page to image',
      article: `The PDF to image converter transforms each page of a PDF file into a high-quality PNG image.

Uses for PDF to image conversion:
- Sharing specific pages on social media
- Editing PDF content in image editors
- Displaying PDF pages as images on websites
- Creating presentations
- Saving important pages as images

Tool features:
- Convert all pages at once
- High-quality PNG images
- Download each image individually
- Download all images at once
- Fast processing
- Free with no limits`
    },
    imageToPdf: {
      title: 'Free Image to PDF Converter - Combine Images',
      description: 'Convert images to a single PDF file for free. Arrange and merge images into PDF. Perfect for albums and documents.',
      keywords: 'image to PDF, convert images to PDF, merge images to PDF, create PDF from images, JPG to PDF',
      article: `The image to PDF converter combines multiple images into one organized PDF file that's easy to share.

Tool uses:
- Creating digital photo albums
- Combining scanned documents
- Creating product catalogs
- Preparing portfolios
- Gathering project images in one file

Tool features:
- Add multiple images
- Reorder images by dragging
- Preview before conversion
- High-quality images in PDF
- Printable PDF file
- Free with no limits`
    },
    textCounter: {
      title: 'Free Word & Character Counter - Text Counter',
      description: 'Count words, characters, sentences and paragraphs in your text. Accurate text counter with estimated reading time.',
      keywords: 'word counter, character counter, text counter, count words, letter counter, reading time',
      article: `The text counter is an essential tool for writers, editors, and students to measure and analyze their texts accurately.

Text statistics:
- Character count (with and without spaces)
- Word count
- Sentence count
- Paragraph count
- Line count
- Estimated reading time

Uses for text counter:
- Verifying article word counts
- Counting Twitter characters
- Measuring content length for SEO
- Checking text limits in forms
- Estimating reading time for readers

Tool features:
- Instant statistics while typing
- Accurate calculations
- Easy-to-use interface
- Arabic and English support
- Free with no limits`
    },
    textFormatter: {
      title: 'Text Formatter - Convert Uppercase & Lowercase',
      description: 'Format text: uppercase, lowercase, title case, sentence case and more. Free and easy text formatting tool.',
      keywords: 'text formatter, uppercase, lowercase, title case, sentence case, text converter, case converter',
      article: `The text formatter provides multiple conversions to format your texts quickly and easily.

Formatting options:
- UPPERCASE: convert to capital letters
- lowercase: convert to small letters
- Title Case: capitalize each word
- Sentence case: capitalize sentence start only
- aLtErNaTiNg: alternate between upper and lower
- Remove extra spaces

Uses for formatting:
- Fixing CAPS LOCK text
- Formatting article titles
- Standardizing data formatting
- Preparing texts for publishing
- Cleaning copied texts

How to use:
1. Paste or type your text
2. Choose the desired format
3. Copy the formatted text`
    },
    textDiff: {
      title: 'Text Diff Tool - Find Differences Between Texts',
      description: 'Compare two texts and find differences. Free text comparison tool showing additions, deletions, and changes.',
      keywords: 'text diff, compare text, text comparison, find differences, diff tool, text compare',
      article: `The text comparison tool helps you discover differences between two texts accurately, highlighting additions and deletions.

Uses for text comparison:
- Reviewing document edits
- Comparing code versions
- Discovering contract changes
- Reviewing article edits
- Verifying correct copies

What the tool shows:
- Added text (in green)
- Deleted text (in red)
- Changed text
- Matching text

Tool features:
- Instant comparison
- Clear color-coded differences
- Support for long texts
- Completely free`
    },
    loremGenerator: {
      title: 'Lorem Ipsum Generator - Placeholder Text',
      description: 'Generate Lorem Ipsum text for design and development. Specify paragraphs or words. Professional dummy text generator.',
      keywords: 'Lorem Ipsum, placeholder text, dummy text, Lorem generator, filler text, design text',
      article: `The Lorem Ipsum generator provides placeholder text for designers and developers to fill designs before real content is available.

What is Lorem Ipsum?
Lorem Ipsum is dummy Latin text used in printing and design since the 16th century. It provides natural letter distribution that resembles real text.

Uses:
- Filling website designs
- Testing fonts and layouts
- Showing design mockups to clients
- Developing print templates
- Testing content length

Generation options:
- Number of paragraphs
- Number of words
- Number of sentences
- Start with "Lorem ipsum dolor sit amet..."`
    },
    slugGenerator: {
      title: 'Slug Generator - SEO-Friendly URLs',
      description: 'Convert text to clean SEO-optimized URL slugs. Free slug generator supporting multiple languages.',
      keywords: 'slug generator, URL slug, SEO URL, URL generator, friendly URL, slug converter',
      article: `The slug generator converts your titles and text into clean, search engine-optimized URL slugs.

What is a Slug?
A slug is the URL-readable part that describes page content. For example:
example.com/blog/best-seo-practices

Importance of good slugs:
- Improve search engine rankings (SEO)
- Easy URL understanding for users
- Easier social media sharing
- Better site organization

Conversions performed:
- Replace spaces with hyphens
- Convert to lowercase
- Remove special characters
- Handle Unicode characters

Tool uses:
- Creating article URLs
- Product page links
- Page URL titles`
    },
    colorPicker: {
      title: 'Color Picker - Get HEX RGB HSL Codes',
      description: 'Pick any color and get its code in HEX, RGB, HSL formats. Free color picker for designers and developers.',
      keywords: 'color picker, HEX color, RGB, HSL, pick color, color code, color selector',
      article: `The color picker is an essential tool for designers and developers to get color codes in various formats.

Supported color formats:
- HEX: #00bcd4 (for web and CSS)
- RGB: rgb(0, 188, 212) (for design)
- HSL: hsl(187, 100%, 42%) (for adjustments)

Tool features:
- Choose color from full spectrum
- Display all formats instantly
- One-click code copying
- Generate random color
- Preview selected color

Color picker uses:
- Choosing design colors
- Matching colors from images
- Getting codes for code
- Exploring colors`
    },
    colorPalette: {
      title: 'Color Palette Generator - Create Color Schemes',
      description: 'Create harmonious and complementary color palettes for your designs. Professional color generator with harmony options.',
      keywords: 'color palette, palette generator, color harmony, color scheme, color combinations, design colors',
      article: `The color palette generator helps you create harmonious and complementary color sets for your projects.

Color harmony types:
- Complementary colors
- Analogous colors
- Triadic colors
- Split-complementary

Uses for color palettes:
- Brand identity design
- Website and app interfaces
- Interior design
- Print design
- Social media

Tool features:
- Instant generation of harmonious colors
- Export codes in all formats
- Save and share palettes
- Manual color customization`
    },
    colorConverter: {
      title: 'Color Converter - HEX RGB HSL CMYK',
      description: 'Convert between color formats: HEX, RGB, HSL, CMYK. Accurate and free color converter for designers.',
      keywords: 'color converter, HEX to RGB, RGB to HSL, convert colors, CMYK converter, color format',
      article: `The color converter converts between all color formats used in design, web, and print.

Supported formats:
- HEX (#RRGGBB): for web
- RGB (Red, Green, Blue): for screens
- HSL (Hue, Saturation, Lightness): for adjustments
- CMYK: for printing

Why is conversion important?
- Each medium uses different formats
- Web needs HEX or RGB
- Print needs CMYK
- Adjustments are easier with HSL

How to use:
1. Enter color in any format
2. Get all other formats instantly
3. Copy the format you need`
    },
    gradientGenerator: {
      title: 'Gradient Generator - CSS Gradient Maker',
      description: 'Create beautiful color gradients and get CSS code. Free gradient generator with direction and color options.',
      keywords: 'gradient generator, CSS gradient, color gradient, linear gradient, gradient maker, background gradient',
      article: `The gradient generator lets you create stunning color gradients and get ready-to-use CSS code.

Gradient types:
- Linear Gradient: linear transition
- Radial Gradient: circular transition
- Conic Gradient: conical transition

Customization options:
- Choose gradient colors
- Set gradient direction
- Add multiple color stops
- Adjust color positions

Getting the code:
- Ready-to-copy CSS code
- Browser prefix support
- Direct background code

Gradient uses:
- Website backgrounds
- Buttons and UI elements
- Social media designs
- Banners and ads`
    },
    contrastChecker: {
      title: 'Contrast Checker - WCAG Accessibility Tool',
      description: 'Check color contrast according to WCAG accessibility standards. Free contrast checker to ensure readability.',
      keywords: 'contrast checker, WCAG, accessibility, color contrast, contrast ratio, a11y',
      article: `The contrast checker helps ensure your text and background colors meet global accessibility standards.

What is WCAG?
WCAG is Web Content Accessibility Guidelines. It defines required contrast ratios:
- AA: 4.5:1 ratio for normal text
- AAA: 7:1 ratio for normal text

Importance of contrast:
- Easier reading for all users
- Helps visually impaired users
- Improves user experience
- Legal requirements in some countries

How to use:
1. Enter text and background colors
2. See contrast ratio
3. Check WCAG AA and AAA compliance
4. Adjust colors as needed`
    },
    percentageCalculator: {
      title: 'Percentage Calculator - Calculate Percentages Easy',
      description: 'Calculate percentages quickly: percentage of value, increase, decrease, percentage difference. Free and accurate.',
      keywords: 'percentage calculator, calculate percentage, percent calculator, percentage of, percentage increase',
      article: `The percentage calculator provides quick and accurate calculations for various percentage types.

Calculation types:
- What is X% of Y?
- What percentage is X of Y?
- Increase X by Y%
- Decrease X by Y%
- Percentage difference between two numbers

Calculator uses:
- Calculating discounts
- Tax and fee calculations
- Financial data analysis
- Growth rate calculations
- School and university calculations

Calculator features:
- Instant results
- All calculation types
- High accuracy
- Easy interface`
    },
    ageCalculator: {
      title: 'Age Calculator - Calculate Your Exact Age',
      description: 'Calculate your age in years, months, and days. Find out how many days you have lived and your next birthday.',
      keywords: 'age calculator, calculate age, birthday calculator, how old am I, age in days, date calculator',
      article: `The age calculator accurately calculates your age and provides detailed information about your birth date.

What the tool calculates:
- Age in years, months, and days
- Total days you have lived
- Total weeks and hours
- Days remaining to your next birthday

Uses for age calculator:
- Finding exact age
- Calculating age difference
- Determining eligibility for services
- Planning celebrations

How to use:
1. Enter your birth date
2. Click calculate
3. Get all the details`
    },
    bmiCalculator: {
      title: 'BMI Calculator - Body Mass Index - Free',
      description: 'Calculate your Body Mass Index (BMI) and find out if your weight is healthy. BMI calculator in metric and imperial.',
      keywords: 'BMI calculator, body mass index, BMI, healthy weight, weight calculator, ideal weight',
      article: `The Body Mass Index (BMI) calculator helps you assess whether your weight is healthy relative to your height.

What is BMI?
Body Mass Index = Weight (kg) ÷ Height² (m)

BMI classifications:
- Under 18.5: Underweight
- 18.5 - 24.9: Normal weight
- 25 - 29.9: Overweight
- 30 and above: Obese

How to use:
1. Choose system (metric/imperial)
2. Enter your weight
3. Enter your height
4. Get your BMI and classification

Note: BMI is a general measure and doesn't account for muscle mass or fat distribution.`
    },
    unitConverter: {
      title: 'Unit Converter - Convert Measurement Units',
      description: 'Convert between length, weight, volume, area, and temperature units. Comprehensive and free unit converter.',
      keywords: 'unit converter, convert units, meters to feet, kg to pounds, temperature converter, measurement converter',
      article: `The comprehensive unit converter converts between all measurement units used in daily life and work.

Supported categories:
- Length: meter, foot, inch, kilometer, mile
- Weight: kilogram, pound, ounce, gram
- Volume: liter, gallon, milliliter
- Area: square meter, square foot, hectare
- Temperature: Celsius, Fahrenheit, Kelvin
- Time: second, minute, hour, day

How to use:
1. Choose the unit category
2. Enter the value
3. Select source and target units
4. Get the result instantly`
    },
    tipCalculator: {
      title: 'Tip Calculator - Calculate Tips and Split Bills',
      description: 'Calculate the right tip and split the bill between multiple people. Easy and free tip calculator.',
      keywords: 'tip calculator, calculate tip, split bill, bill splitter, gratuity calculator, restaurant bill',
      article: `The tip calculator helps you calculate appropriate tips and split bills among groups.

What the tool calculates:
- Tip amount
- Total with tip
- Each person's share when splitting

Common tip percentages:
- 10%: Standard service
- 15%: Good service
- 20%: Excellent service
- 25%: Exceptional service

How to use:
1. Enter the bill amount
2. Choose tip percentage
3. Specify number of people for splitting
4. Get all calculations`
    },
    qrGenerator: {
      title: 'Free QR Code Generator - Create QR Codes',
      description: 'Create QR codes for URLs, text, WiFi, and email. Free QR generator with color customization options.',
      keywords: 'QR generator, QR code generator, create QR code, QR code maker, WiFi QR, barcode generator',
      article: `The QR code generator lets you create professional QR codes for various uses.

QR content types:
- Website URLs
- Plain text
- WiFi information
- Email addresses
- Phone numbers
- SMS messages

Customization options:
- Code size
- QR color and background color
- Error correction level
- Add logo (optional)

QR uses:
- Sharing website links
- Digital business cards
- Sharing WiFi passwords
- Product labels
- Digital restaurant menus

Download formats:
- PNG for web
- SVG for print
- JPG for sharing`
    },
    qrScanner: {
      title: 'QR Code Scanner - Scan QR from Images',
      description: 'Scan QR codes from images and extract content. Free QR reader that works in browser without apps.',
      keywords: 'QR scanner, QR code reader, scan QR code, QR reader, decode QR, barcode scanner',
      article: `The QR code scanner reads QR codes from images and extracts their content easily.

How to use:
1. Upload an image containing a QR code
2. The tool detects the code automatically
3. Content appears (link, text, etc.)
4. Copy content or open link

What can be scanned:
- QR codes from mobile photos
- Screenshots
- Images from the internet
- PDF documents (as images)

Tool features:
- Automatic code detection
- Support for all QR formats
- Works offline
- Complete privacy - no server upload
- 100% free`
    }
  }
};
