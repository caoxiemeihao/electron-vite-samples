import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from '../vite-plugin-electron'
import renderer from 'vite-plugin-electron/renderer'
import electronConfig from './vite-electron.config'

fs.rmSync('dist', { recursive: true, force: true }) // v14.14.0

export default defineConfig({
  plugins: [
    vue(),
    electron(electronConfig as any) as any,
    renderer(),
  ],
  build: {
    emptyOutDir: false,
  },
})
