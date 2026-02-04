import { useState, useEffect, useCallback } from 'react';
import { 
  hashPassword, 
  isAdminSessionValid, 
  setAdminSession 
} from '@/lib/siteConfig';

/**
 * Admin Authentication Hook - Password Only Login
 * 
 * Security: The password is stored as a Base64-encoded string and decoded at runtime.
 * This provides obfuscation (not encryption) to prevent casual viewing.
 * 
 * For production environments, consider using:
 * - Environment variables
 * - Server-side authentication
 * - Supabase Auth
 */

// Base64 encoded admin password for obfuscation
// Decode: atob('TmEwMTAyNDkyNjIxMg==') = 'Na01024926212'
const ENCODED_ADMIN_PASSWORD = 'TmEwMTAyNDkyNjIxMg==';

// Decode the password at runtime
const getAdminPassword = (): string => {
  try {
    return atob(ENCODED_ADMIN_PASSWORD);
  } catch {
    return '';
  }
};

export interface SimpleAdminAuth {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useSimpleAdminAuth = (): SimpleAdminAuth => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    const valid = isAdminSessionValid();
    setIsLoggedIn(valid);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!password || password.length < 6) {
        return { success: false, error: 'كلمة المرور قصيرة جداً' };
      }

      // Hash both passwords
      const inputHash = await hashPassword(password);
      const correctHash = await hashPassword(getAdminPassword());
      
      // Constant-time comparison to prevent timing attacks
      if (inputHash.length !== correctHash.length) {
        return { success: false, error: 'كلمة المرور غير صحيحة' };
      }
      
      let match = true;
      for (let i = 0; i < inputHash.length; i++) {
        if (inputHash[i] !== correctHash[i]) {
          match = false;
        }
      }
      
      if (match) {
        setAdminSession(true);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, error: 'كلمة المرور غير صحيحة' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
    }
  }, []);

  const logout = useCallback(() => {
    setAdminSession(false);
    setIsLoggedIn(false);
  }, []);

  return {
    isLoggedIn,
    isLoading,
    login,
    logout
  };
};
