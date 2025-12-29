// Site Configuration System - Stores all editable content
export interface SiteIdentity {
  logoUrl: string;
  faviconUrl: string;
  siteName: string;
}

export interface AdsConfig {
  headerAdCode: string;
  sidebarAdCode: string;
  footerAdCode: string;
  inContentAdCode: string;
}

export interface AnalyticsConfig {
  googleId: string;
  localVisits: number;
  lastVisitDate: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  footerText: string;
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactDescription: string;
  privacyContent: string;
  termsContent: string;
}

export interface SiteConfig {
  adminPass: string;
  siteIdentity: SiteIdentity;
  ads: AdsConfig;
  analytics: AnalyticsConfig;
  globalSEO: SeoConfig;
  socialLinks: SocialLinks;
  content: SiteContent;
  theme: 'light' | 'dark' | 'system';
  language: 'ar' | 'en' | 'fr';
  christmasMode: boolean;
}

export const defaultConfig: SiteConfig = {
  adminPass: 'Na@01024926212',
  siteIdentity: {
    logoUrl: '',
    faviconUrl: '',
    siteName: 'BestToolsHub'
  },
  ads: {
    headerAdCode: '',
    sidebarAdCode: '',
    footerAdCode: '',
    inContentAdCode: ''
  },
  analytics: {
    googleId: '',
    localVisits: 0,
    lastVisitDate: new Date().toISOString()
  },
  globalSEO: {
    title: 'BestToolsHub - أفضل الأدوات المجانية',
    description: 'مجموعة شاملة من الأدوات المجانية لتحويل الصور، ملفات PDF، النصوص والمزيد - مجاني 100% بدون تسجيل',
    keywords: 'أدوات مجانية, محول صور, PDF, QR code, ألوان, أدوات اونلاين, بدون تسجيل'
  },
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: ''
  },
  content: {
    heroTitle: 'أدواتك المجانية في مكان واحد',
    heroSubtitle: 'مجموعة شاملة من الأدوات',
    heroDescription: 'تحويل الصور، ملفات PDF، أكواد QR، والمزيد - بدون تسجيل، سريع وآمن',
    footerText: '© 2025 BestToolsHub. جميع الحقوق محفوظة.',
    aboutTitle: 'من نحن',
    aboutDescription: 'نحن فريق متخصص في تطوير أدوات مجانية عالية الجودة',
    contactTitle: 'تواصل معنا',
    contactDescription: 'نحن هنا لمساعدتك',
    privacyContent: '',
    termsContent: ''
  },
  theme: 'dark',
  language: 'ar',
  christmasMode: false
};

const CONFIG_KEY = 'bth_site_config';
const STATS_KEY = 'bth_stats';

// Get current config from localStorage
export const getConfig = (): SiteConfig => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      return { ...defaultConfig, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error loading config:', e);
  }
  return defaultConfig;
};

// Save config to localStorage
export const saveConfig = (config: SiteConfig): void => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving config:', e);
  }
};

// Get visitor stats
export interface VisitorStats {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  pageViews: { [path: string]: number };
  lastUpdated: string;
  hourlyData: number[];
  dailyData: { date: string; visits: number }[];
  countries: { name: string; visits: number; flag: string }[];
  devices: { type: string; count: number }[];
  browsers: { name: string; count: number }[];
}

export const getStats = (): VisitorStats => {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading stats:', e);
  }
  
  // Initialize with default values
  const defaultStats: VisitorStats = {
    totalVisits: 0,
    todayVisits: 0,
    uniqueVisitors: 0,
    pageViews: {},
    lastUpdated: new Date().toISOString(),
    hourlyData: Array(24).fill(0),
    dailyData: [],
    countries: [],
    devices: [],
    browsers: []
  };
  
  localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
  return defaultStats;
};

// Track a page visit
export const trackVisit = (path: string): void => {
  try {
    const stats = getStats();
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hour = now.getHours();
    
    // Increment total visits
    stats.totalVisits += 1;
    
    // Check if it's a new day
    const lastDate = stats.lastUpdated.split('T')[0];
    if (lastDate !== today) {
      // Save yesterday's data
      if (stats.todayVisits > 0) {
        stats.dailyData.push({ date: lastDate, visits: stats.todayVisits });
        // Keep only last 30 days
        if (stats.dailyData.length > 30) {
          stats.dailyData.shift();
        }
      }
      stats.todayVisits = 0;
      stats.hourlyData = Array(24).fill(0);
    }
    
    stats.todayVisits += 1;
    stats.hourlyData[hour] = (stats.hourlyData[hour] || 0) + 1;
    
    // Track page views
    stats.pageViews[path] = (stats.pageViews[path] || 0) + 1;
    
    // Detect device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
    const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
    
    const deviceIndex = stats.devices.findIndex(d => d.type === deviceType);
    if (deviceIndex >= 0) {
      stats.devices[deviceIndex].count += 1;
    } else {
      stats.devices.push({ type: deviceType, count: 1 });
    }
    
    // Detect browser
    const userAgent = navigator.userAgent;
    let browser = 'Other';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    const browserIndex = stats.browsers.findIndex(b => b.name === browser);
    if (browserIndex >= 0) {
      stats.browsers[browserIndex].count += 1;
    } else {
      stats.browsers.push({ name: browser, count: 1 });
    }
    
    stats.lastUpdated = now.toISOString();
    
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error tracking visit:', e);
  }
};

// Check unique visitor
export const trackUniqueVisitor = (): boolean => {
  const visitorKey = 'bth_visitor_id';
  const stats = getStats();
  
  if (!localStorage.getItem(visitorKey)) {
    localStorage.setItem(visitorKey, `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    stats.uniqueVisitors += 1;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return true;
  }
  return false;
};

// Inject Google Analytics
export const injectGoogleAnalytics = (gaId: string): void => {
  if (!gaId || document.getElementById('ga-script')) return;
  
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
  
  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}');
  `;
  document.head.appendChild(inlineScript);
};

// Inject favicon dynamically
export const injectFavicon = (faviconUrl: string): void => {
  if (!faviconUrl) return;
  
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = faviconUrl;
};

// Export config as downloadable file
export const downloadConfig = (config: SiteConfig): void => {
  const configContent = `// BestToolsHub Site Configuration
// Generated: ${new Date().toISOString()}
// Do not edit manually - use Admin Dashboard

window.BTH_CONFIG = ${JSON.stringify(config, null, 2)};
`;
  
  const blob = new Blob([configContent], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
