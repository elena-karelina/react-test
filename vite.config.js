import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@style': path.resolve('./src/assets/styles/global.css'),
      '@requests': path.resolve('./src/shared/api/requests'),
      '@constants': path.resolve('./src/constants'),
      '@components': path.resolve('./src/components'),
    },
  },
});
