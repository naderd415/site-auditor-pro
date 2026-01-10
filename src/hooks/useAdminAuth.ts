import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Error logging storage key
const ADMIN_ERROR_LOG_KEY = 'bth_admin_error_log';

// Log admin errors to localStorage for debugging
export function logAdminError(context: string, error: unknown): void {
  try {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      context,
      message: errorMessage,
      stack: errorStack,
    };
    
    // Get existing logs
    const existingLogs = JSON.parse(localStorage.getItem(ADMIN_ERROR_LOG_KEY) || '[]');
    
    // Keep only last 20 entries
    const updatedLogs = [...existingLogs, logEntry].slice(-20);
    
    localStorage.setItem(ADMIN_ERROR_LOG_KEY, JSON.stringify(updatedLogs));
    
    console.error(`[AdminAuth:${context}]`, errorMessage, errorStack);
  } catch (e) {
    // Silently fail if localStorage is unavailable
    console.error(`[AdminAuth:${context}]`, error);
  }
}

// Get admin error logs for display
export function getAdminErrorLogs(): Array<{
  timestamp: string;
  context: string;
  message: string;
  stack?: string;
}> {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_ERROR_LOG_KEY) || '[]');
  } catch {
    return [];
  }
}

// Clear admin error logs
export function clearAdminErrorLogs(): void {
  try {
    localStorage.removeItem(ADMIN_ERROR_LOG_KEY);
  } catch {
    // Silently fail
  }
}

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  needsFirstAdmin: boolean;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
    needsFirstAdmin: false,
  });

  // Check if user has admin role
  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin',
      });
      if (error) {
        logAdminError('checkAdminRole', error);
        return false;
      }
      return data === true;
    } catch (err) {
      logAdminError('checkAdminRole:catch', err);
      return false;
    }
  }, []);

  // Check if any admin exists
  const checkAnyAdminExists = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('any_admin_exists');
      if (error) {
        logAdminError('checkAnyAdminExists', error);
        return false;
      }
      return data === true;
    } catch (err) {
      logAdminError('checkAnyAdminExists:catch', err);
      return false;
    }
  }, []);

  // Claim first admin role
  const claimFirstAdmin = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('claim_first_admin');
      if (error) {
        logAdminError('claimFirstAdmin', error);
        return false;
      }
      return data === true;
    } catch (err) {
      logAdminError('claimFirstAdmin:catch', err);
      return false;
    }
  }, []);

  // Update auth state based on session
  const updateAuthState = useCallback(async (session: Session | null) => {
    try {
      if (!session?.user) {
        // Check if we need first admin setup
        let adminExists = false;
        try {
          adminExists = await checkAnyAdminExists();
        } catch (e) {
          logAdminError('updateAuthState:noSession', e);
        }
        setState({
          user: null,
          session: null,
          isAdmin: false,
          isLoading: false,
          needsFirstAdmin: !adminExists,
        });
        return;
      }

      let isAdmin = false;
      let adminExists = false;
      
      try {
        isAdmin = await checkAdminRole(session.user.id);
        adminExists = await checkAnyAdminExists();
      } catch (e) {
        logAdminError('updateAuthState:checkRoles', e);
      }

      setState({
        user: session.user,
        session,
        isAdmin,
        isLoading: false,
        needsFirstAdmin: !adminExists,
      });
    } catch (e) {
      logAdminError('updateAuthState:catch', e);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [checkAdminRole, checkAnyAdminExists]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Only sync state updates here
        setState(prev => ({
          ...prev,
          user: session?.user ?? null,
          session: session ?? null,
        }));

        // Defer Supabase calls with setTimeout
        if (session) {
          setTimeout(() => {
            updateAuthState(session);
          }, 0);
        } else {
          setTimeout(() => {
            updateAuthState(null);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateAuthState(session);
    });

    return () => subscription.unsubscribe();
  }, [updateAuthState]);

  // Sign up with email/password
  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/admin`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { error };
  };

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  // Refresh admin status (call after claiming first admin)
  const refreshAdminStatus = useCallback(async () => {
    if (state.session) {
      await updateAuthState(state.session);
    }
  }, [state.session, updateAuthState]);

  return {
    ...state,
    signUp,
    signIn,
    signOut,
    claimFirstAdmin,
    refreshAdminStatus,
  };
}
