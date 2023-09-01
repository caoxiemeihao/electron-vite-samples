import path from 'node:path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: path.join(__dirname, 'html/index.html'),
        foo: path.join(__dirname, 'html/foo.html'),
        bar: path.join(__dirname, 'html/bar.html'),
      },
    },
  },
})
