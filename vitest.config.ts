import path from 'path';

import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, 'public'),
    },
    coverage: {
      include: ['src/**/*.{js,ts,tsx}'],
      exclude: [
        ...configDefaults.exclude,
        '.eslintrc.cjs',
        'next.config.mjs',
        'next-env.d.ts',
        '**/__tests__/**',
        '**/node_modules/**',
      ],
    },
  },
});
