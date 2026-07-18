import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "static-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "index.html",
    },
  },
});
