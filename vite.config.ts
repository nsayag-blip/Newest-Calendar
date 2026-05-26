import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.bundle.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/index.css";
          }
          return "assets/[name].[ext]";
        },
        format: "iife",
        name: "ReactApp",
      },
    },
  },
  server: {
    port: 3000,
    cors: true,
    host: true,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 3000,
    },
    watch: {
      // Use polling (necessary for some VM setups)
      usePolling: true,
      interval: 100,
    },
  },
});
