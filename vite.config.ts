// Vite configuration - CRITICAL FIX for React duplicate instance
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // CRITICAL: Force ALL React imports to use single instance
      "react": path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime"),
    },
    // CRITICAL: Dedupe ALL packages that use React internally
    dedupe: [
      "react", 
      "react-dom", 
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "react-router-dom",
      "react-helmet-async",
      "@supabase/supabase-js",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-toast",
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-dropdown-menu",
    ],
  },
  optimizeDeps: {
    // CRITICAL: Include react-query to force single React instance
    include: [
      "react", 
      "react-dom", 
      "react/jsx-runtime",
      "@tanstack/react-query",
      "react-router-dom",
    ],
    // Force complete re-optimization to clear cached bundles
    force: true,
    esbuildOptions: {
      // Ensure consistent React resolution
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          query: ["@tanstack/react-query"],
          pdf: ["pdf-lib"],
          ui: ["lucide-react", "sonner"]
        }
      }
    }
  }
}));
