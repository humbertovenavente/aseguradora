import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    host: true,
    port: 3000,
    host: true,
  },
  build: {
    target: 'esnext',
  },
});
