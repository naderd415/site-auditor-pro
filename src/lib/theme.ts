// Theme management utilities

export type Theme = 'dark' | 'light' | 'system';

const THEME_KEY = 'besttoolshub-theme';

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
  } catch (e) {
    // localStorage not available
  }
  
  // Default to dark mode for Western audience preference
  return 'dark';
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // localStorage not available
  }
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
}

export function initializeTheme(): void {
  const theme = getStoredTheme();
  applyTheme(theme);
}

// Initialize theme on load - default to dark
if (typeof window !== 'undefined') {
  // Apply dark mode immediately before React hydration
  const stored = localStorage.getItem(THEME_KEY);
  if (!stored) {
    // First visit - set dark as default
    document.documentElement.classList.add('dark');
    try {
      localStorage.setItem(THEME_KEY, 'dark');
    } catch (e) {}
  } else if (stored === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (stored === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }
}
