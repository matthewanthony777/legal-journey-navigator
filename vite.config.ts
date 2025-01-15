import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx({
      jsxImportSource: "react",
      jsxRuntime: "automatic",
      providerImportSource: "@mdx-js/react",
      development: mode === "development",
    }),
    react({
      jsxImportSource: "react",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));