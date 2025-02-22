import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 80
      },
      jpeg: {
        quality: 80
      },
      png: {
        quality: 80
      },
      webp: {
        quality: 80
      }
    }),
    compression()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@/components/ui']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
