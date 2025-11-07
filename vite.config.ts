import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemap({ hostname: "https://portfolio-hr-894.vercel.app" }) ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});