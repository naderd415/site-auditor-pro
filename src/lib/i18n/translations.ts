export type Language = 'ar' | 'en' | 'fr';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    tools: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    cta: string;
  };
  // Categories
  categories: {
    all: string;
    image: string;
    pdf: string;
    text: string;
    color: string;
    calculator: string;
    qr: string;
  };
  // Common
  common: {
    download: string;
    copy: string;
    copied: string;
    reset: string;
    convert: string;
    generate: string;
    upload: string;
    dragDrop: string;
    processing: string;
    success: string;
    error: string;
    selectFile: string;
    selectImage: string;
    noResults: string;
    loading: string;
    save: string;
    cancel: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    language: string;
    theme: string;
    lightMode: string;
    darkMode: string;
  };
  // Tools
  tools: {
    imageConverter: {
      name: string;
      description: string;
      article: string;
    };
    imageCompressor: {
      name: string;
      description: string;
      article: string;
    };
    imageResizer: {
      name: string;
      description: string;
      article: string;
    };
    imageCropper: {
      name: string;
      description: string;
      article: string;
    };
    backgroundRemover: {
      name: string;
      description: string;
      article: string;
    };
    imageToBase64: {
      name: string;
      description: string;
      article: string;
    };
    pdfMerge: {
      name: string;
      description: string;
      article: string;
    };
    pdfSplit: {
      name: string;
      description: string;
      article: string;
    };
    pdfCompress: {
      name: string;
      description: string;
      article: string;
    };
    pdfToImage: {
      name: string;
      description: string;
      article: string;
    };
    imageToPdf: {
      name: string;
      description: string;
      article: string;
    };
    pdfRotate: {
      name: string;
      description: string;
      article: string;
    };
    pdfSign: {
      name: string;
      description: string;
      article: string;
    };
    pdfWatermark: {
      name: string;
      description: string;
      article: string;
    };
    pdfProtect: {
      name: string;
      description: string;
      article: string;
    };
    pdfPageNumbers: {
      name: string;
      description: string;
      article: string;
    };
    pdfToHtml: {
      name: string;
      description: string;
      article: string;
    };
    pdfToWord: {
      name: string;
      description: string;
      article: string;
    };
    textCounter: {
      name: string;
      description: string;
      article: string;
    };
    textFormatter: {
      name: string;
      description: string;
      article: string;
    };
    textDiff: {
      name: string;
      description: string;
      article: string;
    };
    loremGenerator: {
      name: string;
      description: string;
      article: string;
    };
    slugGenerator: {
      name: string;
      description: string;
      article: string;
    };
    colorPicker: {
      name: string;
      description: string;
      article: string;
    };
    colorPalette: {
      name: string;
      description: string;
      article: string;
    };
    colorConverter: {
      name: string;
      description: string;
      article: string;
    };
    gradientGenerator: {
      name: string;
      description: string;
      article: string;
    };
    contrastChecker: {
      name: string;
      description: string;
      article: string;
    };
    percentageCalculator: {
      name: string;
      description: string;
      article: string;
    };
    ageCalculator: {
      name: string;
      description: string;
      article: string;
    };
    bmiCalculator: {
      name: string;
      description: string;
      article: string;
    };
    unitConverter: {
      name: string;
      description: string;
      article: string;
    };
    tipCalculator: {
      name: string;
      description: string;
      article: string;
    };
    qrGenerator: {
      name: string;
      description: string;
      article: string;
    };
    qrScanner: {
      name: string;
      description: string;
      article: string;
    };
  };
  // Footer
  footer: {
    rights: string;
    madeWith: string;
  };
  // About Page
  about: {
    title: string;
    description: string;
  };
  // Contact Page
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  // Ads
  ads: {
    placeholder: string;
  };
}

export const translations: Record<Language, Translation> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      tools: 'الأدوات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
    },
    hero: {
      title: 'أفضل الأدوات المجانية عبر الإنترنت',
      subtitle: 'مجموعة شاملة من الأدوات المجانية لتحويل الصور، ملفات PDF، النصوص والمزيد - كل شيء يعمل مباشرة من متصفحك',
      searchPlaceholder: 'ابحث عن أداة...',
      cta: 'استكشف الأدوات',
    },
    categories: {
      all: 'الكل',
      image: 'أدوات الصور',
      pdf: 'أدوات PDF',
      text: 'أدوات النصوص',
      color: 'أدوات الألوان',
      calculator: 'الآلات الحاسبة',
      qr: 'أدوات QR',
    },
    common: {
      download: 'تحميل',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      reset: 'إعادة تعيين',
      convert: 'تحويل',
      generate: 'إنشاء',
      upload: 'رفع ملف',
      dragDrop: 'اسحب وأفلت الملف هنا أو اضغط للاختيار',
      processing: 'جاري المعالجة...',
      success: 'تمت العملية بنجاح!',
      error: 'حدث خطأ، حاول مرة أخرى',
      selectFile: 'اختر ملف',
      selectImage: 'اختر صورة',
      noResults: 'لا توجد نتائج',
      loading: 'جاري التحميل...',
      save: 'حفظ',
      cancel: 'إلغاء',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      language: 'اللغة',
      theme: 'المظهر',
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع الداكن',
    },
    tools: {
      imageConverter: {
        name: 'محول الصور AI',
        description: 'حول صورك بين الصيغ المختلفة (PNG، JPG، WebP، GIF) - مدعوم بالذكاء الاصطناعي',
        article: 'تحويل الصور بين الصيغ المختلفة أصبح سهلاً مع أداتنا المجانية. يدعم محول الصور جميع الصيغ الشائعة مثل PNG و JPG و WebP و GIF. قم بتحويل صورك بجودة عالية مباشرة من المتصفح دون الحاجة لتحميل أي برنامج.',
      },
      imageCompressor: {
        name: 'ضاغط الصور AI',
        description: 'قلل حجم صورك مع الحفاظ على الجودة - مدعوم بالذكاء الاصطناعي',
        article: 'ضاغط الصور المجاني يساعدك على تقليل حجم ملفات الصور مع الحفاظ على جودتها. مثالي لتحسين سرعة موقعك ومشاركة الصور عبر الإنترنت.',
      },
      imageResizer: {
        name: 'تغيير حجم الصور AI',
        description: 'غير أبعاد صورك بسهولة - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تغيير حجم الصور تتيح لك تعديل أبعاد صورك بكل سهولة. حدد الأبعاد المطلوبة واحصل على صورتك بالحجم المناسب فوراً.',
      },
      imageCropper: {
        name: 'قص الصور AI',
        description: 'قص واختر الجزء المطلوب من صورك - مدعوم بالذكاء الاصطناعي',
        article: 'أداة قص الصور تمكنك من اختيار وقص الجزء المطلوب من صورتك بدقة. مثالية لإنشاء صور الملف الشخصي أو تحرير الصور.',
      },
      backgroundRemover: {
        name: 'إزالة الخلفية AI',
        description: 'أزل خلفية صورك تلقائياً - مدعوم بالذكاء الاصطناعي',
        article: 'أداة إزالة الخلفية تستخدم الذكاء الاصطناعي لإزالة خلفية صورك تلقائياً. مثالية لإنشاء صور منتجات أو صور شخصية احترافية.',
      },
      imageToBase64: {
        name: 'صورة إلى Base64 AI',
        description: 'حول صورك إلى كود Base64 - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تحويل الصور إلى Base64 مفيدة للمطورين. قم بتحويل صورك إلى نص مشفر يمكن استخدامه مباشرة في الكود.',
      },
      pdfMerge: {
        name: 'دمج PDF AI',
        description: 'ادمج عدة ملفات PDF في ملف واحد - مدعوم بالذكاء الاصطناعي',
        article: 'أداة دمج PDF تتيح لك جمع عدة ملفات PDF في ملف واحد بسهولة. رتب الملفات حسب رغبتك واحصل على ملف PDF موحد.',
      },
      pdfSplit: {
        name: 'تقسيم PDF AI',
        description: 'قسم ملف PDF إلى عدة ملفات - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تقسيم PDF تمكنك من فصل صفحات ملف PDF إلى ملفات منفصلة. اختر الصفحات التي تريد فصلها واحصل على ملفات PDF منفصلة.',
      },
      pdfCompress: {
        name: 'ضغط PDF AI',
        description: 'قلل حجم ملفات PDF - مدعوم بالذكاء الاصطناعي',
        article: 'أداة ضغط PDF تساعدك على تقليل حجم ملفات PDF الكبيرة مع الحفاظ على جودة المحتوى. مثالية للمشاركة عبر البريد الإلكتروني.',
      },
      pdfToImage: {
        name: 'PDF إلى صورة AI',
        description: 'حول صفحات PDF إلى صور - مدعوم بالذكاء الاصطناعي',
        article: 'حول ملفات PDF إلى صور عالية الجودة. اختر صيغة الصورة المطلوبة واحصل على صور لكل صفحة من ملف PDF.',
      },
      imageToPdf: {
        name: 'صورة إلى PDF AI',
        description: 'حول صورك إلى ملف PDF - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تحويل الصور إلى PDF تجمع صورك في ملف PDF واحد. مثالية لإنشاء ألبومات صور أو مستندات مصورة.',
      },
      pdfRotate: {
        name: 'تدوير PDF AI',
        description: 'دور صفحات ملفات PDF - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تدوير PDF تساعدك على تصحيح اتجاه صفحات ملفات PDF الممسوحة ضوئياً أو المقلوبة.',
      },
      pdfSign: {
        name: 'توقيع PDF AI',
        description: 'وقع ملفات PDF إلكترونياً - مدعوم بالذكاء الاصطناعي',
        article: 'أداة توقيع PDF تتيح لك إضافة توقيعك الإلكتروني على مستندات PDF بسهولة واحترافية.',
      },
      pdfWatermark: {
        name: 'علامة مائية PDF AI',
        description: 'أضف علامة مائية لملفات PDF - مدعوم بالذكاء الاصطناعي',
        article: 'أداة العلامة المائية تحمي مستندات PDF الخاصة بك بإضافة نص أو شعار على جميع الصفحات.',
      },
      pdfProtect: {
        name: 'حماية PDF AI',
        description: 'أضف كلمة مرور لملفات PDF - مدعوم بالذكاء الاصطناعي',
        article: 'أداة حماية PDF تضيف طبقة أمان لمستنداتك عبر كلمة مرور وصلاحيات مخصصة.',
      },
      pdfPageNumbers: {
        name: 'ترقيم PDF AI',
        description: 'أضف أرقام صفحات لملفات PDF - مدعوم بالذكاء الاصطناعي',
        article: 'أداة ترقيم PDF تضيف أرقام الصفحات تلقائياً لجميع صفحات المستند.',
      },
      pdfToHtml: {
        name: 'PDF إلى HTML AI',
        description: 'حول PDF إلى صفحات HTML - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تحويل PDF إلى HTML تحول مستندات PDF إلى صفحات ويب HTML قابلة للتحرير.',
      },
      pdfToWord: {
        name: 'PDF إلى Word AI',
        description: 'حول PDF إلى مستندات Word - مدعوم بالذكاء الاصطناعي',
        article: 'أداة تحويل PDF إلى Word تحول ملفات PDF إلى مستندات Microsoft Word قابلة للتحرير.',
      },
      textCounter: {
        name: 'عداد النصوص',
        description: 'احسب الكلمات والأحرف والجمل',
        article: 'أداة عداد النصوص توفر إحصائيات دقيقة عن نصك بما في ذلك عدد الكلمات والأحرف والجمل والفقرات ووقت القراءة.',
      },
      textFormatter: {
        name: 'منسق النصوص',
        description: 'نسق نصوصك (أحرف كبيرة، صغيرة، عنوان)',
        article: 'أداة تنسيق النصوص تتيح لك تحويل نصك إلى أحرف كبيرة أو صغيرة أو تنسيق العنوان وغيرها من التنسيقات.',
      },
      textDiff: {
        name: 'مقارنة النصوص',
        description: 'قارن بين نصين واعثر على الاختلافات',
        article: 'أداة مقارنة النصوص تساعدك على إيجاد الاختلافات بين نصين. مفيدة لمراجعة التغييرات ومقارنة الإصدارات.',
      },
      loremGenerator: {
        name: 'مولد Lorem Ipsum',
        description: 'أنشئ نص Lorem Ipsum للتصميم',
        article: 'مولد Lorem Ipsum يوفر نصوص وهمية للمصممين والمطورين. اختر عدد الفقرات أو الكلمات المطلوبة.',
      },
      slugGenerator: {
        name: 'مولد Slug',
        description: 'حول النصوص إلى روابط URL صديقة',
        article: 'أداة مولد Slug تحول نصوصك إلى روابط URL نظيفة وصديقة لمحركات البحث. مثالية للمدونات والمواقع.',
      },
      colorPicker: {
        name: 'منتقي الألوان',
        description: 'اختر ألوانك واحصل على كودها',
        article: 'منتقي الألوان يتيح لك اختيار أي لون والحصول على كوده بصيغ مختلفة (HEX، RGB، HSL). مفيد للمصممين والمطورين.',
      },
      colorPalette: {
        name: 'مولد لوحة الألوان',
        description: 'أنشئ لوحات ألوان متناسقة',
        article: 'مولد لوحة الألوان يساعدك على إنشاء لوحات ألوان متناسقة لمشاريعك. احصل على ألوان متكاملة ومتناغمة.',
      },
      colorConverter: {
        name: 'محول الألوان',
        description: 'حول بين صيغ الألوان المختلفة',
        article: 'محول الألوان يحول بين صيغ الألوان المختلفة مثل HEX و RGB و HSL و CMYK. أداة أساسية للمصممين.',
      },
      gradientGenerator: {
        name: 'مولد التدرج اللوني',
        description: 'أنشئ تدرجات لونية جميلة',
        article: 'مولد التدرج اللوني يتيح لك إنشاء تدرجات لونية رائعة لتصميماتك. اختر الألوان والاتجاه واحصل على كود CSS.',
      },
      contrastChecker: {
        name: 'فاحص التباين',
        description: 'تحقق من تباين الألوان للوصولية',
        article: 'فاحص التباين يساعدك على التأكد من أن ألوانك تحقق معايير الوصولية WCAG. مهم لضمان قابلية القراءة.',
      },
      percentageCalculator: {
        name: 'حاسبة النسبة المئوية',
        description: 'احسب النسب المئوية بسهولة',
        article: 'حاسبة النسبة المئوية توفر حسابات سريعة للنسب المئوية. احسب النسبة من قيمة، الزيادة، النقصان والمزيد.',
      },
      ageCalculator: {
        name: 'حاسبة العمر',
        description: 'احسب عمرك بالسنوات والأشهر والأيام',
        article: 'حاسبة العمر تحسب عمرك بدقة بالسنوات والأشهر والأيام. اعرف أيضاً كم يوماً عشت وموعد عيد ميلادك القادم.',
      },
      bmiCalculator: {
        name: 'حاسبة مؤشر كتلة الجسم',
        description: 'احسب مؤشر كتلة جسمك BMI',
        article: 'حاسبة مؤشر كتلة الجسم BMI تساعدك على معرفة إذا كان وزنك صحياً. أدخل طولك ووزنك واحصل على تحليل مفصل.',
      },
      unitConverter: {
        name: 'محول الوحدات',
        description: 'حول بين وحدات القياس المختلفة',
        article: 'محول الوحدات يحول بين وحدات الطول والوزن والحجم والمساحة ودرجة الحرارة وغيرها. أداة شاملة للتحويلات.',
      },
      tipCalculator: {
        name: 'حاسبة الإكرامية',
        description: 'احسب الإكرامية وقسم الفاتورة',
        article: 'حاسبة الإكرامية تساعدك على حساب الإكرامية المناسبة وتقسيم الفاتورة بين عدة أشخاص بسهولة.',
      },
      qrGenerator: {
        name: 'مولد QR',
        description: 'أنشئ رموز QR لروابطك ونصوصك',
        article: 'مولد رموز QR يتيح لك إنشاء رموز QR لأي رابط أو نص. خصص الألوان والحجم وحمل الصورة بجودة عالية.',
      },
      qrScanner: {
        name: 'ماسح QR',
        description: 'امسح رموز QR من الصور',
        article: 'ماسح رموز QR يقرأ رموز QR من الصور المرفوعة ويستخرج المحتوى. ارفع صورة واحصل على الرابط أو النص.',
      },
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      madeWith: 'صنع بـ ❤️',
    },
    about: {
      title: 'من نحن',
      description: 'نوفر مجموعة من الأدوات المجانية عبر الإنترنت لمساعدتك في مهامك اليومية. جميع أدواتنا تعمل مباشرة من المتصفح دون الحاجة لتحميل أي برامج أو رفع ملفاتك لخوادم خارجية.',
    },
    contact: {
      title: 'اتصل بنا',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال',
    },
    ads: {
      placeholder: 'مساحة إعلانية',
    },
  },
  en: {
    nav: {
      home: 'Home',
      tools: 'Tools',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    hero: {
      title: 'Best Free Online Tools',
      subtitle: 'A comprehensive collection of free tools for converting images, PDFs, text and more - everything works directly from your browser',
      searchPlaceholder: 'Search for a tool...',
      cta: 'Explore Tools',
    },
    categories: {
      all: 'All',
      image: 'Image Tools',
      pdf: 'PDF Tools',
      text: 'Text Tools',
      color: 'Color Tools',
      calculator: 'Calculators',
      qr: 'QR Tools',
    },
    common: {
      download: 'Download',
      copy: 'Copy',
      copied: 'Copied!',
      reset: 'Reset',
      convert: 'Convert',
      generate: 'Generate',
      upload: 'Upload File',
      dragDrop: 'Drag and drop file here or click to select',
      processing: 'Processing...',
      success: 'Operation completed successfully!',
      error: 'An error occurred, please try again',
      selectFile: 'Select File',
      selectImage: 'Select Image',
      noResults: 'No results found',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      language: 'Language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    tools: {
      imageConverter: {
        name: 'Image Converter',
        description: 'Convert your images between different formats (PNG, JPG, WebP, GIF)',
        article: 'Converting images between different formats is now easy with our free tool. The image converter supports all popular formats like PNG, JPG, WebP, and GIF. Convert your images in high quality directly from your browser without downloading any software.',
      },
      imageCompressor: {
        name: 'Image Compressor',
        description: 'Reduce image size while maintaining quality',
        article: 'Our free image compressor helps you reduce image file sizes while maintaining their quality. Perfect for improving your website speed and sharing images online.',
      },
      imageResizer: {
        name: 'Image Resizer',
        description: 'Easily resize your images',
        article: 'The image resizer tool allows you to adjust your image dimensions with ease. Specify the desired dimensions and get your image at the right size instantly.',
      },
      imageCropper: {
        name: 'Image Cropper',
        description: 'Crop and select the desired part of your images',
        article: 'The image cropper tool enables you to select and crop the desired part of your image with precision. Perfect for creating profile pictures or editing photos.',
      },
      backgroundRemover: {
        name: 'Background Remover',
        description: 'Automatically remove image backgrounds',
        article: 'The background remover tool uses AI to automatically remove your image backgrounds. Perfect for creating product photos or professional portraits.',
      },
      imageToBase64: {
        name: 'Image to Base64',
        description: 'Convert your images to Base64 code',
        article: 'The image to Base64 converter is useful for developers. Convert your images to encoded text that can be used directly in code.',
      },
      pdfMerge: {
        name: 'Merge PDF',
        description: 'Merge multiple PDF files into one',
        article: 'The PDF merge tool allows you to combine multiple PDF files into one easily. Arrange files as you wish and get a unified PDF file.',
      },
      pdfSplit: {
        name: 'Split PDF',
        description: 'Split a PDF file into multiple files',
        article: 'The PDF split tool enables you to separate PDF pages into separate files. Choose the pages you want to split and get separate PDF files.',
      },
      pdfCompress: {
        name: 'Compress PDF',
        description: 'Reduce PDF file sizes',
        article: 'The PDF compressor helps you reduce large PDF file sizes while maintaining content quality. Perfect for sharing via email.',
      },
      pdfToImage: {
        name: 'PDF to Image',
        description: 'Convert PDF pages to images',
        article: 'Convert PDF files to high-quality images. Choose the desired image format and get images for each page of your PDF file.',
      },
      imageToPdf: {
        name: 'Image to PDF',
        description: 'Convert your images to a PDF file',
        article: 'The image to PDF converter combines your images into a single PDF file. Perfect for creating photo albums or image documents.',
      },
      pdfRotate: {
        name: 'Rotate PDF',
        description: 'Rotate PDF file pages',
        article: 'The PDF rotation tool helps you fix the orientation of scanned or incorrectly oriented PDF pages.',
      },
      pdfSign: {
        name: 'Sign PDF',
        description: 'Sign PDF files electronically',
        article: 'The PDF signing tool lets you add your electronic signature to PDF documents easily and professionally.',
      },
      pdfWatermark: {
        name: 'PDF Watermark',
        description: 'Add watermark to PDF files',
        article: 'The watermark tool protects your PDF documents by adding text or logo to all pages.',
      },
      pdfProtect: {
        name: 'Protect PDF',
        description: 'Add password to PDF files',
        article: 'The PDF protection tool adds a security layer to your documents via password and custom permissions.',
      },
      pdfPageNumbers: {
        name: 'PDF Page Numbers',
        description: 'Add page numbers to PDF files',
        article: 'The PDF numbering tool automatically adds page numbers to all document pages.',
      },
      pdfToHtml: {
        name: 'PDF to HTML',
        description: 'Convert PDF to HTML pages',
        article: 'The PDF to HTML converter transforms PDF documents into editable web HTML pages.',
      },
      pdfToWord: {
        name: 'PDF to Word',
        description: 'Convert PDF to Word documents',
        article: 'The PDF to Word converter transforms PDF files into editable Microsoft Word documents.',
      },
      textCounter: {
        name: 'Text Counter',
        description: 'Count words, characters, and sentences',
        article: 'The text counter tool provides accurate statistics about your text including word count, characters, sentences, paragraphs, and reading time.',
      },
      textFormatter: {
        name: 'Text Formatter',
        description: 'Format your text (uppercase, lowercase, title case)',
        article: 'The text formatter tool allows you to convert your text to uppercase, lowercase, title case, and other formats.',
      },
      textDiff: {
        name: 'Text Diff',
        description: 'Compare two texts and find differences',
        article: 'The text diff tool helps you find differences between two texts. Useful for reviewing changes and comparing versions.',
      },
      loremGenerator: {
        name: 'Lorem Ipsum Generator',
        description: 'Generate Lorem Ipsum text for design',
        article: 'The Lorem Ipsum generator provides placeholder text for designers and developers. Choose the number of paragraphs or words needed.',
      },
      slugGenerator: {
        name: 'Slug Generator',
        description: 'Convert text to URL-friendly slugs',
        article: 'The slug generator tool converts your text to clean, SEO-friendly URL slugs. Perfect for blogs and websites.',
      },
      colorPicker: {
        name: 'Color Picker',
        description: 'Pick colors and get their codes',
        article: 'The color picker allows you to select any color and get its code in different formats (HEX, RGB, HSL). Useful for designers and developers.',
      },
      colorPalette: {
        name: 'Color Palette Generator',
        description: 'Generate harmonious color palettes',
        article: 'The color palette generator helps you create harmonious color palettes for your projects. Get complementary and matching colors.',
      },
      colorConverter: {
        name: 'Color Converter',
        description: 'Convert between color formats',
        article: 'The color converter converts between different color formats like HEX, RGB, HSL, and CMYK. An essential tool for designers.',
      },
      gradientGenerator: {
        name: 'Gradient Generator',
        description: 'Create beautiful color gradients',
        article: 'The gradient generator allows you to create stunning color gradients for your designs. Choose colors and direction and get CSS code.',
      },
      contrastChecker: {
        name: 'Contrast Checker',
        description: 'Check color contrast for accessibility',
        article: 'The contrast checker helps you ensure your colors meet WCAG accessibility standards. Important for ensuring readability.',
      },
      percentageCalculator: {
        name: 'Percentage Calculator',
        description: 'Calculate percentages easily',
        article: 'The percentage calculator provides quick percentage calculations. Calculate percentage of value, increase, decrease, and more.',
      },
      ageCalculator: {
        name: 'Age Calculator',
        description: 'Calculate your age in years, months, and days',
        article: 'The age calculator accurately calculates your age in years, months, and days. Also find out how many days you have lived and your next birthday.',
      },
      bmiCalculator: {
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index',
        article: 'The BMI calculator helps you know if your weight is healthy. Enter your height and weight and get a detailed analysis.',
      },
      unitConverter: {
        name: 'Unit Converter',
        description: 'Convert between different units of measurement',
        article: 'The unit converter converts between units of length, weight, volume, area, temperature, and more. A comprehensive conversion tool.',
      },
      tipCalculator: {
        name: 'Tip Calculator',
        description: 'Calculate tips and split bills',
        article: 'The tip calculator helps you calculate the appropriate tip and split the bill between multiple people easily.',
      },
      qrGenerator: {
        name: 'QR Generator',
        description: 'Create QR codes for your links and text',
        article: 'The QR code generator allows you to create QR codes for any link or text. Customize colors and size and download in high quality.',
      },
      qrScanner: {
        name: 'QR Scanner',
        description: 'Scan QR codes from images',
        article: 'The QR code scanner reads QR codes from uploaded images and extracts the content. Upload an image and get the link or text.',
      },
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with ❤️',
    },
    about: {
      title: 'About Us',
      description: 'We provide a collection of free online tools to help you with your daily tasks. All our tools work directly from your browser without the need to download any software or upload your files to external servers.',
    },
    contact: {
      title: 'Contact Us',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
    },
    ads: {
      placeholder: 'Ad Space',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      tools: 'Outils',
      about: 'À propos',
      contact: 'Contact',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
    },
    hero: {
      title: 'Meilleurs outils gratuits en ligne',
      subtitle: 'Une collection complète d\'outils gratuits pour convertir des images, des PDF, du texte et plus encore - tout fonctionne directement depuis votre navigateur',
      searchPlaceholder: 'Rechercher un outil...',
      cta: 'Explorer les outils',
    },
    categories: {
      all: 'Tout',
      image: 'Outils d\'image',
      pdf: 'Outils PDF',
      text: 'Outils de texte',
      color: 'Outils de couleur',
      calculator: 'Calculatrices',
      qr: 'Outils QR',
    },
    common: {
      download: 'Télécharger',
      copy: 'Copier',
      copied: 'Copié !',
      reset: 'Réinitialiser',
      convert: 'Convertir',
      generate: 'Générer',
      upload: 'Télécharger un fichier',
      dragDrop: 'Glissez-déposez le fichier ici ou cliquez pour sélectionner',
      processing: 'Traitement en cours...',
      success: 'Opération réussie !',
      error: 'Une erreur s\'est produite, veuillez réessayer',
      selectFile: 'Sélectionner un fichier',
      selectImage: 'Sélectionner une image',
      noResults: 'Aucun résultat trouvé',
      loading: 'Chargement...',
      save: 'Enregistrer',
      cancel: 'Annuler',
      close: 'Fermer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      language: 'Langue',
      theme: 'Thème',
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre',
    },
    tools: {
      imageConverter: {
        name: 'Convertisseur d\'images',
        description: 'Convertissez vos images entre différents formats (PNG, JPG, WebP, GIF)',
        article: 'La conversion d\'images entre différents formats est désormais facile avec notre outil gratuit. Le convertisseur d\'images prend en charge tous les formats populaires comme PNG, JPG, WebP et GIF.',
      },
      imageCompressor: {
        name: 'Compresseur d\'images',
        description: 'Réduisez la taille des images tout en maintenant la qualité',
        article: 'Notre compresseur d\'images gratuit vous aide à réduire la taille des fichiers image tout en maintenant leur qualité.',
      },
      imageResizer: {
        name: 'Redimensionneur d\'images',
        description: 'Redimensionnez facilement vos images',
        article: 'L\'outil de redimensionnement d\'images vous permet d\'ajuster facilement les dimensions de vos images.',
      },
      imageCropper: {
        name: 'Recadrage d\'images',
        description: 'Recadrez et sélectionnez la partie souhaitée de vos images',
        article: 'L\'outil de recadrage d\'images vous permet de sélectionner et de recadrer avec précision la partie souhaitée de votre image.',
      },
      backgroundRemover: {
        name: 'Suppression de fond',
        description: 'Supprimez automatiquement les arrière-plans d\'images',
        article: 'L\'outil de suppression de fond utilise l\'IA pour supprimer automatiquement les arrière-plans de vos images.',
      },
      imageToBase64: {
        name: 'Image vers Base64',
        description: 'Convertissez vos images en code Base64',
        article: 'Le convertisseur image vers Base64 est utile pour les développeurs. Convertissez vos images en texte encodé.',
      },
      pdfMerge: {
        name: 'Fusionner PDF',
        description: 'Fusionnez plusieurs fichiers PDF en un seul',
        article: 'L\'outil de fusion PDF vous permet de combiner facilement plusieurs fichiers PDF en un seul.',
      },
      pdfSplit: {
        name: 'Diviser PDF',
        description: 'Divisez un fichier PDF en plusieurs fichiers',
        article: 'L\'outil de division PDF vous permet de séparer les pages PDF en fichiers distincts.',
      },
      pdfCompress: {
        name: 'Compresser PDF',
        description: 'Réduisez la taille des fichiers PDF',
        article: 'Le compresseur PDF vous aide à réduire la taille des gros fichiers PDF tout en maintenant la qualité du contenu.',
      },
      pdfToImage: {
        name: 'PDF vers Image',
        description: 'Convertissez les pages PDF en images',
        article: 'Convertissez des fichiers PDF en images de haute qualité. Choisissez le format d\'image souhaité.',
      },
      imageToPdf: {
        name: 'Image vers PDF',
        description: 'Convertissez vos images en fichier PDF',
        article: 'Le convertisseur image vers PDF combine vos images en un seul fichier PDF.',
      },
      pdfRotate: {
        name: 'Rotation PDF',
        description: 'Faites pivoter les pages PDF',
        article: 'L\'outil de rotation PDF vous aide à corriger l\'orientation des pages PDF numérisées.',
      },
      pdfSign: {
        name: 'Signature PDF',
        description: 'Signez électroniquement les fichiers PDF',
        article: 'L\'outil de signature PDF vous permet d\'ajouter votre signature électronique aux documents PDF.',
      },
      pdfWatermark: {
        name: 'Filigrane PDF',
        description: 'Ajoutez un filigrane aux fichiers PDF',
        article: 'L\'outil de filigrane protège vos documents PDF en ajoutant du texte ou un logo sur toutes les pages.',
      },
      pdfProtect: {
        name: 'Protection PDF',
        description: 'Ajoutez un mot de passe aux fichiers PDF',
        article: 'L\'outil de protection PDF ajoute une couche de sécurité à vos documents via mot de passe.',
      },
      pdfPageNumbers: {
        name: 'Numérotation PDF',
        description: 'Ajoutez des numéros de page aux fichiers PDF',
        article: 'L\'outil de numérotation PDF ajoute automatiquement des numéros de page à toutes les pages.',
      },
      pdfToHtml: {
        name: 'PDF vers HTML',
        description: 'Convertissez PDF en pages HTML',
        article: 'Le convertisseur PDF vers HTML transforme les documents PDF en pages web HTML modifiables.',
      },
      pdfToWord: {
        name: 'PDF vers Word',
        description: 'Convertissez PDF en documents Word',
        article: 'Le convertisseur PDF vers Word transforme les fichiers PDF en documents Microsoft Word modifiables.',
      },
      textCounter: {
        name: 'Compteur de texte',
        description: 'Comptez les mots, caractères et phrases',
        article: 'L\'outil compteur de texte fournit des statistiques précises sur votre texte.',
      },
      textFormatter: {
        name: 'Formateur de texte',
        description: 'Formatez votre texte (majuscules, minuscules, titre)',
        article: 'L\'outil de formatage de texte vous permet de convertir votre texte en différents formats.',
      },
      textDiff: {
        name: 'Comparaison de texte',
        description: 'Comparez deux textes et trouvez les différences',
        article: 'L\'outil de comparaison de texte vous aide à trouver les différences entre deux textes.',
      },
      loremGenerator: {
        name: 'Générateur Lorem Ipsum',
        description: 'Générez du texte Lorem Ipsum pour le design',
        article: 'Le générateur Lorem Ipsum fournit du texte de remplissage pour les designers et développeurs.',
      },
      slugGenerator: {
        name: 'Générateur de Slug',
        description: 'Convertissez le texte en slugs URL',
        article: 'L\'outil générateur de slug convertit votre texte en URL propres et optimisées pour le SEO.',
      },
      colorPicker: {
        name: 'Sélecteur de couleurs',
        description: 'Choisissez des couleurs et obtenez leurs codes',
        article: 'Le sélecteur de couleurs vous permet de choisir n\'importe quelle couleur et d\'obtenir son code.',
      },
      colorPalette: {
        name: 'Générateur de palette',
        description: 'Générez des palettes de couleurs harmonieuses',
        article: 'Le générateur de palette de couleurs vous aide à créer des palettes harmonieuses pour vos projets.',
      },
      colorConverter: {
        name: 'Convertisseur de couleurs',
        description: 'Convertissez entre les formats de couleurs',
        article: 'Le convertisseur de couleurs convertit entre différents formats comme HEX, RGB, HSL et CMYK.',
      },
      gradientGenerator: {
        name: 'Générateur de dégradé',
        description: 'Créez de beaux dégradés de couleurs',
        article: 'Le générateur de dégradé vous permet de créer de superbes dégradés pour vos designs.',
      },
      contrastChecker: {
        name: 'Vérificateur de contraste',
        description: 'Vérifiez le contraste des couleurs pour l\'accessibilité',
        article: 'Le vérificateur de contraste vous aide à vous assurer que vos couleurs respectent les normes WCAG.',
      },
      percentageCalculator: {
        name: 'Calculateur de pourcentage',
        description: 'Calculez facilement les pourcentages',
        article: 'Le calculateur de pourcentage fournit des calculs rapides de pourcentage.',
      },
      ageCalculator: {
        name: 'Calculateur d\'âge',
        description: 'Calculez votre âge en années, mois et jours',
        article: 'Le calculateur d\'âge calcule précisément votre âge en années, mois et jours.',
      },
      bmiCalculator: {
        name: 'Calculateur IMC',
        description: 'Calculez votre Indice de Masse Corporelle',
        article: 'Le calculateur IMC vous aide à savoir si votre poids est sain.',
      },
      unitConverter: {
        name: 'Convertisseur d\'unités',
        description: 'Convertissez entre différentes unités de mesure',
        article: 'Le convertisseur d\'unités convertit entre les unités de longueur, poids, volume, surface et température.',
      },
      tipCalculator: {
        name: 'Calculateur de pourboire',
        description: 'Calculez les pourboires et divisez les factures',
        article: 'Le calculateur de pourboire vous aide à calculer le pourboire approprié et à diviser l\'addition.',
      },
      qrGenerator: {
        name: 'Générateur QR',
        description: 'Créez des codes QR pour vos liens et textes',
        article: 'Le générateur de codes QR vous permet de créer des codes QR pour n\'importe quel lien ou texte.',
      },
      qrScanner: {
        name: 'Scanner QR',
        description: 'Scannez les codes QR à partir d\'images',
        article: 'Le scanner de codes QR lit les codes QR à partir d\'images téléchargées et extrait le contenu.',
      },
    },
    footer: {
      rights: 'Tous droits réservés',
      madeWith: 'Fait avec ❤️',
    },
    about: {
      title: 'À propos de nous',
      description: 'Nous fournissons une collection d\'outils en ligne gratuits pour vous aider dans vos tâches quotidiennes.',
    },
    contact: {
      title: 'Contactez-nous',
      name: 'Nom',
      email: 'E-mail',
      message: 'Message',
      send: 'Envoyer',
    },
    ads: {
      placeholder: 'Espace publicitaire',
    },
  },
};
