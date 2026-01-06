// QR Code Internal Templates - 130+ templates organized by categories

export type DotsType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type CornersType = 'square' | 'dot' | 'extra-rounded';

export interface InternalTemplate {
  id: number;
  cat: string;
  name: string;
  nameAr: string;
  color1: string;
  color2: string;
  bg: string;
  dots: DotsType;
  corner: CornersType;
  icon: string;
}

// القوالب الجاهزة - 130+ قالب
export const templates: InternalTemplate[] = [
  // Premium Gold (15) - قوالب ذهبية فاخرة
  { id: 1, cat: 'gold', name: 'Royal Gold', nameAr: 'ذهبي ملكي', color1: '#FFD700', color2: '#DAA520', bg: '#000000', dots: 'classy', corner: 'extra-rounded', icon: '👑' },
  { id: 2, cat: 'gold', name: 'Gold Shine', nameAr: 'ذهبي لامع', color1: '#F5C518', color2: '#D4AF37', bg: '#1a1a1a', dots: 'extra-rounded', corner: 'extra-rounded', icon: '✨' },
  { id: 3, cat: 'gold', name: 'Luxury Gold', nameAr: 'ذهبي فاخر', color1: '#E6BE8A', color2: '#C5A028', bg: '#0a0a0a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '💎' },
  { id: 4, cat: 'gold', name: 'Gold & Black', nameAr: 'ذهبي وأسود', color1: '#FFD700', color2: '#B8860B', bg: '#000000', dots: 'rounded', corner: 'extra-rounded', icon: '🖤' },
  { id: 5, cat: 'gold', name: 'Gold Gradient', nameAr: 'تدرج ذهبي', color1: '#FFE55C', color2: '#8B6914', bg: '#0f0f0f', dots: 'dots', corner: 'dot', icon: '🌟' },
  { id: 6, cat: 'gold', name: 'Premium Gold', nameAr: 'ذهبي متميز', color1: '#D4AF37', color2: '#AA8C2C', bg: '#1a0a00', dots: 'classy', corner: 'extra-rounded', icon: '🏆' },
  { id: 7, cat: 'gold', name: 'Gold Elegance', nameAr: 'ذهبي أنيق', color1: '#FFD700', color2: '#FFA500', bg: '#0d0d0d', dots: 'extra-rounded', corner: 'extra-rounded', icon: '💫' },
  { id: 8, cat: 'gold', name: 'Rose Gold', nameAr: 'ذهبي وردي', color1: '#B76E79', color2: '#E8A4B8', bg: '#1a1a1a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🌹' },
  { id: 9, cat: 'gold', name: 'Gold VIP', nameAr: 'ذهبي VIP', color1: '#FFD700', color2: '#CD853F', bg: '#000000', dots: 'square', corner: 'square', icon: '⭐' },
  { id: 10, cat: 'gold', name: 'Gold Crown', nameAr: 'تاج ذهبي', color1: '#F7DC6F', color2: '#B7950B', bg: '#0a0505', dots: 'classy', corner: 'extra-rounded', icon: '👸' },
  { id: 11, cat: 'gold', name: 'Gold Wave', nameAr: 'موجة ذهبية', color1: '#FFD700', color2: '#8B7355', bg: '#0f0a05', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🌊' },
  { id: 12, cat: 'gold', name: 'Champagne Gold', nameAr: 'ذهبي شمبانيا', color1: '#F7E7CE', color2: '#D4AF37', bg: '#1a1510', dots: 'rounded', corner: 'extra-rounded', icon: '🥂' },
  { id: 13, cat: 'gold', name: 'Gold & White', nameAr: 'ذهبي وأبيض', color1: '#FFD700', color2: '#DAA520', bg: '#FFFFFF', dots: 'classy', corner: 'extra-rounded', icon: '🤍' },
  { id: 14, cat: 'gold', name: 'Antique Gold', nameAr: 'ذهبي عتيق', color1: '#CFB53B', color2: '#8B6914', bg: '#1a1510', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🏺' },
  { id: 15, cat: 'gold', name: 'Gold Diamond', nameAr: 'ذهبي ماسي', color1: '#FFD700', color2: '#E6E6FA', bg: '#000000', dots: 'dots', corner: 'dot', icon: '💠' },

  // 3D Artistic Templates (30) - قوالب ثلاثية الأبعاد
  { id: 101, cat: '3d', name: '3D Chrome', nameAr: '3D كروم', color1: '#C0C0C0', color2: '#808080', bg: '#1a1a1a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🔮' },
  { id: 102, cat: '3d', name: '3D Gold Metallic', nameAr: '3D ذهبي معدني', color1: '#FFD700', color2: '#B8860B', bg: '#0a0505', dots: 'classy', corner: 'extra-rounded', icon: '🥇' },
  { id: 103, cat: '3d', name: '3D Crystal Blue', nameAr: '3D كريستال أزرق', color1: '#00BFFF', color2: '#1E90FF', bg: '#0a1929', dots: 'extra-rounded', corner: 'extra-rounded', icon: '💎' },
  { id: 104, cat: '3d', name: '3D Hologram', nameAr: '3D هولوجرام', color1: '#FF00FF', color2: '#00FFFF', bg: '#0f0f0f', dots: 'dots', corner: 'dot', icon: '🌈' },
  { id: 105, cat: '3d', name: '3D Emerald', nameAr: '3D زمردي', color1: '#50C878', color2: '#00A86B', bg: '#0a1a0a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '💚' },
  { id: 106, cat: '3d', name: '3D Ruby', nameAr: '3D ياقوتي', color1: '#E0115F', color2: '#9B111E', bg: '#1a0a0a', dots: 'classy', corner: 'extra-rounded', icon: '❤️' },
  { id: 107, cat: '3d', name: '3D Sapphire', nameAr: '3D ياقوت أزرق', color1: '#0F52BA', color2: '#082567', bg: '#0a0a1a', dots: 'extra-rounded', corner: 'extra-rounded', icon: '💙' },
  { id: 108, cat: '3d', name: '3D Amethyst', nameAr: '3D جمشت', color1: '#9966CC', color2: '#7851A9', bg: '#0f0a1a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '💜' },
  { id: 109, cat: '3d', name: '3D Neon Glow', nameAr: '3D نيون متوهج', color1: '#39FF14', color2: '#00FF00', bg: '#000000', dots: 'dots', corner: 'dot', icon: '✨' },
  { id: 110, cat: '3d', name: '3D Copper', nameAr: '3D نحاسي', color1: '#B87333', color2: '#8B4513', bg: '#1a1510', dots: 'classy', corner: 'extra-rounded', icon: '🟤' },
  { id: 111, cat: '3d', name: '3D Platinum', nameAr: '3D بلاتيني', color1: '#E5E4E2', color2: '#A8A9AD', bg: '#1a1a1a', dots: 'rounded', corner: 'extra-rounded', icon: '⚪' },
  { id: 112, cat: '3d', name: '3D Bronze', nameAr: '3D برونزي', color1: '#CD7F32', color2: '#8B4513', bg: '#0a0805', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🥉' },
  { id: 113, cat: '3d', name: '3D Diamond', nameAr: '3D ماسي', color1: '#B9F2FF', color2: '#89CFF0', bg: '#0a0a0a', dots: 'dots', corner: 'dot', icon: '💠' },
  { id: 114, cat: '3d', name: '3D Pearl', nameAr: '3D لؤلؤي', color1: '#FDEEF4', color2: '#EAE0C8', bg: '#1a1a1a', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🔵' },
  { id: 115, cat: '3d', name: '3D Obsidian', nameAr: '3D أوبسيديان', color1: '#3D3D3D', color2: '#1a1a1a', bg: '#ffffff', dots: 'square', corner: 'square', icon: '⬛' },
  { id: 116, cat: '3d', name: '3D Rose Quartz', nameAr: '3D كوارتز وردي', color1: '#F7CAC9', color2: '#E8A0A0', bg: '#1a0a0a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🌸' },
  { id: 117, cat: '3d', name: '3D Topaz', nameAr: '3D توباز', color1: '#FFC87C', color2: '#FF9966', bg: '#0a0805', dots: 'classy', corner: 'extra-rounded', icon: '🟡' },
  { id: 118, cat: '3d', name: '3D Turquoise', nameAr: '3D فيروزي', color1: '#40E0D0', color2: '#00CED1', bg: '#0a1a1a', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🩵' },
  { id: 119, cat: '3d', name: '3D Onyx', nameAr: '3D أونيكس', color1: '#353935', color2: '#0a0a0a', bg: '#E0E0E0', dots: 'square', corner: 'square', icon: '🖤' },
  { id: 120, cat: '3d', name: '3D Opal', nameAr: '3D أوبال', color1: '#A8C3BC', color2: '#D4E4ED', bg: '#0f0f0f', dots: 'dots', corner: 'dot', icon: '🪨' },
  { id: 121, cat: '3d', name: '3D Titanium', nameAr: '3D تيتانيوم', color1: '#878681', color2: '#545454', bg: '#0a0a0a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🛡️' },
  { id: 122, cat: '3d', name: '3D Lava', nameAr: '3D حمم بركانية', color1: '#CF1020', color2: '#FF4500', bg: '#0a0505', dots: 'classy', corner: 'extra-rounded', icon: '🌋' },
  { id: 123, cat: '3d', name: '3D Ice', nameAr: '3D جليدي', color1: '#A5F2F3', color2: '#70D6FF', bg: '#0a1a2a', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🧊' },
  { id: 124, cat: '3d', name: '3D Sunset Glow', nameAr: '3D توهج الغروب', color1: '#FF6B6B', color2: '#FFE66D', bg: '#1a0a1a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🌇' },
  { id: 125, cat: '3d', name: '3D Aurora', nameAr: '3D شفق قطبي', color1: '#4FFFB0', color2: '#7B68EE', bg: '#0a0a1a', dots: 'dots', corner: 'dot', icon: '🌌' },
  { id: 126, cat: '3d', name: '3D Midnight', nameAr: '3D منتصف الليل', color1: '#191970', color2: '#000080', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '🌃' },
  { id: 127, cat: '3d', name: '3D Sunrise', nameAr: '3D شروق', color1: '#FF7F50', color2: '#FFD700', bg: '#0a0508', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🌅' },
  { id: 128, cat: '3d', name: '3D Ocean Deep', nameAr: '3D عمق المحيط', color1: '#006994', color2: '#00008B', bg: '#0a0a1a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '🌊' },
  { id: 129, cat: '3d', name: '3D Forest Mist', nameAr: '3D ضباب الغابة', color1: '#228B22', color2: '#355E3B', bg: '#0a1a0a', dots: 'rounded', corner: 'extra-rounded', icon: '🌲' },
  { id: 130, cat: '3d', name: '3D Cyber Pink', nameAr: '3D سايبر وردي', color1: '#FF1493', color2: '#FF69B4', bg: '#0a0a0a', dots: 'dots', corner: 'dot', icon: '🩷' },

  // Social Media (15)
  { id: 16, cat: 'social', name: 'Facebook', nameAr: 'فيسبوك', color1: '#1877F2', color2: '#1877F2', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '📘' },
  { id: 17, cat: 'social', name: 'Instagram', nameAr: 'انستغرام', color1: '#833AB4', color2: '#FD1D1D', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '📸' },
  { id: 18, cat: 'social', name: 'Twitter/X', nameAr: 'تويتر', color1: '#000000', color2: '#1DA1F2', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '🐦' },
  { id: 19, cat: 'social', name: 'WhatsApp', nameAr: 'واتساب', color1: '#25D366', color2: '#128C7E', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '💬' },
  { id: 20, cat: 'social', name: 'TikTok', nameAr: 'تيك توك', color1: '#000000', color2: '#EE1D52', bg: '#ffffff', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🎵' },
  { id: 21, cat: 'social', name: 'YouTube', nameAr: 'يوتيوب', color1: '#FF0000', color2: '#CC0000', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '▶️' },
  { id: 22, cat: 'social', name: 'LinkedIn', nameAr: 'لينكدإن', color1: '#0077B5', color2: '#0A66C2', bg: '#ffffff', dots: 'square', corner: 'square', icon: '💼' },
  { id: 23, cat: 'social', name: 'Snapchat', nameAr: 'سناب شات', color1: '#FFFC00', color2: '#000000', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '👻' },
  { id: 24, cat: 'social', name: 'Telegram', nameAr: 'تيليجرام', color1: '#0088CC', color2: '#26A5E4', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '✈️' },
  { id: 25, cat: 'social', name: 'Pinterest', nameAr: 'بنترست', color1: '#E60023', color2: '#BD081C', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '📌' },
  { id: 26, cat: 'social', name: 'Discord', nameAr: 'ديسكورد', color1: '#5865F2', color2: '#7289DA', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🎮' },
  { id: 27, cat: 'social', name: 'Reddit', nameAr: 'ريديت', color1: '#FF4500', color2: '#FF5700', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '🤖' },
  { id: 28, cat: 'social', name: 'Spotify', nameAr: 'سبوتيفاي', color1: '#1DB954', color2: '#191414', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🎧' },
  { id: 29, cat: 'social', name: 'Twitch', nameAr: 'تويتش', color1: '#9146FF', color2: '#6441A5', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '📺' },
  { id: 30, cat: 'social', name: 'Threads', nameAr: 'ثريدز', color1: '#000000', color2: '#333333', bg: '#ffffff', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🧵' },

  // Business (12)
  { id: 31, cat: 'business', name: 'Corporate', nameAr: 'شركات', color1: '#2c3e50', color2: '#34495e', bg: '#ecf0f1', dots: 'square', corner: 'square', icon: '🏢' },
  { id: 32, cat: 'business', name: 'Minimal', nameAr: 'بسيط', color1: '#000000', color2: '#333333', bg: '#ffffff', dots: 'square', corner: 'square', icon: '⬛' },
  { id: 33, cat: 'business', name: 'Silver Elite', nameAr: 'فضي راقي', color1: '#C0C0C0', color2: '#A9A9A9', bg: '#1a1a1a', dots: 'classy-rounded', corner: 'extra-rounded', icon: '💎' },
  { id: 34, cat: 'business', name: 'Navy Pro', nameAr: 'كحلي محترف', color1: '#001f3f', color2: '#003366', bg: '#ffffff', dots: 'square', corner: 'square', icon: '🔷' },
  { id: 35, cat: 'business', name: 'Green Finance', nameAr: 'مالي أخضر', color1: '#006400', color2: '#228B22', bg: '#f0fff0', dots: 'rounded', corner: 'extra-rounded', icon: '💵' },
  { id: 36, cat: 'business', name: 'Platinum', nameAr: 'بلاتيني', color1: '#E5E4E2', color2: '#BCC6CC', bg: '#1a1a1a', dots: 'rounded', corner: 'extra-rounded', icon: '💠' },
  { id: 37, cat: 'business', name: 'Law Firm', nameAr: 'محاماة', color1: '#4A0E0E', color2: '#8B0000', bg: '#F5F5DC', dots: 'square', corner: 'square', icon: '⚖️' },
  { id: 38, cat: 'business', name: 'Medical', nameAr: 'طبي', color1: '#0077B6', color2: '#00B4D8', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🏥' },
  { id: 39, cat: 'business', name: 'Real Estate', nameAr: 'عقارات', color1: '#2E4057', color2: '#048A81', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '🏠' },
  { id: 40, cat: 'business', name: 'Consulting', nameAr: 'استشارات', color1: '#3D405B', color2: '#81B29A', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '💡' },
  { id: 41, cat: 'business', name: 'Fashion', nameAr: 'أزياء', color1: '#000000', color2: '#D4AF37', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '👗' },
  { id: 42, cat: 'business', name: 'Education', nameAr: 'تعليم', color1: '#1E3A5F', color2: '#4A90D9', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🎓' },

  // Love & Romance (10)
  { id: 43, cat: 'love', name: 'Love', nameAr: 'حب', color1: '#e91e63', color2: '#ff4081', bg: '#ffebee', dots: 'dots', corner: 'dot', icon: '❤️' },
  { id: 44, cat: 'love', name: 'Romantic Night', nameAr: 'ليلة رومانسية', color1: '#ff6b81', color2: '#ff4757', bg: '#fff0f5', dots: 'rounded', corner: 'extra-rounded', icon: '💕' },
  { id: 45, cat: 'love', name: 'Valentine', nameAr: 'عيد الحب', color1: '#c0392b', color2: '#e74c3c', bg: '#ffffff', dots: 'extra-rounded', corner: 'extra-rounded', icon: '💝' },
  { id: 46, cat: 'love', name: 'Wedding', nameAr: 'زفاف', color1: '#FFD700', color2: '#DAA520', bg: '#fffaf0', dots: 'classy', corner: 'extra-rounded', icon: '💒' },
  { id: 47, cat: 'love', name: 'Pink Dream', nameAr: 'حلم وردي', color1: '#FF69B4', color2: '#FF1493', bg: '#FFF0F5', dots: 'dots', corner: 'dot', icon: '🌸' },
  { id: 48, cat: 'love', name: 'Anniversary', nameAr: 'ذكرى سنوية', color1: '#8B0000', color2: '#DC143C', bg: '#FFF5F5', dots: 'classy', corner: 'extra-rounded', icon: '💐' },
  { id: 49, cat: 'love', name: 'Engagement', nameAr: 'خطوبة', color1: '#FFD700', color2: '#FFA500', bg: '#FFFACD', dots: 'dots', corner: 'dot', icon: '💍' },
  { id: 50, cat: 'love', name: 'Rose', nameAr: 'ورد', color1: '#FF6B6B', color2: '#EE5A5A', bg: '#FFF0F0', dots: 'dots', corner: 'dot', icon: '🌹' },
  { id: 51, cat: 'love', name: 'Heart Glow', nameAr: 'قلب متوهج', color1: '#FF1493', color2: '#FF69B4', bg: '#000000', dots: 'extra-rounded', corner: 'extra-rounded', icon: '💖' },
  { id: 52, cat: 'love', name: 'Lavender Love', nameAr: 'حب اللافندر', color1: '#9B59B6', color2: '#E8DAEF', bg: '#F5EEF8', dots: 'rounded', corner: 'extra-rounded', icon: '💜' },

  // Food & Restaurant (10)
  { id: 53, cat: 'food', name: 'Restaurant', nameAr: 'مطعم', color1: '#e67e22', color2: '#d35400', bg: '#fff3e0', dots: 'rounded', corner: 'extra-rounded', icon: '🍽️' },
  { id: 54, cat: 'food', name: 'Coffee Shop', nameAr: 'كافيه', color1: '#6f4e37', color2: '#8B4513', bg: '#FFF8DC', dots: 'classy', corner: 'extra-rounded', icon: '☕' },
  { id: 55, cat: 'food', name: 'Pizza', nameAr: 'بيتزا', color1: '#ff6b35', color2: '#f7c815', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🍕' },
  { id: 56, cat: 'food', name: 'Sushi', nameAr: 'سوشي', color1: '#FF6347', color2: '#2E8B57', bg: '#f5f5f5', dots: 'dots', corner: 'dot', icon: '🍣' },
  { id: 57, cat: 'food', name: 'Bakery', nameAr: 'مخبز', color1: '#DEB887', color2: '#D2691E', bg: '#FFF5EE', dots: 'rounded', corner: 'extra-rounded', icon: '🥐' },
  { id: 58, cat: 'food', name: 'Ice Cream', nameAr: 'آيس كريم', color1: '#FFB6C1', color2: '#87CEEB', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '🍦' },
  { id: 59, cat: 'food', name: 'Burger', nameAr: 'برجر', color1: '#FF4500', color2: '#FFD700', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🍔' },
  { id: 60, cat: 'food', name: 'Vegan', nameAr: 'نباتي', color1: '#228B22', color2: '#90EE90', bg: '#F0FFF0', dots: 'dots', corner: 'dot', icon: '🥗' },
  { id: 61, cat: 'food', name: 'BBQ', nameAr: 'شواء', color1: '#8B4513', color2: '#CD853F', bg: '#FFF8DC', dots: 'classy', corner: 'extra-rounded', icon: '🍖' },
  { id: 62, cat: 'food', name: 'Seafood', nameAr: 'مأكولات بحرية', color1: '#006994', color2: '#40E0D0', bg: '#E0FFFF', dots: 'dots', corner: 'dot', icon: '🦐' },

  // Sports (10)
  { id: 63, cat: 'sport', name: 'Gym', nameAr: 'جيم', color1: '#00b894', color2: '#00cec9', bg: '#e0f7fa', dots: 'rounded', corner: 'extra-rounded', icon: '💪' },
  { id: 64, cat: 'sport', name: 'Football', nameAr: 'كرة قدم', color1: '#0984e3', color2: '#6c5ce7', bg: '#e3f2fd', dots: 'dots', corner: 'dot', icon: '⚽' },
  { id: 65, cat: 'sport', name: 'Basketball', nameAr: 'كرة سلة', color1: '#ff6b00', color2: '#ff8c00', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '🏀' },
  { id: 66, cat: 'sport', name: 'Tennis', nameAr: 'تنس', color1: '#ADFF2F', color2: '#32CD32', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🎾' },
  { id: 67, cat: 'sport', name: 'Swimming', nameAr: 'سباحة', color1: '#00BFFF', color2: '#1E90FF', bg: '#E0FFFF', dots: 'dots', corner: 'dot', icon: '🏊' },
  { id: 68, cat: 'sport', name: 'Golf', nameAr: 'جولف', color1: '#228B22', color2: '#006400', bg: '#F0FFF0', dots: 'classy', corner: 'extra-rounded', icon: '⛳' },
  { id: 69, cat: 'sport', name: 'Boxing', nameAr: 'ملاكمة', color1: '#8B0000', color2: '#DC143C', bg: '#1a1a1a', dots: 'square', corner: 'square', icon: '🥊' },
  { id: 70, cat: 'sport', name: 'Cycling', nameAr: 'دراجات', color1: '#FF6347', color2: '#FFD700', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🚴' },
  { id: 71, cat: 'sport', name: 'Yoga', nameAr: 'يوغا', color1: '#9370DB', color2: '#E6E6FA', bg: '#F8F8FF', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🧘' },
  { id: 72, cat: 'sport', name: 'Skiing', nameAr: 'تزلج', color1: '#87CEEB', color2: '#00BFFF', bg: '#F0F8FF', dots: 'rounded', corner: 'extra-rounded', icon: '⛷️' },

  // Tech (10)
  { id: 73, cat: 'tech', name: 'Cyber', nameAr: 'سايبر', color1: '#00d2ff', color2: '#3a7bd5', bg: '#000000', dots: 'square', corner: 'square', icon: '🔌' },
  { id: 74, cat: 'tech', name: 'Matrix', nameAr: 'ماتريكس', color1: '#00ff00', color2: '#008800', bg: '#000000', dots: 'square', corner: 'square', icon: '💻' },
  { id: 75, cat: 'tech', name: 'AI Bot', nameAr: 'ذكاء اصطناعي', color1: '#8B5CF6', color2: '#A855F7', bg: '#0f0f0f', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🤖' },
  { id: 76, cat: 'tech', name: 'Startup', nameAr: 'ستارت أب', color1: '#667eea', color2: '#764ba2', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🚀' },
  { id: 77, cat: 'tech', name: 'Gaming', nameAr: 'ألعاب', color1: '#9146FF', color2: '#6441A4', bg: '#18181b', dots: 'classy', corner: 'extra-rounded', icon: '🎮' },
  { id: 78, cat: 'tech', name: 'Developer', nameAr: 'مطور', color1: '#61DAFB', color2: '#282C34', bg: '#20232A', dots: 'rounded', corner: 'extra-rounded', icon: '👨‍💻' },
  { id: 79, cat: 'tech', name: 'Cloud', nameAr: 'سحابة', color1: '#0078D4', color2: '#00BCF2', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '☁️' },
  { id: 80, cat: 'tech', name: 'Security', nameAr: 'أمان', color1: '#00C853', color2: '#B2FF59', bg: '#1a1a1a', dots: 'square', corner: 'square', icon: '🔐' },
  { id: 81, cat: 'tech', name: 'Blockchain', nameAr: 'بلوكشين', color1: '#F7931A', color2: '#4A4A4A', bg: '#ffffff', dots: 'classy', corner: 'extra-rounded', icon: '⛓️' },
  { id: 82, cat: 'tech', name: 'VR/AR', nameAr: 'واقع افتراضي', color1: '#FF3CAC', color2: '#784BA0', bg: '#0f0f0f', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🥽' },

  // Fun & Creative (10)
  { id: 83, cat: 'fun', name: 'Neon', nameAr: 'نيون', color1: '#00ff00', color2: '#ccff00', bg: '#000000', dots: 'square', corner: 'square', icon: '⚡' },
  { id: 84, cat: 'fun', name: 'Rainbow', nameAr: 'قوس قزح', color1: '#ff0000', color2: '#0000ff', bg: '#ffffff', dots: 'dots', corner: 'dot', icon: '🌈' },
  { id: 85, cat: 'fun', name: 'Party', nameAr: 'حفلة', color1: '#FF00FF', color2: '#00FFFF', bg: '#1a1a2e', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🎉' },
  { id: 86, cat: 'fun', name: 'Summer', nameAr: 'صيف', color1: '#FFD700', color2: '#FF4500', bg: '#87CEEB', dots: 'dots', corner: 'dot', icon: '☀️' },
  { id: 87, cat: 'fun', name: 'Halloween', nameAr: 'هالوين', color1: '#FF6600', color2: '#000000', bg: '#1a1a1a', dots: 'classy', corner: 'extra-rounded', icon: '🎃' },
  { id: 88, cat: 'fun', name: 'Christmas', nameAr: 'كريسماس', color1: '#228B22', color2: '#DC143C', bg: '#FFFAFA', dots: 'rounded', corner: 'extra-rounded', icon: '🎄' },
  { id: 89, cat: 'fun', name: 'Birthday', nameAr: 'عيد ميلاد', color1: '#FF69B4', color2: '#FFD700', bg: '#FFF0F5', dots: 'dots', corner: 'dot', icon: '🎂' },
  { id: 90, cat: 'fun', name: 'Music', nameAr: 'موسيقى', color1: '#1DB954', color2: '#191414', bg: '#ffffff', dots: 'rounded', corner: 'extra-rounded', icon: '🎶' },
  { id: 91, cat: 'fun', name: 'Art', nameAr: 'فن', color1: '#FF6B6B', color2: '#4ECDC4', bg: '#ffffff', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🎨' },
  { id: 92, cat: 'fun', name: 'Unicorn', nameAr: 'يونيكورن', color1: '#FF69B4', color2: '#00CED1', bg: '#FFF0F5', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🦄' },

  // Nature & Travel (8)
  { id: 93, cat: 'nature', name: 'Ocean', nameAr: 'محيط', color1: '#006994', color2: '#40E0D0', bg: '#E0FFFF', dots: 'dots', corner: 'dot', icon: '🌊' },
  { id: 94, cat: 'nature', name: 'Forest', nameAr: 'غابة', color1: '#228B22', color2: '#006400', bg: '#F0FFF0', dots: 'rounded', corner: 'extra-rounded', icon: '🌲' },
  { id: 95, cat: 'nature', name: 'Sunset', nameAr: 'غروب', color1: '#FF4500', color2: '#FF6347', bg: '#FFE4B5', dots: 'extra-rounded', corner: 'extra-rounded', icon: '🌅' },
  { id: 96, cat: 'nature', name: 'Mountain', nameAr: 'جبل', color1: '#708090', color2: '#2F4F4F', bg: '#F5F5F5', dots: 'square', corner: 'square', icon: '🏔️' },
  { id: 97, cat: 'nature', name: 'Desert', nameAr: 'صحراء', color1: '#EDC9AF', color2: '#C19A6B', bg: '#FAEBD7', dots: 'classy', corner: 'extra-rounded', icon: '🏜️' },
  { id: 98, cat: 'nature', name: 'Galaxy', nameAr: 'مجرة', color1: '#4B0082', color2: '#9400D3', bg: '#0a0a0a', dots: 'dots', corner: 'dot', icon: '🌌' },
  { id: 99, cat: 'nature', name: 'Beach', nameAr: 'شاطئ', color1: '#FFD700', color2: '#00CED1', bg: '#FFF8DC', dots: 'dots', corner: 'dot', icon: '🏖️' },
  { id: 100, cat: 'nature', name: 'Autumn', nameAr: 'خريف', color1: '#FF8C00', color2: '#8B4513', bg: '#FFF8DC', dots: 'classy', corner: 'extra-rounded', icon: '🍂' },
];

// الفئات
export const categories = [
  { id: 'all', name: 'All', nameAr: 'الكل' },
  { id: 'gold', name: 'Gold ✨', nameAr: 'ذهبي ✨' },
  { id: '3d', name: '3D 🔮', nameAr: '3D 🔮' },
  { id: 'social', name: 'Social', nameAr: 'سوشيال' },
  { id: 'business', name: 'Business', nameAr: 'أعمال' },
  { id: 'love', name: 'Love', nameAr: 'حب' },
  { id: 'food', name: 'Food', nameAr: 'طعام' },
  { id: 'sport', name: 'Sport', nameAr: 'رياضة' },
  { id: 'tech', name: 'Tech', nameAr: 'تقنية' },
  { id: 'fun', name: 'Fun', nameAr: 'ترفيه' },
  { id: 'nature', name: 'Nature', nameAr: 'طبيعة' },
];
