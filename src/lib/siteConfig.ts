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
  adminPass: string; // Deprecated - kept for backwards compatibility
  adminPassHash?: string; // SHA-256 hash of password
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

const CONFIG_KEY = 'bth_site_config';
const STATS_KEY = 'bth_stats';

// Password hashing utility using Web Crypto API
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Verify password against stored hash
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};

// Check if password setup is required (no password hash stored)
export const isPasswordSetupRequired = (): boolean => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      const config = JSON.parse(stored);
      return !config.adminPassHash;
    }
  } catch (e) {
    // Config doesn't exist yet
  }
  return true;
};

export const defaultConfig: SiteConfig = {
  adminPass: '', // No default password - must be set by user
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

// Get current config from localStorage

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
    browsers: [],
  };

  // IMPORTANT: localStorage can throw (quota, privacy mode). Never crash the app.
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
  } catch (e) {
    console.error('Error initializing stats storage:', e);
  }

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

  try {
    const stats = getStats();

    if (!localStorage.getItem(visitorKey)) {
      localStorage.setItem(visitorKey, `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      stats.uniqueVisitors += 1;
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      return true;
    }

    return false;
  } catch (e) {
    console.error('Error tracking unique visitor:', e);
    return false;
  }
};
// Validate Google Analytics ID format
// Supports: G-XXXXXXXXXX (GA4), UA-XXXXXXXX-X (Universal Analytics), AW-XXXXXXXXXX (Ads), DC-XXXXXXXXXX (DoubleClick)
const GA_ID_REGEX = /^(G|UA|AW|DC)-[A-Z0-9-]+$/i;

export const isValidGAId = (gaId: string): boolean => {
  if (!gaId) return false;
  return GA_ID_REGEX.test(gaId.trim());
};

// Inject Google Analytics with validation to prevent XSS
export const injectGoogleAnalytics = (gaId: string): void => {
  if (!gaId || document.getElementById('ga-script')) return;
  
  // Validate GA ID format to prevent script injection
  const trimmedId = gaId.trim();
  if (!isValidGAId(trimmedId)) {
    console.error('[Security] Invalid Google Analytics ID format. Expected format: G-XXXXXXXXXX, UA-XXXXXXXX-X, AW-XXXXXXXXXX, or DC-XXXXXXXXXX');
    return;
  }
  
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(trimmedId)}`;
  document.head.appendChild(script);
  
  // Use textContent instead of innerHTML for the inline script configuration
  // The GA ID is validated above, so safe to use in template literal
  const inlineScript = document.createElement('script');
  inlineScript.id = 'ga-inline-script';
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${trimmedId}');
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
