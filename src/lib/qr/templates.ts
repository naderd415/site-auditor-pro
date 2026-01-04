// QR Code Templates - 200+ templates organized by categories

export interface QRTemplate {
  id: string;
  name: string;
  nameAr: string;
  primaryColor: string;
  secondaryColor?: string;
  gradient?: boolean;
  pattern?: 'squares' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded' | 'diamond' | 'star' | 'heart' | 'hexagon';
  category: string;
}

export interface QRCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  templates: QRTemplate[];
}

export const qrCategories: QRCategory[] = [
  {
    id: 'sports',
    name: 'Sports',
    nameAr: 'رياضة',
    icon: '⚽',
    templates: [
      { id: 'sports-1', name: 'Football Green', nameAr: 'أخضر كروي', primaryColor: '#1e8449', pattern: 'dots', category: 'sports' },
      { id: 'sports-2', name: 'Basketball Orange', nameAr: 'برتقالي سلة', primaryColor: '#e67e22', pattern: 'dots', category: 'sports' },
      { id: 'sports-3', name: 'Tennis Yellow', nameAr: 'أصفر تنس', primaryColor: '#f1c40f', secondaryColor: '#27ae60', gradient: true, pattern: 'dots', category: 'sports' },
      { id: 'sports-4', name: 'Swimming Blue', nameAr: 'أزرق سباحة', primaryColor: '#3498db', pattern: 'extra-rounded', category: 'sports' },
      { id: 'sports-5', name: 'Racing Red', nameAr: 'أحمر سباق', primaryColor: '#c0392b', secondaryColor: '#e74c3c', gradient: true, pattern: 'diamond', category: 'sports' },
      { id: 'sports-6', name: 'Golf Green', nameAr: 'أخضر جولف', primaryColor: '#27ae60', secondaryColor: '#1abc9c', gradient: true, pattern: 'dots', category: 'sports' },
      { id: 'sports-7', name: 'Boxing Red', nameAr: 'أحمر ملاكمة', primaryColor: '#8e1600', pattern: 'squares', category: 'sports' },
      { id: 'sports-8', name: 'Cycling Purple', nameAr: 'بنفسجي دراجات', primaryColor: '#8e44ad', secondaryColor: '#3498db', gradient: true, pattern: 'dots', category: 'sports' },
      { id: 'sports-9', name: 'Gym Metal', nameAr: 'رمادي رياضي', primaryColor: '#2c3e50', secondaryColor: '#34495e', gradient: true, pattern: 'squares', category: 'sports' },
      { id: 'sports-10', name: 'Olympic Gold', nameAr: 'ذهبي أولمبي', primaryColor: '#d4af37', secondaryColor: '#f4d03f', gradient: true, pattern: 'star', category: 'sports' },
      { id: 'sports-11', name: 'Rugby Brown', nameAr: 'بني رجبي', primaryColor: '#8B4513', pattern: 'rounded', category: 'sports' },
      { id: 'sports-12', name: 'Hockey Ice', nameAr: 'جليد هوكي', primaryColor: '#87CEEB', secondaryColor: '#4169E1', gradient: true, pattern: 'diamond', category: 'sports' },
      { id: 'sports-13', name: 'Volleyball Sand', nameAr: 'رملي كرة طائرة', primaryColor: '#F4A460', pattern: 'dots', category: 'sports' },
      { id: 'sports-14', name: 'Cricket Green', nameAr: 'أخضر كريكيت', primaryColor: '#228B22', secondaryColor: '#32CD32', gradient: true, pattern: 'rounded', category: 'sports' },
      { id: 'sports-15', name: 'Surfing Wave', nameAr: 'موجة تصفح', primaryColor: '#00CED1', secondaryColor: '#20B2AA', gradient: true, pattern: 'extra-rounded', category: 'sports' },
      { id: 'sports-16', name: 'Skiing White', nameAr: 'أبيض تزلج', primaryColor: '#708090', secondaryColor: '#B0C4DE', gradient: true, pattern: 'diamond', category: 'sports' },
      { id: 'sports-17', name: 'Wrestling Bronze', nameAr: 'برونزي مصارعة', primaryColor: '#CD7F32', pattern: 'squares', category: 'sports' },
      { id: 'sports-18', name: 'Archery Target', nameAr: 'هدف رماية', primaryColor: '#DC143C', secondaryColor: '#FFD700', gradient: true, pattern: 'dots', category: 'sports' },
      { id: 'sports-19', name: 'Fencing Silver', nameAr: 'فضي مبارزة', primaryColor: '#708090', pattern: 'classy', category: 'sports' },
      { id: 'sports-20', name: 'Marathon Runner', nameAr: 'عداء ماراثون', primaryColor: '#FF4500', secondaryColor: '#FF6347', gradient: true, pattern: 'dots', category: 'sports' },
    ]
  },
  {
    id: 'love',
    name: 'Love & Romance',
    nameAr: 'حب ورومانسية',
    icon: '❤️',
    templates: [
      { id: 'love-1', name: 'Romantic Red', nameAr: 'أحمر رومانسي', primaryColor: '#e74c3c', pattern: 'extra-rounded', category: 'love' },
      { id: 'love-2', name: 'Pink Love', nameAr: 'وردي عشق', primaryColor: '#ff6b9d', secondaryColor: '#c44569', gradient: true, pattern: 'extra-rounded', category: 'love' },
      { id: 'love-3', name: 'Rose Gold', nameAr: 'ذهبي وردي', primaryColor: '#b76e79', secondaryColor: '#daa520', gradient: true, pattern: 'classy-rounded', category: 'love' },
      { id: 'love-4', name: 'Passionate Purple', nameAr: 'بنفسجي عاطفي', primaryColor: '#9b59b6', secondaryColor: '#e91e63', gradient: true, pattern: 'extra-rounded', category: 'love' },
      { id: 'love-5', name: 'Sweet Coral', nameAr: 'مرجاني حلو', primaryColor: '#ff7675', pattern: 'dots', category: 'love' },
      { id: 'love-6', name: 'Blush Pink', nameAr: 'وردي خجول', primaryColor: '#fdcb6e', secondaryColor: '#e17055', gradient: true, pattern: 'extra-rounded', category: 'love' },
      { id: 'love-7', name: 'Valentine Red', nameAr: 'أحمر عيد الحب', primaryColor: '#c0392b', secondaryColor: '#e74c3c', gradient: true, pattern: 'star', category: 'love' },
      { id: 'love-8', name: 'Lavender Dreams', nameAr: 'لافندر حالم', primaryColor: '#a29bfe', secondaryColor: '#fd79a8', gradient: true, pattern: 'extra-rounded', category: 'love' },
      { id: 'love-9', name: 'Cherry Blossom', nameAr: 'زهر الكرز', primaryColor: '#fab1a0', secondaryColor: '#ff7675', gradient: true, pattern: 'dots', category: 'love' },
      { id: 'love-10', name: 'Sunset Love', nameAr: 'غروب الحب', primaryColor: '#ff6348', secondaryColor: '#ff4757', gradient: true, pattern: 'extra-rounded', category: 'love' },
      { id: 'love-11', name: 'Heartbeat', nameAr: 'نبض القلب', primaryColor: '#FF1493', secondaryColor: '#DC143C', gradient: true, pattern: 'star', category: 'love' },
      { id: 'love-12', name: 'Eternal Rose', nameAr: 'وردة أبدية', primaryColor: '#C71585', pattern: 'extra-rounded', category: 'love' },
      { id: 'love-13', name: 'Cupid Arrow', nameAr: 'سهم كيوبيد', primaryColor: '#FF69B4', secondaryColor: '#FFB6C1', gradient: true, pattern: 'diamond', category: 'love' },
      { id: 'love-14', name: 'Moonlight', nameAr: 'ضوء القمر', primaryColor: '#9370DB', secondaryColor: '#DDA0DD', gradient: true, pattern: 'dots', category: 'love' },
      { id: 'love-15', name: 'First Kiss', nameAr: 'القبلة الأولى', primaryColor: '#DB7093', pattern: 'extra-rounded', category: 'love' },
      { id: 'love-16', name: 'True Love', nameAr: 'حب حقيقي', primaryColor: '#8B0000', secondaryColor: '#FF0000', gradient: true, pattern: 'star', category: 'love' },
      { id: 'love-17', name: 'Wedding Bells', nameAr: 'أجراس الزفاف', primaryColor: '#DAA520', secondaryColor: '#FFE4E1', gradient: true, pattern: 'classy', category: 'love' },
      { id: 'love-18', name: 'Passion Fruit', nameAr: 'فاكهة العاطفة', primaryColor: '#8B008B', secondaryColor: '#FF1493', gradient: true, pattern: 'extra-rounded', category: 'love' },
      { id: 'love-19', name: 'Love Letter', nameAr: 'رسالة حب', primaryColor: '#E75480', pattern: 'rounded', category: 'love' },
      { id: 'love-20', name: 'Forever Yours', nameAr: 'لك للأبد', primaryColor: '#FF6347', secondaryColor: '#FF4500', gradient: true, pattern: 'star', category: 'love' },
    ]
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    nameAr: 'طعام ومشروبات',
    icon: '🍔',
    templates: [
      { id: 'food-1', name: 'Coffee Brown', nameAr: 'بني قهوة', primaryColor: '#6f4e37', pattern: 'rounded', category: 'food' },
      { id: 'food-2', name: 'Fresh Green', nameAr: 'أخضر طازج', primaryColor: '#00b894', secondaryColor: '#55a630', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-3', name: 'Orange Juice', nameAr: 'عصير برتقال', primaryColor: '#f39c12', secondaryColor: '#e67e22', gradient: true, pattern: 'dots', category: 'food' },
      { id: 'food-4', name: 'Berry Purple', nameAr: 'بنفسجي توت', primaryColor: '#6c5ce7', pattern: 'extra-rounded', category: 'food' },
      { id: 'food-5', name: 'Chocolate', nameAr: 'شوكولاتة', primaryColor: '#5d4037', secondaryColor: '#795548', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-6', name: 'Strawberry', nameAr: 'فراولة', primaryColor: '#ff6b6b', secondaryColor: '#ee5a5a', gradient: true, pattern: 'dots', category: 'food' },
      { id: 'food-7', name: 'Mint Fresh', nameAr: 'نعناع منعش', primaryColor: '#00cec9', secondaryColor: '#55efc4', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-8', name: 'Honey Gold', nameAr: 'ذهبي عسل', primaryColor: '#f9ca24', secondaryColor: '#f0932b', gradient: true, pattern: 'classy-rounded', category: 'food' },
      { id: 'food-9', name: 'Avocado', nameAr: 'أفوكادو', primaryColor: '#6ab04c', secondaryColor: '#badc58', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-10', name: 'Wine Red', nameAr: 'أحمر نبيذي', primaryColor: '#722f37', secondaryColor: '#8b0000', gradient: true, pattern: 'classy', category: 'food' },
      { id: 'food-11', name: 'Lemon Fresh', nameAr: 'ليمون منعش', primaryColor: '#F4D03F', secondaryColor: '#ADFF2F', gradient: true, pattern: 'dots', category: 'food' },
      { id: 'food-12', name: 'Blueberry', nameAr: 'توت أزرق', primaryColor: '#4169E1', pattern: 'extra-rounded', category: 'food' },
      { id: 'food-13', name: 'Caramel', nameAr: 'كراميل', primaryColor: '#DAA520', secondaryColor: '#D2691E', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-14', name: 'Vanilla Cream', nameAr: 'كريمة الفانيليا', primaryColor: '#D2B48C', pattern: 'classy-rounded', category: 'food' },
      { id: 'food-15', name: 'Watermelon', nameAr: 'بطيخ', primaryColor: '#FF6B6B', secondaryColor: '#4ECB71', gradient: true, pattern: 'dots', category: 'food' },
      { id: 'food-16', name: 'Mango Tango', nameAr: 'مانجو', primaryColor: '#FF8C00', secondaryColor: '#FFD700', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-17', name: 'Grape Vine', nameAr: 'كرمة العنب', primaryColor: '#6B238E', secondaryColor: '#9400D3', gradient: true, pattern: 'extra-rounded', category: 'food' },
      { id: 'food-18', name: 'Coconut', nameAr: 'جوز الهند', primaryColor: '#8B4513', secondaryColor: '#D2B48C', gradient: true, pattern: 'rounded', category: 'food' },
      { id: 'food-19', name: 'Matcha Green', nameAr: 'ماتشا', primaryColor: '#7CFC00', secondaryColor: '#228B22', gradient: true, pattern: 'dots', category: 'food' },
      { id: 'food-20', name: 'Espresso', nameAr: 'إسبريسو', primaryColor: '#3C1414', secondaryColor: '#5C4033', gradient: true, pattern: 'squares', category: 'food' },
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    nameAr: 'تكنولوجيا',
    icon: '💻',
    templates: [
      { id: 'tech-1', name: 'Cyber Blue', nameAr: 'أزرق سايبر', primaryColor: '#0984e3', secondaryColor: '#00cec9', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-2', name: 'Matrix Green', nameAr: 'أخضر ماتريكس', primaryColor: '#00ff00', secondaryColor: '#00cc00', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-3', name: 'Neon Purple', nameAr: 'بنفسجي نيون', primaryColor: '#a855f7', secondaryColor: '#7c3aed', gradient: true, pattern: 'diamond', category: 'technology' },
      { id: 'tech-4', name: 'Dark Mode', nameAr: 'الوضع الداكن', primaryColor: '#2d3436', secondaryColor: '#636e72', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-5', name: 'Electric Blue', nameAr: 'أزرق كهربائي', primaryColor: '#00d2d3', secondaryColor: '#54a0ff', gradient: true, pattern: 'diamond', category: 'technology' },
      { id: 'tech-6', name: 'AI Gradient', nameAr: 'تدرج ذكاء', primaryColor: '#667eea', secondaryColor: '#764ba2', gradient: true, pattern: 'classy', category: 'technology' },
      { id: 'tech-7', name: 'Holographic', nameAr: 'هولوغرافي', primaryColor: '#f093fb', secondaryColor: '#f5576c', gradient: true, pattern: 'diamond', category: 'technology' },
      { id: 'tech-8', name: 'Binary Black', nameAr: 'أسود ثنائي', primaryColor: '#1a1a2e', secondaryColor: '#16213e', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-9', name: 'Cloud Blue', nameAr: 'أزرق سحابي', primaryColor: '#74b9ff', secondaryColor: '#0984e3', gradient: true, pattern: 'rounded', category: 'technology' },
      { id: 'tech-10', name: 'Robot Silver', nameAr: 'فضي روبوتي', primaryColor: '#636e72', secondaryColor: '#b2bec3', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-11', name: 'Quantum', nameAr: 'كمي', primaryColor: '#8A2BE2', secondaryColor: '#00BFFF', gradient: true, pattern: 'star', category: 'technology' },
      { id: 'tech-12', name: 'Blockchain', nameAr: 'بلوكتشين', primaryColor: '#F7931A', secondaryColor: '#4A4A4A', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-13', name: 'VR Reality', nameAr: 'واقع افتراضي', primaryColor: '#7B68EE', secondaryColor: '#00CED1', gradient: true, pattern: 'diamond', category: 'technology' },
      { id: 'tech-14', name: '5G Network', nameAr: 'شبكة 5G', primaryColor: '#00BFFF', secondaryColor: '#1E90FF', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-15', name: 'Cyberpunk', nameAr: 'سايبربانك', primaryColor: '#FF00FF', secondaryColor: '#00FFFF', gradient: true, pattern: 'diamond', category: 'technology' },
      { id: 'tech-16', name: 'Terminal', nameAr: 'تيرمنال', primaryColor: '#00FF00', pattern: 'squares', category: 'technology' },
      { id: 'tech-17', name: 'Silicon', nameAr: 'سيليكون', primaryColor: '#708090', secondaryColor: '#2F4F4F', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-18', name: 'Laser Red', nameAr: 'ليزر أحمر', primaryColor: '#FF0000', secondaryColor: '#8B0000', gradient: true, pattern: 'diamond', category: 'technology' },
      { id: 'tech-19', name: 'Digital Ocean', nameAr: 'محيط رقمي', primaryColor: '#0080FF', secondaryColor: '#00BFFF', gradient: true, pattern: 'squares', category: 'technology' },
      { id: 'tech-20', name: 'Neural Net', nameAr: 'شبكة عصبية', primaryColor: '#9370DB', secondaryColor: '#6A5ACD', gradient: true, pattern: 'classy', category: 'technology' },
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
      { id: 'social-11', name: 'Telegram', nameAr: 'تيليجرام', primaryColor: '#0088cc', category: 'social' },
      { id: 'social-12', name: 'Reddit', nameAr: 'ريديت', primaryColor: '#ff4500', category: 'social' },
      { id: 'social-13', name: 'Twitch', nameAr: 'تويتش', primaryColor: '#9146ff', category: 'social' },
      { id: 'social-14', name: 'Spotify', nameAr: 'سبوتيفاي', primaryColor: '#1db954', category: 'social' },
      { id: 'social-15', name: 'X Black', nameAr: 'إكس أسود', primaryColor: '#000000', category: 'social' },
      { id: 'social-16', name: 'Threads', nameAr: 'ثريدز', primaryColor: '#000000', secondaryColor: '#666666', gradient: true, category: 'social' },
      { id: 'social-17', name: 'BeReal', nameAr: 'بي ريل', primaryColor: '#000000', secondaryColor: '#FFFFFF', gradient: true, category: 'social' },
      { id: 'social-18', name: 'Clubhouse', nameAr: 'كلوب هاوس', primaryColor: '#F2E8CF', secondaryColor: '#8B5A2B', gradient: true, category: 'social' },
      { id: 'social-19', name: 'Medium', nameAr: 'ميديوم', primaryColor: '#000000', category: 'social' },
      { id: 'social-20', name: 'Dribbble', nameAr: 'دريبل', primaryColor: '#ea4c89', category: 'social' },
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
      { id: 'business-11', name: 'Startup Orange', nameAr: 'برتقالي ستارتب', primaryColor: '#FF6600', secondaryColor: '#FF9933', gradient: true, category: 'business' },
      { id: 'business-12', name: 'Finance Green', nameAr: 'أخضر مالي', primaryColor: '#006400', secondaryColor: '#228B22', gradient: true, category: 'business' },
      { id: 'business-13', name: 'Lawyer Brown', nameAr: 'بني قانوني', primaryColor: '#8B4513', secondaryColor: '#A0522D', gradient: true, category: 'business' },
      { id: 'business-14', name: 'Medical Blue', nameAr: 'أزرق طبي', primaryColor: '#4169E1', secondaryColor: '#00CED1', gradient: true, category: 'business' },
      { id: 'business-15', name: 'Real Estate', nameAr: 'عقارات', primaryColor: '#2E8B57', secondaryColor: '#90EE90', gradient: true, category: 'business' },
      { id: 'business-16', name: 'Consulting Gray', nameAr: 'رمادي استشاري', primaryColor: '#696969', category: 'business' },
      { id: 'business-17', name: 'Banking Blue', nameAr: 'أزرق مصرفي', primaryColor: '#00008B', secondaryColor: '#4169E1', gradient: true, category: 'business' },
      { id: 'business-18', name: 'Insurance Safe', nameAr: 'تأمين آمن', primaryColor: '#006994', category: 'business' },
      { id: 'business-19', name: 'Tech Startup', nameAr: 'شركة تقنية', primaryColor: '#7C3AED', secondaryColor: '#A855F7', gradient: true, category: 'business' },
      { id: 'business-20', name: 'Luxury Black', nameAr: 'أسود فاخر', primaryColor: '#000000', secondaryColor: '#1C1C1C', gradient: true, category: 'business' },
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
      { id: 'nature-11', name: 'Aurora', nameAr: 'شفق قطبي', primaryColor: '#00FF7F', secondaryColor: '#9400D3', gradient: true, category: 'nature' },
      { id: 'nature-12', name: 'Volcano', nameAr: 'بركان', primaryColor: '#8B0000', secondaryColor: '#FF4500', gradient: true, category: 'nature' },
      { id: 'nature-13', name: 'Coral Reef', nameAr: 'شعاب مرجانية', primaryColor: '#FF7F50', secondaryColor: '#20B2AA', gradient: true, category: 'nature' },
      { id: 'nature-14', name: 'Rainforest', nameAr: 'غابة مطيرة', primaryColor: '#006400', secondaryColor: '#228B22', gradient: true, category: 'nature' },
      { id: 'nature-15', name: 'Arctic Ice', nameAr: 'جليد قطبي', primaryColor: '#E0FFFF', secondaryColor: '#87CEEB', gradient: true, category: 'nature' },
      { id: 'nature-16', name: 'Autumn Leaves', nameAr: 'أوراق الخريف', primaryColor: '#D2691E', secondaryColor: '#8B4513', gradient: true, category: 'nature' },
      { id: 'nature-17', name: 'Spring Bloom', nameAr: 'ازدهار الربيع', primaryColor: '#98FB98', secondaryColor: '#FFB6C1', gradient: true, category: 'nature' },
      { id: 'nature-18', name: 'Thunder Storm', nameAr: 'عاصفة رعدية', primaryColor: '#4B0082', secondaryColor: '#00BFFF', gradient: true, category: 'nature' },
      { id: 'nature-19', name: 'Savanna', nameAr: 'سافانا', primaryColor: '#DAA520', secondaryColor: '#8B4513', gradient: true, category: 'nature' },
      { id: 'nature-20', name: 'Deep Sea', nameAr: 'أعماق البحر', primaryColor: '#000080', secondaryColor: '#191970', gradient: true, category: 'nature' },
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
      { id: 'art-11', name: 'Impressionist', nameAr: 'انطباعي', primaryColor: '#4169E1', secondaryColor: '#FFD700', gradient: true, category: 'art' },
      { id: 'art-12', name: 'Art Deco', nameAr: 'آرت ديكو', primaryColor: '#C9B037', secondaryColor: '#000000', gradient: true, category: 'art' },
      { id: 'art-13', name: 'Surrealist', nameAr: 'سريالي', primaryColor: '#8B008B', secondaryColor: '#00CED1', gradient: true, category: 'art' },
      { id: 'art-14', name: 'Cubist', nameAr: 'تكعيبي', primaryColor: '#8B4513', secondaryColor: '#2F4F4F', gradient: true, category: 'art' },
      { id: 'art-15', name: 'Renaissance', nameAr: 'عصر النهضة', primaryColor: '#8B0000', secondaryColor: '#FFD700', gradient: true, category: 'art' },
      { id: 'art-16', name: 'Gothic', nameAr: 'قوطي', primaryColor: '#1C1C1C', secondaryColor: '#8B0000', gradient: true, category: 'art' },
      { id: 'art-17', name: 'Modern Art', nameAr: 'فن حديث', primaryColor: '#FF6347', secondaryColor: '#00FA9A', gradient: true, category: 'art' },
      { id: 'art-18', name: 'Minimalist', nameAr: 'بساطة', primaryColor: '#FFFFFF', secondaryColor: '#F5F5F5', gradient: true, category: 'art' },
      { id: 'art-19', name: 'Street Art', nameAr: 'فن الشارع', primaryColor: '#FF1493', secondaryColor: '#00FF00', gradient: true, category: 'art' },
      { id: 'art-20', name: 'Digital Art', nameAr: 'فن رقمي', primaryColor: '#7B68EE', secondaryColor: '#00CED1', gradient: true, category: 'art' },
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
      { id: 'music-11', name: 'Country Brown', nameAr: 'بني كانتري', primaryColor: '#8B4513', secondaryColor: '#D2691E', gradient: true, category: 'music' },
      { id: 'music-12', name: 'Metal Silver', nameAr: 'فضي ميتال', primaryColor: '#C0C0C0', secondaryColor: '#4B0082', gradient: true, category: 'music' },
      { id: 'music-13', name: 'Soul Purple', nameAr: 'بنفسجي سول', primaryColor: '#800080', secondaryColor: '#DA70D6', gradient: true, category: 'music' },
      { id: 'music-14', name: 'Funk Orange', nameAr: 'برتقالي فانك', primaryColor: '#FF8C00', secondaryColor: '#FF4500', gradient: true, category: 'music' },
      { id: 'music-15', name: 'Techno Dark', nameAr: 'تكنو داكن', primaryColor: '#1C1C1C', secondaryColor: '#00BFFF', gradient: true, category: 'music' },
      { id: 'music-16', name: 'Opera Red', nameAr: 'أحمر أوبرا', primaryColor: '#8B0000', secondaryColor: '#DAA520', gradient: true, category: 'music' },
      { id: 'music-17', name: 'Acoustic Wood', nameAr: 'خشبي أكوستيك', primaryColor: '#DEB887', secondaryColor: '#8B4513', gradient: true, category: 'music' },
      { id: 'music-18', name: 'Synthwave', nameAr: 'سينث ويف', primaryColor: '#FF00FF', secondaryColor: '#00FFFF', gradient: true, category: 'music' },
      { id: 'music-19', name: 'Indie Yellow', nameAr: 'أصفر إندي', primaryColor: '#FFD700', secondaryColor: '#FFA500', gradient: true, category: 'music' },
      { id: 'music-20', name: 'Gospel White', nameAr: 'أبيض جوسبل', primaryColor: '#FFFAFA', secondaryColor: '#DAA520', gradient: true, category: 'music' },
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
      { id: 'events-11', name: 'Easter Pastel', nameAr: 'باستيل عيد الفصح', primaryColor: '#FFB6C1', secondaryColor: '#98FB98', gradient: true, category: 'events' },
      { id: 'events-12', name: 'Valentines Day', nameAr: 'عيد الحب', primaryColor: '#FF1493', secondaryColor: '#DC143C', gradient: true, category: 'events' },
      { id: 'events-13', name: 'Thanksgiving', nameAr: 'عيد الشكر', primaryColor: '#CD853F', secondaryColor: '#8B4513', gradient: true, category: 'events' },
      { id: 'events-14', name: 'Diwali', nameAr: 'ديوالي', primaryColor: '#FF8C00', secondaryColor: '#FFD700', gradient: true, category: 'events' },
      { id: 'events-15', name: 'Eid Mubarak', nameAr: 'عيد مبارك', primaryColor: '#006400', secondaryColor: '#FFD700', gradient: true, category: 'events' },
      { id: 'events-16', name: 'Baby Shower', nameAr: 'حفلة مولود', primaryColor: '#ADD8E6', secondaryColor: '#FFB6C1', gradient: true, category: 'events' },
      { id: 'events-17', name: 'Anniversary', nameAr: 'ذكرى سنوية', primaryColor: '#C0C0C0', secondaryColor: '#FFD700', gradient: true, category: 'events' },
      { id: 'events-18', name: 'Retirement', nameAr: 'تقاعد', primaryColor: '#4169E1', secondaryColor: '#FFD700', gradient: true, category: 'events' },
      { id: 'events-19', name: 'Housewarming', nameAr: 'منزل جديد', primaryColor: '#8B4513', secondaryColor: '#228B22', gradient: true, category: 'events' },
      { id: 'events-20', name: 'Engagement', nameAr: 'خطوبة', primaryColor: '#FFD700', secondaryColor: '#FF69B4', gradient: true, category: 'events' },
    ]
  },
  {
    id: 'gold',
    name: 'Gold ✨',
    nameAr: 'ذهبي ✨',
    icon: '✨',
    templates: [
      { id: 'gold-1', name: 'Pure Gold', nameAr: 'ذهب نقي', primaryColor: '#FFD700', pattern: 'classy', category: 'gold' },
      { id: 'gold-2', name: 'Shiny Gold', nameAr: 'ذهب لامع', primaryColor: '#F4D03F', secondaryColor: '#D4AF37', gradient: true, pattern: 'classy-rounded', category: 'gold' },
      { id: 'gold-3', name: 'Royal Gold', nameAr: 'ذهب ملكي', primaryColor: '#DAA520', secondaryColor: '#B8860B', gradient: true, pattern: 'extra-rounded', category: 'gold' },
      { id: 'gold-4', name: 'Antique Gold', nameAr: 'ذهب عتيق', primaryColor: '#CFB53B', pattern: 'rounded', category: 'gold' },
      { id: 'gold-5', name: 'Gold Rush', nameAr: 'حمى الذهب', primaryColor: '#FFD700', secondaryColor: '#FFA500', gradient: true, pattern: 'dots', category: 'gold' },
      { id: 'gold-6', name: 'Champagne Gold', nameAr: 'ذهب شامبانيا', primaryColor: '#F7E7CE', secondaryColor: '#D4AF37', gradient: true, pattern: 'classy', category: 'gold' },
      { id: 'gold-7', name: 'Rose Gold', nameAr: 'ذهب وردي', primaryColor: '#B76E79', secondaryColor: '#F4C2C2', gradient: true, pattern: 'extra-rounded', category: 'gold' },
      { id: 'gold-8', name: 'White Gold', nameAr: 'ذهب أبيض', primaryColor: '#E8E4C9', secondaryColor: '#D4AF37', gradient: true, pattern: 'classy-rounded', category: 'gold' },
      { id: 'gold-9', name: 'Dark Gold', nameAr: 'ذهب داكن', primaryColor: '#996515', secondaryColor: '#DAA520', gradient: true, pattern: 'squares', category: 'gold' },
      { id: 'gold-10', name: 'Gold Sparkle', nameAr: 'ذهب متلألئ', primaryColor: '#FFD700', secondaryColor: '#FFFACD', gradient: true, pattern: 'star', category: 'gold' },
      { id: 'gold-11', name: 'Sunset Gold', nameAr: 'ذهب غروب', primaryColor: '#FF8C00', secondaryColor: '#FFD700', gradient: true, pattern: 'diamond', category: 'gold' },
      { id: 'gold-12', name: 'Bronze Gold', nameAr: 'ذهب برونزي', primaryColor: '#CD7F32', secondaryColor: '#DAA520', gradient: true, pattern: 'rounded', category: 'gold' },
      { id: 'gold-13', name: 'Honey Gold', nameAr: 'ذهب عسلي', primaryColor: '#EB9605', secondaryColor: '#F4D03F', gradient: true, pattern: 'dots', category: 'gold' },
      { id: 'gold-14', name: 'Premium Gold', nameAr: 'ذهب بريميوم', primaryColor: '#C5B358', secondaryColor: '#8B7500', gradient: true, pattern: 'classy', category: 'gold' },
      { id: 'gold-15', name: 'Vintage Gold', nameAr: 'ذهب كلاسيكي', primaryColor: '#CFB53B', secondaryColor: '#996515', gradient: true, pattern: 'classy-rounded', category: 'gold' },
    ]
  },
  {
    id: '3d',
    name: '3D Artistic',
    nameAr: '3D فني',
    icon: '🎨',
    templates: [
      { id: '3d-1', name: 'Ocean Wave', nameAr: 'موجة المحيط', primaryColor: '#0077B6', secondaryColor: '#00B4D8', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-2', name: 'Jungle Art', nameAr: 'فن الغابة', primaryColor: '#2D6A4F', secondaryColor: '#74C69D', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-3', name: 'Galaxy Night', nameAr: 'ليل المجرة', primaryColor: '#240046', secondaryColor: '#7B2CBF', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-4', name: 'Sunset City', nameAr: 'غروب المدينة', primaryColor: '#FF6B35', secondaryColor: '#F7C59F', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-5', name: 'Snow Village', nameAr: 'قرية ثلجية', primaryColor: '#2C3E50', secondaryColor: '#BDC3C7', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-6', name: 'Cherry Blossom', nameAr: 'زهر الكرز', primaryColor: '#FFB6C1', secondaryColor: '#8B4513', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-7', name: 'Neon City', nameAr: 'مدينة نيون', primaryColor: '#FF00FF', secondaryColor: '#00FFFF', gradient: true, pattern: 'squares', category: '3d' },
      { id: '3d-8', name: 'Mountain Peak', nameAr: 'قمة الجبل', primaryColor: '#4A5568', secondaryColor: '#A0AEC0', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-9', name: 'Desert Oasis', nameAr: 'واحة الصحراء', primaryColor: '#C19A6B', secondaryColor: '#228B22', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-10', name: 'Aurora Lights', nameAr: 'أضواء الشفق', primaryColor: '#00FF7F', secondaryColor: '#8A2BE2', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-11', name: 'Tiger Art', nameAr: 'فن النمر', primaryColor: '#FF8C00', secondaryColor: '#000000', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-12', name: 'Temple Style', nameAr: 'طراز المعبد', primaryColor: '#8B0000', secondaryColor: '#DAA520', gradient: true, pattern: 'classy', category: '3d' },
      { id: '3d-13', name: 'Space Station', nameAr: 'محطة فضائية', primaryColor: '#1A1A2E', secondaryColor: '#00D4FF', gradient: true, pattern: 'squares', category: '3d' },
      { id: '3d-14', name: 'Garden Art', nameAr: 'فن الحديقة', primaryColor: '#228B22', secondaryColor: '#FFD700', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-15', name: 'Crystal Glass', nameAr: 'زجاج كريستال', primaryColor: '#E0FFFF', secondaryColor: '#87CEEB', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-16', name: 'Dragon Fire', nameAr: 'نار التنين', primaryColor: '#FF4500', secondaryColor: '#8B0000', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-17', name: 'Peacock Feather', nameAr: 'ريشة الطاووس', primaryColor: '#00CED1', secondaryColor: '#9400D3', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-18', name: 'Volcano Lava', nameAr: 'حمم البركان', primaryColor: '#B22222', secondaryColor: '#FF6347', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-19', name: 'Northern Lights', nameAr: 'الشفق القطبي', primaryColor: '#7FFFD4', secondaryColor: '#9932CC', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-20', name: 'Deep Ocean', nameAr: 'أعماق المحيط', primaryColor: '#000080', secondaryColor: '#00BFFF', gradient: true, pattern: 'classy', category: '3d' },
      { id: '3d-21', name: 'Rainbow Bridge', nameAr: 'جسر قوس قزح', primaryColor: '#FF1493', secondaryColor: '#00FF00', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-22', name: 'Steampunk', nameAr: 'ستيم بانك', primaryColor: '#8B4513', secondaryColor: '#D4AF37', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-23', name: 'Cosmic Nebula', nameAr: 'سديم كوني', primaryColor: '#4B0082', secondaryColor: '#FF69B4', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-24', name: 'Tropical Paradise', nameAr: 'جنة استوائية', primaryColor: '#00FA9A', secondaryColor: '#FF8C00', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-25', name: 'Midnight Dream', nameAr: 'حلم منتصف الليل', primaryColor: '#191970', secondaryColor: '#C0C0C0', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-26', name: 'Electric Storm', nameAr: 'عاصفة كهربائية', primaryColor: '#00FFFF', secondaryColor: '#FF00FF', gradient: true, pattern: 'squares', category: '3d' },
      { id: '3d-27', name: 'Ancient Scroll', nameAr: 'مخطوطة قديمة', primaryColor: '#DEB887', secondaryColor: '#8B4513', gradient: true, pattern: 'classy', category: '3d' },
      { id: '3d-28', name: 'Cyber Matrix', nameAr: 'مصفوفة سايبر', primaryColor: '#00FF00', secondaryColor: '#001100', gradient: true, pattern: 'squares', category: '3d' },
      { id: '3d-29', name: 'Royal Velvet', nameAr: 'مخمل ملكي', primaryColor: '#800080', secondaryColor: '#FFD700', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-30', name: 'Hologram', nameAr: 'هولوغرام', primaryColor: '#E6E6FA', secondaryColor: '#00CED1', gradient: true, pattern: 'extra-rounded', category: '3d' },
      // New 3D Templates (31-50)
      { id: '3d-31', name: 'Emerald City', nameAr: 'مدينة الزمرد', primaryColor: '#50C878', secondaryColor: '#2E8B57', gradient: true, pattern: 'classy', category: '3d' },
      { id: '3d-32', name: 'Phoenix Rise', nameAr: 'صعود العنقاء', primaryColor: '#FF4500', secondaryColor: '#FFD700', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-33', name: 'Ice Kingdom', nameAr: 'مملكة الجليد', primaryColor: '#B0E0E6', secondaryColor: '#4682B4', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-34', name: 'Mystic Forest', nameAr: 'غابة غامضة', primaryColor: '#006400', secondaryColor: '#9932CC', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-35', name: 'Solar Flare', nameAr: 'توهج شمسي', primaryColor: '#FFA500', secondaryColor: '#FF0000', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-36', name: 'Moonstone', nameAr: 'حجر القمر', primaryColor: '#C0C0C0', secondaryColor: '#4169E1', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-37', name: 'Butterfly Wings', nameAr: 'أجنحة الفراشة', primaryColor: '#FF69B4', secondaryColor: '#00CED1', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-38', name: 'Sandstorm', nameAr: 'عاصفة رملية', primaryColor: '#D2B48C', secondaryColor: '#8B4513', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-39', name: 'Crystal Cave', nameAr: 'كهف الكريستال', primaryColor: '#9370DB', secondaryColor: '#E6E6FA', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-40', name: 'Waterfall', nameAr: 'شلال', primaryColor: '#4169E1', secondaryColor: '#87CEEB', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-41', name: 'Golden Dragon', nameAr: 'التنين الذهبي', primaryColor: '#FFD700', secondaryColor: '#8B0000', gradient: true, pattern: 'classy', category: '3d' },
      { id: '3d-42', name: 'Coral Reef', nameAr: 'الحاجز المرجاني', primaryColor: '#FF7F50', secondaryColor: '#00CED1', gradient: true, pattern: 'dots', category: '3d' },
      { id: '3d-43', name: 'Lightning Strike', nameAr: 'صاعقة برق', primaryColor: '#FFD700', secondaryColor: '#4B0082', gradient: true, pattern: 'diamond', category: '3d' },
      { id: '3d-44', name: 'Cherry Wine', nameAr: 'نبيذ الكرز', primaryColor: '#722F37', secondaryColor: '#C41E3A', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-45', name: 'Neon Dreams', nameAr: 'أحلام نيون', primaryColor: '#FF1493', secondaryColor: '#00FF7F', gradient: true, pattern: 'squares', category: '3d' },
      { id: '3d-46', name: 'Ancient Egypt', nameAr: 'مصر القديمة', primaryColor: '#DAA520', secondaryColor: '#8B4513', gradient: true, pattern: 'classy', category: '3d' },
      { id: '3d-47', name: 'Sakura Night', nameAr: 'ليلة ساكورا', primaryColor: '#FFB7C5', secondaryColor: '#191970', gradient: true, pattern: 'extra-rounded', category: '3d' },
      { id: '3d-48', name: 'Jade Stone', nameAr: 'حجر اليشم', primaryColor: '#00A86B', secondaryColor: '#014421', gradient: true, pattern: 'classy-rounded', category: '3d' },
      { id: '3d-49', name: 'Supernova', nameAr: 'سوبرنوفا', primaryColor: '#FF6347', secondaryColor: '#4B0082', gradient: true, pattern: 'star', category: '3d' },
      { id: '3d-50', name: 'Digital Rain', nameAr: 'مطر رقمي', primaryColor: '#00FF00', secondaryColor: '#003300', gradient: true, pattern: 'squares', category: '3d' },
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
