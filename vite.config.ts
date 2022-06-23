import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron/renderer'

fs.rmSync('dist', { recursive: true, force: true }) // v14.14.0

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: {
          // Must be use absolute path, this is the restrict of rollup
          splash: path.join(__dirname, 'electron/splash.ts'),
        },
      },
    }),
    renderer(),
  ],
})
