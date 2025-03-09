import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // URL del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
