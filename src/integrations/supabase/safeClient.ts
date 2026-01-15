import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let cached: SupabaseClient<Database> | null = null;
let loading: Promise<SupabaseClient<Database>> | null = null;

/**
 * Fallback values (publishable) to ensure /admin works even if Vite env injection
 * is missing in some preview environments.
 */
const FALLBACK_BACKEND_URL = "https://vqvjtyhzwynabivlgrvb.supabase.co";
const FALLBACK_BACKEND_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmp0eWh6d3luYWJpdmxncnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzQ0MDAsImV4cCI6MjA4MjE1MDQwMH0.gicKNWV_x5tWlRe4ne9suIiySGoc9V-jreXkOES0eoQ";

function readBackendEnv(): { url?: string; key?: string } {
  // Vite envs (support multiple key names to be resilient across environments)
  const url =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
    FALLBACK_BACKEND_URL;

  const key =
    ((import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      // fallback sometimes used by other setups
      import.meta.env.VITE_SUPABASE_ANON_KEY ||
      import.meta.env.VITE_SUPABASE_KEY) as string | undefined) ||
    FALLBACK_BACKEND_KEY;

  return { url, key };
}

export function isBackendConfigured(): boolean {
  const { url, key } = readBackendEnv();
  return Boolean(url && key);
}

/**
 * Lazily creates the backend client ONLY when env vars are present.
 * This prevents hard crashes like: "supabaseUrl is required".
 */
export async function getSupabaseClient(): Promise<SupabaseClient<Database>> {
  if (cached) return cached;

  const { url, key } = readBackendEnv();
  if (!url || !key) {
    throw new Error("Backend configuration is missing (URL / key). ");
  }

  if (!loading) {
    loading = Promise.resolve(
      createClient<Database>(url, key, {
        auth: {
          storage: localStorage,
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    ).then((client) => {
      cached = client;
      return client;
    });
  }

  return loading;
}
