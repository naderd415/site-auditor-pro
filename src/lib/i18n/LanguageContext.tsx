// Language Context - Updated to ensure proper React hook usage
import * as React from 'react';
import { Language, Translation, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  toggleTheme: () => void;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && ['ar', 'en', 'fr'].includes(saved)) {
        return saved;
      }
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') return 'ar';
      if (browserLang === 'fr') return 'fr';
    }
    return 'ar';
  });

  const [isDark, setIsDarkState] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // Default to dark mode for Western audience preference
      return true;
    }
    return true;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setIsDark = (dark: boolean) => {
    setIsDarkState(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  React.useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir,
    isRTL: dir === 'rtl',
    isDark,
    setIsDark,
    toggleTheme,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
