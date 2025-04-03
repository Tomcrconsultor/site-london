import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { compression } from 'vite-plugin-compression2';

// Gera um timestamp para ser usado no nome dos arquivos
const timestamp = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression() // Compressão para melhor performance
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Adiciona timestamp aos nomes de arquivo para cache busting
        entryFileNames: `assets/[name]-${timestamp}.[hash].js`,
        chunkFileNames: `assets/[name]-${timestamp}.[hash].js`,
        assetFileNames: `assets/[name]-${timestamp}.[hash].[ext]`,
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Mantém console logs para debug
        drop_debugger: true
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    open: true,
    headers: {
      // Configura cabeçalhos para desativar cache durante desenvolvimento
      'Cache-Control': 'no-store'
    }
  },
  preview: {
    // Configura cabeçalhos para desativar cache em preview
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  base: '/'
});
