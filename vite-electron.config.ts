import { defineConfig } from 'vite-plugin-electron'

export default defineConfig({
  main: {
    entry: 'electron-main.ts',
    nodeIntegration: true,
  },
  preload: {
    entry: 'electron-preload.ts',
  },
})
