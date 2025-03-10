import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Cargar las variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = env.VITE_API_URL; // Definir API_URL a partir del.env

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': env 
    },
    server: {
      proxy: {
        "/api": {
          target: API_URL, // URL del backend
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
