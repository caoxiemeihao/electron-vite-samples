import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    electron({
      entry: 'electron/main.ts',
      onstart(args) {
        console.log('Doing something before start....')

        // Start Electron App
        args.startup(['.', '--no-sandbox'])
      },
    }),
  ],
})
