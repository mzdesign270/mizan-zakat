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
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'wouter', '@tanstack/react-query', 'lucide-react'],
          'ui-library': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            'zod',
            'react-hook-form',
            '@hookform/resolvers/zod'
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3000,
    host: true,
  },
});
