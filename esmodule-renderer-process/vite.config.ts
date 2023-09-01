import path from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: {
        resolve: {
          execa: { type: 'esm' },
          got: { type: 'esm' },
          'node-fetch': { type: 'esm' },
        },
      },
    }),
  ],
  optimizeDeps: {
    // If an npm package is a pure ESM format package, 
    // and the packages it depends on are also in ESM format, 
    // then put it in `optimizeDeps.exclude` and it will work normally.
    // exclude: ['only-support-pure-esmodule-package'],
  },
})
