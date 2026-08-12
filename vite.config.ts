import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2020',
    // The stylesheet is authored with native CSS nesting; esbuild flattens it for these
    // targets, so the shipped CSS works even without native nesting support.
    cssTarget: ['chrome112', 'edge112', 'firefox117', 'safari16.5'],
  },
  worker: {
    format: 'es',
  },
});
