import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
/*
  "scripts": {
    "dev": "npm run dev:renderer & npm run dev:main",
    "dev:main": "npm run dev -w @notiq/main",
    "dev:renderer": "npm run dev -w @notiq/renderer",
    "build": "npm run build --workspaces",
    "start": "npm run start -w @notiq/main"
  }*/
