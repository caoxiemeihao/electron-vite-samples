import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronConfig from './vite-electron.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron(electronConfig),
  ],
})
