import { useState, useEffect, useCallback } from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { getSupabaseClient, isBackendConfigured } from "@/integrations/supabase/safeClient";

// Error logging storage key
const ADMIN_ERROR_LOG_KEY = "bth_admin_error_log";

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

    const existingLogs = JSON.parse(
      localStorage.getItem(ADMIN_ERROR_LOG_KEY) || "[]"
    );

    const updatedLogs = [...existingLogs, logEntry].slice(-20);
    localStorage.setItem(ADMIN_ERROR_LOG_KEY, JSON.stringify(updatedLogs));

    console.error(`[AdminAuth:${context}]`, errorMessage, errorStack);
  } catch (e) {
    console.error(`[AdminAuth:${context}]`, error);
  }
}

export function getAdminErrorLogs():
  | Array<{ timestamp: string; context: string; message: string; stack?: string }>
  | [] {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_ERROR_LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearAdminErrorLogs(): void {
  try {
    localStorage.removeItem(ADMIN_ERROR_LOG_KEY);
  } catch {
    // ignore
  }
}

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  needsFirstAdmin: boolean;
  backendConfigured: boolean;
  backendError?: string;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
    needsFirstAdmin: false,
    backendConfigured: isBackendConfigured(),
    backendError: undefined,
  });

  const checkAdminRole = useCallback(
    async (supabase: SupabaseClient<Database>, userId: string): Promise<boolean> => {
      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: userId,
          _role: "admin",
        });
        if (error) {
          logAdminError("checkAdminRole", error);
          return false;
        }
        return data === true;
      } catch (err) {
        logAdminError("checkAdminRole:catch", err);
        return false;
      }
    },
    []
  );

  const checkAnyAdminExists = useCallback(
    async (supabase: SupabaseClient<Database>): Promise<boolean> => {
      try {
        const { data, error } = await supabase.rpc("any_admin_exists");
        if (error) {
          logAdminError("checkAnyAdminExists", error);
          return false;
        }
        return data === true;
      } catch (err) {
        logAdminError("checkAnyAdminExists:catch", err);
        return false;
      }
    },
    []
  );

  const claimFirstAdmin = useCallback(async (): Promise<boolean> => {
    try {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.rpc("claim_first_admin");
      if (error) {
        logAdminError("claimFirstAdmin", error);
        return false;
      }
      return data === true;
    } catch (err) {
      logAdminError("claimFirstAdmin:catch", err);
      return false;
    }
  }, []);

  const updateAuthState = useCallback(
    async (supabase: SupabaseClient<Database>, session: Session | null) => {
      try {
        if (!session?.user) {
          let adminExists = false;
          try {
            adminExists = await checkAnyAdminExists(supabase);
          } catch (e) {
            logAdminError("updateAuthState:noSession", e);
          }
          setState((prev) => ({
            ...prev,
            user: null,
            session: null,
            isAdmin: false,
            isLoading: false,
            needsFirstAdmin: !adminExists,
          }));
          return;
        }

        let isAdmin = false;
        let adminExists = false;

        try {
          isAdmin = await checkAdminRole(supabase, session.user.id);
          adminExists = await checkAnyAdminExists(supabase);
        } catch (e) {
          logAdminError("updateAuthState:checkRoles", e);
        }

        setState((prev) => ({
          ...prev,
          user: session.user,
          session,
          isAdmin,
          isLoading: false,
          needsFirstAdmin: !adminExists,
        }));
      } catch (e) {
        logAdminError("updateAuthState:catch", e);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [checkAdminRole, checkAnyAdminExists]
  );

  useEffect(() => {
    if (!isBackendConfigured()) {
      const msg = "Missing backend env vars (URL / key)";
      logAdminError("init:backend", new Error(msg));
      setState((prev) => ({
        ...prev,
        isLoading: false,
        backendConfigured: false,
        backendError: msg,
      }));
      return;
    }

    let cancelled = false;
    let unsubscribe = () => {};

    getSupabaseClient()
      .then((supabase) => {
        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          backendConfigured: true,
          backendError: undefined,
        }));

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setState((prev) => ({
            ...prev,
            user: session?.user ?? null,
            session: session ?? null,
          }));

          window.setTimeout(() => {
            updateAuthState(supabase, session);
          }, 0);
        });

        supabase.auth
          .getSession()
          .then(({ data: { session } }) => {
            updateAuthState(supabase, session);
          })
          .catch((e) => {
            logAdminError("init:getSession", e);
            setState((prev) => ({ ...prev, isLoading: false }));
          });

        unsubscribe = () => subscription.unsubscribe();
      })
      .catch((e) => {
        const msg = e instanceof Error ? e.message : String(e);
        logAdminError("init:getSupabaseClient", e);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          backendConfigured: false,
          backendError: msg,
        }));
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [updateAuthState]);

  const signUp = async (email: string, password: string) => {
    try {
      const supabase = await getSupabaseClient();
      const redirectUrl = `${window.location.origin}/admin`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      return { error };
    } catch (e) {
      logAdminError("signUp:init", e);
      return { error: e };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = await getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (e) {
      logAdminError("signIn:init", e);
      return { error: e };
    }
  };

  const signOut = async () => {
    try {
      const supabase = await getSupabaseClient();
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (e) {
      logAdminError("signOut:init", e);
      return { error: e };
    }
  };

  const refreshAdminStatus = useCallback(async () => {
    try {
      const supabase = await getSupabaseClient();
      if (state.session) {
        await updateAuthState(supabase, state.session);
      }
    } catch (e) {
      logAdminError("refreshAdminStatus", e);
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
