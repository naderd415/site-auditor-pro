import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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
        console.error('Error checking admin role:', error);
        return false;
      }
      return data === true;
    } catch (err) {
      console.error('Error in checkAdminRole:', err);
      return false;
    }
  }, []);

  // Check if any admin exists
  const checkAnyAdminExists = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('any_admin_exists');
      if (error) {
        console.error('Error checking if admin exists:', error);
        return false;
      }
      return data === true;
    } catch (err) {
      console.error('Error in checkAnyAdminExists:', err);
      return false;
    }
  }, []);

  // Claim first admin role
  const claimFirstAdmin = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('claim_first_admin');
      if (error) {
        console.error('Error claiming first admin:', error);
        return false;
      }
      return data === true;
    } catch (err) {
      console.error('Error in claimFirstAdmin:', err);
      return false;
    }
  }, []);

  // Update auth state based on session
  const updateAuthState = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      // Check if we need first admin setup
      const adminExists = await checkAnyAdminExists();
      setState({
        user: null,
        session: null,
        isAdmin: false,
        isLoading: false,
        needsFirstAdmin: !adminExists,
      });
      return;
    }

    const isAdmin = await checkAdminRole(session.user.id);
    const adminExists = await checkAnyAdminExists();

    setState({
      user: session.user,
      session,
      isAdmin,
      isLoading: false,
      needsFirstAdmin: !adminExists,
    });
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
