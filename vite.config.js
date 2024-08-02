import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://live.devnimble.com',
        // target: 'https://live.devnimble.com/api/v1',
        // target: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
        // rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
});
