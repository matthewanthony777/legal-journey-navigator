import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
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
      jsxRuntime: "automatic",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
}));