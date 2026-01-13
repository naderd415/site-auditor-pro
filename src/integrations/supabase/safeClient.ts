import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let cached: SupabaseClient<Database> | null = null;
let loading: Promise<SupabaseClient<Database>> | null = null;

export function isBackendConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  );
}

/**
 * Lazily loads the backend client ONLY when env vars are present.
 * This prevents hard crashes like: "supabaseUrl is required".
 */
export async function getSupabaseClient(): Promise<SupabaseClient<Database>> {
  if (cached) return cached;

  if (!isBackendConfigured()) {
    throw new Error("Backend configuration is missing (URL / key).");
  }

  if (!loading) {
    loading = import("./client").then((m) => {
      cached = m.supabase;
      return cached;
    });
  }

  return loading;
}
