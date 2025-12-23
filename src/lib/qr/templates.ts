// QR Code Templates - 100+ templates organized by categories

export interface QRTemplate {
  id: string;
  name: string;
  nameAr: string;
  primaryColor: string;
  secondaryColor?: string;
  gradient?: boolean;
  pattern?: 'squares' | 'dots' | 'rounded';
  category: string;
}

export interface QRCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  templates: QRTemplate[];
}

// Generate gradient colors
const generateGradientPair = (h1: number, h2: number, s: number = 70, l: number = 50) => ({
  primary: `hsl(${h1}, ${s}%, ${l}%)`,
  secondary: `hsl(${h2}, ${s}%, ${l}%)`,
});

export const qrCategories: QRCategory[] = [
  {
    id: 'sports',
    name: 'Sports',
    nameAr: 'رياضة',
    icon: '⚽',
    templates: [
      { id: 'sports-1', name: 'Football Green', nameAr: 'أخضر كروي', primaryColor: '#1e8449', category: 'sports' },
      { id: 'sports-2', name: 'Basketball Orange', nameAr: 'برتقالي سلة', primaryColor: '#e67e22', category: 'sports' },
      { id: 'sports-3', name: 'Tennis Yellow', nameAr: 'أصفر تنس', primaryColor: '#f1c40f', secondaryColor: '#27ae60', gradient: true, category: 'sports' },
      { id: 'sports-4', name: 'Swimming Blue', nameAr: 'أزرق سباحة', primaryColor: '#3498db', category: 'sports' },
      { id: 'sports-5', name: 'Racing Red', nameAr: 'أحمر سباق', primaryColor: '#c0392b', secondaryColor: '#e74c3c', gradient: true, category: 'sports' },
      { id: 'sports-6', name: 'Golf Green', nameAr: 'أخضر جولف', primaryColor: '#27ae60', secondaryColor: '#1abc9c', gradient: true, category: 'sports' },
      { id: 'sports-7', name: 'Boxing Red', nameAr: 'أحمر ملاكمة', primaryColor: '#8e1600', category: 'sports' },
      { id: 'sports-8', name: 'Cycling Purple', nameAr: 'بنفسجي دراجات', primaryColor: '#8e44ad', secondaryColor: '#3498db', gradient: true, category: 'sports' },
      { id: 'sports-9', name: 'Gym Metal', nameAr: 'رمادي رياضي', primaryColor: '#2c3e50', secondaryColor: '#34495e', gradient: true, category: 'sports' },
      { id: 'sports-10', name: 'Olympic Gold', nameAr: 'ذهبي أولمبي', primaryColor: '#d4af37', secondaryColor: '#f4d03f', gradient: true, category: 'sports' },
    ]
  },
  {
    id: 'love',
    name: 'Love & Romance',
    nameAr: 'حب ورومانسية',
    icon: '❤️',
    templates: [
      { id: 'love-1', name: 'Romantic Red', nameAr: 'أحمر رومانسي', primaryColor: '#e74c3c', category: 'love' },
      { id: 'love-2', name: 'Pink Love', nameAr: 'وردي عشق', primaryColor: '#ff6b9d', secondaryColor: '#c44569', gradient: true, category: 'love' },
      { id: 'love-3', name: 'Rose Gold', nameAr: 'ذهبي وردي', primaryColor: '#b76e79', secondaryColor: '#daa520', gradient: true, category: 'love' },
      { id: 'love-4', name: 'Passionate Purple', nameAr: 'بنفسجي عاطفي', primaryColor: '#9b59b6', secondaryColor: '#e91e63', gradient: true, category: 'love' },
      { id: 'love-5', name: 'Sweet Coral', nameAr: 'مرجاني حلو', primaryColor: '#ff7675', category: 'love' },
      { id: 'love-6', name: 'Blush Pink', nameAr: 'وردي خجول', primaryColor: '#fdcb6e', secondaryColor: '#e17055', gradient: true, category: 'love' },
      { id: 'love-7', name: 'Valentine Red', nameAr: 'أحمر عيد الحب', primaryColor: '#c0392b', secondaryColor: '#e74c3c', gradient: true, category: 'love' },
      { id: 'love-8', name: 'Lavender Dreams', nameAr: 'لافندر حالم', primaryColor: '#a29bfe', secondaryColor: '#fd79a8', gradient: true, category: 'love' },
      { id: 'love-9', name: 'Cherry Blossom', nameAr: 'زهر الكرز', primaryColor: '#fab1a0', secondaryColor: '#ff7675', gradient: true, category: 'love' },
      { id: 'love-10', name: 'Sunset Love', nameAr: 'غروب الحب', primaryColor: '#ff6348', secondaryColor: '#ff4757', gradient: true, category: 'love' },
    ]
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    nameAr: 'طعام ومشروبات',
    icon: '🍔',
    templates: [
      { id: 'food-1', name: 'Coffee Brown', nameAr: 'بني قهوة', primaryColor: '#6f4e37', category: 'food' },
      { id: 'food-2', name: 'Fresh Green', nameAr: 'أخضر طازج', primaryColor: '#00b894', secondaryColor: '#55a630', gradient: true, category: 'food' },
      { id: 'food-3', name: 'Orange Juice', nameAr: 'عصير برتقال', primaryColor: '#f39c12', secondaryColor: '#e67e22', gradient: true, category: 'food' },
      { id: 'food-4', name: 'Berry Purple', nameAr: 'بنفسجي توت', primaryColor: '#6c5ce7', category: 'food' },
      { id: 'food-5', name: 'Chocolate', nameAr: 'شوكولاتة', primaryColor: '#5d4037', secondaryColor: '#795548', gradient: true, category: 'food' },
      { id: 'food-6', name: 'Strawberry', nameAr: 'فراولة', primaryColor: '#ff6b6b', secondaryColor: '#ee5a5a', gradient: true, category: 'food' },
      { id: 'food-7', name: 'Mint Fresh', nameAr: 'نعناع منعش', primaryColor: '#00cec9', secondaryColor: '#55efc4', gradient: true, category: 'food' },
      { id: 'food-8', name: 'Honey Gold', nameAr: 'ذهبي عسل', primaryColor: '#f9ca24', secondaryColor: '#f0932b', gradient: true, category: 'food' },
      { id: 'food-9', name: 'Avocado', nameAr: 'أفوكادو', primaryColor: '#6ab04c', secondaryColor: '#badc58', gradient: true, category: 'food' },
      { id: 'food-10', name: 'Wine Red', nameAr: 'أحمر نبيذي', primaryColor: '#722f37', secondaryColor: '#8b0000', gradient: true, category: 'food' },
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    nameAr: 'تكنولوجيا',
    icon: '💻',
    templates: [
      { id: 'tech-1', name: 'Cyber Blue', nameAr: 'أزرق سايبر', primaryColor: '#0984e3', secondaryColor: '#00cec9', gradient: true, category: 'technology' },
      { id: 'tech-2', name: 'Matrix Green', nameAr: 'أخضر ماتريكس', primaryColor: '#00ff00', secondaryColor: '#00cc00', gradient: true, category: 'technology' },
      { id: 'tech-3', name: 'Neon Purple', nameAr: 'بنفسجي نيون', primaryColor: '#a855f7', secondaryColor: '#7c3aed', gradient: true, category: 'technology' },
      { id: 'tech-4', name: 'Dark Mode', nameAr: 'الوضع الداكن', primaryColor: '#2d3436', secondaryColor: '#636e72', gradient: true, category: 'technology' },
      { id: 'tech-5', name: 'Electric Blue', nameAr: 'أزرق كهربائي', primaryColor: '#00d2d3', secondaryColor: '#54a0ff', gradient: true, category: 'technology' },
      { id: 'tech-6', name: 'AI Gradient', nameAr: 'تدرج ذكاء', primaryColor: '#667eea', secondaryColor: '#764ba2', gradient: true, category: 'technology' },
      { id: 'tech-7', name: 'Holographic', nameAr: 'هولوغرافي', primaryColor: '#f093fb', secondaryColor: '#f5576c', gradient: true, category: 'technology' },
      { id: 'tech-8', name: 'Binary Black', nameAr: 'أسود ثنائي', primaryColor: '#1a1a2e', secondaryColor: '#16213e', gradient: true, category: 'technology' },
      { id: 'tech-9', name: 'Cloud Blue', nameAr: 'أزرق سحابي', primaryColor: '#74b9ff', secondaryColor: '#0984e3', gradient: true, category: 'technology' },
      { id: 'tech-10', name: 'Robot Silver', nameAr: 'فضي روبوتي', primaryColor: '#636e72', secondaryColor: '#b2bec3', gradient: true, category: 'technology' },
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    nameAr: 'تواصل اجتماعي',
    icon: '📱',
    templates: [
      { id: 'social-1', name: 'Instagram', nameAr: 'انستغرام', primaryColor: '#e1306c', secondaryColor: '#f77737', gradient: true, category: 'social' },
      { id: 'social-2', name: 'Facebook Blue', nameAr: 'أزرق فيسبوك', primaryColor: '#1877f2', category: 'social' },
      { id: 'social-3', name: 'Twitter Blue', nameAr: 'أزرق تويتر', primaryColor: '#1da1f2', category: 'social' },
      { id: 'social-4', name: 'TikTok', nameAr: 'تيك توك', primaryColor: '#000000', secondaryColor: '#ff0050', gradient: true, category: 'social' },
      { id: 'social-5', name: 'LinkedIn', nameAr: 'لينكد إن', primaryColor: '#0077b5', category: 'social' },
      { id: 'social-6', name: 'YouTube Red', nameAr: 'أحمر يوتيوب', primaryColor: '#ff0000', category: 'social' },
      { id: 'social-7', name: 'WhatsApp', nameAr: 'واتساب', primaryColor: '#25d366', category: 'social' },
      { id: 'social-8', name: 'Snapchat', nameAr: 'سناب شات', primaryColor: '#fffc00', secondaryColor: '#ffd700', gradient: true, category: 'social' },
      { id: 'social-9', name: 'Pinterest', nameAr: 'بنترست', primaryColor: '#e60023', category: 'social' },
      { id: 'social-10', name: 'Discord', nameAr: 'ديسكورد', primaryColor: '#5865f2', secondaryColor: '#7289da', gradient: true, category: 'social' },
    ]
  },
  {
    id: 'business',
    name: 'Business',
    nameAr: 'أعمال',
    icon: '💼',
    templates: [
      { id: 'business-1', name: 'Corporate Blue', nameAr: 'أزرق مؤسسي', primaryColor: '#2c3e50', secondaryColor: '#3498db', gradient: true, category: 'business' },
      { id: 'business-2', name: 'Executive Black', nameAr: 'أسود تنفيذي', primaryColor: '#1a1a1a', category: 'business' },
      { id: 'business-3', name: 'Trust Blue', nameAr: 'أزرق الثقة', primaryColor: '#2980b9', category: 'business' },
      { id: 'business-4', name: 'Gold Premium', nameAr: 'ذهبي متميز', primaryColor: '#c9a227', secondaryColor: '#ffd700', gradient: true, category: 'business' },
      { id: 'business-5', name: 'Silver Pro', nameAr: 'فضي احترافي', primaryColor: '#7f8c8d', secondaryColor: '#95a5a6', gradient: true, category: 'business' },
      { id: 'business-6', name: 'Navy Classic', nameAr: 'كحلي كلاسيكي', primaryColor: '#1e3d59', category: 'business' },
      { id: 'business-7', name: 'Charcoal', nameAr: 'فحمي', primaryColor: '#34495e', secondaryColor: '#2c3e50', gradient: true, category: 'business' },
      { id: 'business-8', name: 'Burgundy', nameAr: 'بورغندي', primaryColor: '#800020', secondaryColor: '#a52a2a', gradient: true, category: 'business' },
      { id: 'business-9', name: 'Forest Green', nameAr: 'أخضر غابي', primaryColor: '#1d4e4a', category: 'business' },
      { id: 'business-10', name: 'Platinum', nameAr: 'بلاتيني', primaryColor: '#e5e4e2', secondaryColor: '#c0c0c0', gradient: true, category: 'business' },
    ]
  },
  {
    id: 'nature',
    name: 'Nature',
    nameAr: 'طبيعة',
    icon: '🌿',
    templates: [
      { id: 'nature-1', name: 'Forest Green', nameAr: 'أخضر غابة', primaryColor: '#228b22', secondaryColor: '#2e8b57', gradient: true, category: 'nature' },
      { id: 'nature-2', name: 'Ocean Blue', nameAr: 'أزرق محيط', primaryColor: '#006994', secondaryColor: '#00a8e8', gradient: true, category: 'nature' },
      { id: 'nature-3', name: 'Sunset Orange', nameAr: 'برتقالي غروب', primaryColor: '#ff6f61', secondaryColor: '#ffd700', gradient: true, category: 'nature' },
      { id: 'nature-4', name: 'Sky Blue', nameAr: 'أزرق سماوي', primaryColor: '#87ceeb', secondaryColor: '#00bfff', gradient: true, category: 'nature' },
      { id: 'nature-5', name: 'Earth Brown', nameAr: 'بني أرضي', primaryColor: '#8b4513', secondaryColor: '#a0522d', gradient: true, category: 'nature' },
      { id: 'nature-6', name: 'Tropical', nameAr: 'استوائي', primaryColor: '#00c853', secondaryColor: '#00e676', gradient: true, category: 'nature' },
      { id: 'nature-7', name: 'Desert Sand', nameAr: 'رمال صحراء', primaryColor: '#c2b280', secondaryColor: '#d4a574', gradient: true, category: 'nature' },
      { id: 'nature-8', name: 'Mountain Gray', nameAr: 'رمادي جبلي', primaryColor: '#708090', secondaryColor: '#778899', gradient: true, category: 'nature' },
      { id: 'nature-9', name: 'Flower Pink', nameAr: 'وردي زهري', primaryColor: '#ffb6c1', secondaryColor: '#ff69b4', gradient: true, category: 'nature' },
      { id: 'nature-10', name: 'Leaf Green', nameAr: 'أخضر ورقي', primaryColor: '#90ee90', secondaryColor: '#32cd32', gradient: true, category: 'nature' },
    ]
  },
  {
    id: 'art',
    name: 'Art & Design',
    nameAr: 'فن وتصميم',
    icon: '🎨',
    templates: [
      { id: 'art-1', name: 'Pop Art', nameAr: 'فن بوب', primaryColor: '#ff1493', secondaryColor: '#00ffff', gradient: true, category: 'art' },
      { id: 'art-2', name: 'Minimal Black', nameAr: 'أسود بسيط', primaryColor: '#000000', category: 'art' },
      { id: 'art-3', name: 'Bauhaus Red', nameAr: 'أحمر باوهاوس', primaryColor: '#ff3b30', category: 'art' },
      { id: 'art-4', name: 'Pastel Dream', nameAr: 'باستيل حالم', primaryColor: '#ffeaa7', secondaryColor: '#dfe6e9', gradient: true, category: 'art' },
      { id: 'art-5', name: 'Mondrian', nameAr: 'موندريان', primaryColor: '#0057b8', secondaryColor: '#ffd700', gradient: true, category: 'art' },
      { id: 'art-6', name: 'Abstract Purple', nameAr: 'بنفسجي تجريدي', primaryColor: '#9b59b6', secondaryColor: '#3498db', gradient: true, category: 'art' },
      { id: 'art-7', name: 'Graffiti', nameAr: 'جرافيتي', primaryColor: '#e91e63', secondaryColor: '#ff5722', gradient: true, category: 'art' },
      { id: 'art-8', name: 'Vintage Sepia', nameAr: 'بني قديم', primaryColor: '#704214', secondaryColor: '#a0522d', gradient: true, category: 'art' },
      { id: 'art-9', name: 'Neon Glow', nameAr: 'توهج نيون', primaryColor: '#39ff14', secondaryColor: '#ff073a', gradient: true, category: 'art' },
      { id: 'art-10', name: 'Watercolor', nameAr: 'ألوان مائية', primaryColor: '#a8d8ea', secondaryColor: '#aa96da', gradient: true, category: 'art' },
    ]
  },
  {
    id: 'music',
    name: 'Music',
    nameAr: 'موسيقى',
    icon: '🎵',
    templates: [
      { id: 'music-1', name: 'Spotify Green', nameAr: 'أخضر سبوتيفاي', primaryColor: '#1db954', category: 'music' },
      { id: 'music-2', name: 'Rock Black', nameAr: 'أسود روك', primaryColor: '#1a1a1a', secondaryColor: '#ff0000', gradient: true, category: 'music' },
      { id: 'music-3', name: 'Jazz Gold', nameAr: 'ذهبي جاز', primaryColor: '#d4af37', secondaryColor: '#8b4513', gradient: true, category: 'music' },
      { id: 'music-4', name: 'EDM Neon', nameAr: 'نيون إلكتروني', primaryColor: '#00ffff', secondaryColor: '#ff00ff', gradient: true, category: 'music' },
      { id: 'music-5', name: 'Classical Ivory', nameAr: 'عاجي كلاسيكي', primaryColor: '#fffff0', secondaryColor: '#f5f5dc', gradient: true, category: 'music' },
      { id: 'music-6', name: 'Hip Hop', nameAr: 'هيب هوب', primaryColor: '#ff6600', secondaryColor: '#ffcc00', gradient: true, category: 'music' },
      { id: 'music-7', name: 'Reggae', nameAr: 'ريغي', primaryColor: '#008000', secondaryColor: '#ffff00', gradient: true, category: 'music' },
      { id: 'music-8', name: 'Blues Indigo', nameAr: 'نيلي بلوز', primaryColor: '#4b0082', secondaryColor: '#0000cd', gradient: true, category: 'music' },
      { id: 'music-9', name: 'Pop Pink', nameAr: 'وردي بوب', primaryColor: '#ff69b4', secondaryColor: '#ff1493', gradient: true, category: 'music' },
      { id: 'music-10', name: 'Vinyl Black', nameAr: 'أسود فينيل', primaryColor: '#1c1c1c', secondaryColor: '#383838', gradient: true, category: 'music' },
    ]
  },
  {
    id: 'events',
    name: 'Events',
    nameAr: 'مناسبات',
    icon: '🎉',
    templates: [
      { id: 'events-1', name: 'Party Gold', nameAr: 'ذهبي حفلة', primaryColor: '#ffd700', secondaryColor: '#ff8c00', gradient: true, category: 'events' },
      { id: 'events-2', name: 'Wedding White', nameAr: 'أبيض زفاف', primaryColor: '#f8f8ff', secondaryColor: '#fffafa', gradient: true, category: 'events' },
      { id: 'events-3', name: 'Birthday Confetti', nameAr: 'ألوان عيد ميلاد', primaryColor: '#ff6b6b', secondaryColor: '#4ecdc4', gradient: true, category: 'events' },
      { id: 'events-4', name: 'Corporate Event', nameAr: 'حدث مؤسسي', primaryColor: '#2c3e50', secondaryColor: '#1abc9c', gradient: true, category: 'events' },
      { id: 'events-5', name: 'Festival Rainbow', nameAr: 'مهرجان قوس قزح', primaryColor: '#ff0080', secondaryColor: '#00ffff', gradient: true, category: 'events' },
      { id: 'events-6', name: 'Graduation Blue', nameAr: 'أزرق تخرج', primaryColor: '#000080', secondaryColor: '#4169e1', gradient: true, category: 'events' },
      { id: 'events-7', name: 'Christmas Red', nameAr: 'أحمر كريسماس', primaryColor: '#c41e3a', secondaryColor: '#006400', gradient: true, category: 'events' },
      { id: 'events-8', name: 'Halloween Orange', nameAr: 'برتقالي هالوين', primaryColor: '#ff6600', secondaryColor: '#1a1a1a', gradient: true, category: 'events' },
      { id: 'events-9', name: 'New Year Sparkle', nameAr: 'بريق رأس السنة', primaryColor: '#c0c0c0', secondaryColor: '#ffd700', gradient: true, category: 'events' },
      { id: 'events-10', name: 'Ramadan Gold', nameAr: 'ذهبي رمضان', primaryColor: '#d4af37', secondaryColor: '#228b22', gradient: true, category: 'events' },
    ]
  },
];

// Get all templates flattened
export const getAllTemplates = (): QRTemplate[] => {
  return qrCategories.flatMap(cat => cat.templates);
};

// Get random template
export const getRandomTemplate = (): QRTemplate => {
  const all = getAllTemplates();
  return all[Math.floor(Math.random() * all.length)];
};

// Get templates by category
export const getTemplatesByCategory = (categoryId: string): QRTemplate[] => {
  const category = qrCategories.find(cat => cat.id === categoryId);
  return category?.templates || [];
};

// Convert hex to HSL for gradients
export const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// Generate CSS gradient from template
export const getTemplateGradient = (template: QRTemplate): string => {
  if (template.gradient && template.secondaryColor) {
    return `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})`;
  }
  return template.primaryColor;
};
