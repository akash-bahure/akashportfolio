import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches the actual directory name where Vercel expects outputs
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
