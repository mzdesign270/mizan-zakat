import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Force base path to be root for Cloudflare Pages
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Ensure the build is clean and compatible
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Simplify chunks to avoid loading issues
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
