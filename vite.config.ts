import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: mode === 'production',
    sourcemap: mode === 'development',
  },
  define: {
    __DEV__: mode === 'development',
  },
}));
