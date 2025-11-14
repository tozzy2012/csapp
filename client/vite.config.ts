import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <- processa o index.css com @import "tailwindcss"
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  optimizeDeps: {
    dedupe: ["react", "react-dom"],
    include: ["react", "react-dom", "wouter"],
  },
  server: {
    host: "0.0.0.0",
    port: 3003,
    strictPort: false,
  },
});
