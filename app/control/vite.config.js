import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cuid from "cuid";

const CUID = cuid();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./",
  server: {
    port: 5175,
    strictPort: true,
  },
  publicDir: "public",
  build: {
    cssCodeSplit: false,
    sourcemap: "inline",
    manifest: true,
    minify: false,
    copyPublicDir: true,
    // rollupOptions: {
    //   output: {
    //     entryFileNames: `[name].js?v=${CUID}`,
    //     chunkFileNames: `[name].js?v=${CUID}`,
    //     assetFileNames: `[name].[ext]?v=${CUID}`,
    //     // entryFileNames: `[name].js`,
    //     // chunkFileNames: `[name].js`,
    //     // assetFileNames: `[name].[ext]`,
    //   },
    // },
  },
});
