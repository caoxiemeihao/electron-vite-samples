import path from 'path'
import { defineConfig } from 'vite-plugin-electron'

export default defineConfig({
  main: {
    entry: 'electron/main.ts',
  },
  preload: {
    input: {
      // Must be use absolute path, this is the restrict of rollup
      splash: path.join(__dirname, 'electron/splash.ts'),
    },
  },
})
