import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/firebase/index.ts',
    'src/firebase.server/index.ts',
  ],
  format: ['esm'],
  splitting: true,
  sourcemap: false,
  minify: true,
  clean: true,
  dts: true,
})