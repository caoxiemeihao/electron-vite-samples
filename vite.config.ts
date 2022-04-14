import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron/renderer'
import polyfillExports from 'vite-plugin-electron/polyfill-exports'
import electronConfig from './vite-electron.config'

export default defineConfig({
  plugins: [
    vue(),
    electron(electronConfig),
    electronRenderer(),
    polyfillExports(),
  ],
  build: {
    emptyOutDir: false,
  },
})
