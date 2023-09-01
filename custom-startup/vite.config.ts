import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'electron/main.ts',
        onstart(args) {
          console.log('Doing something before start....')

          // Start Electron App
          args.startup(['.', '--no-sandbox'])
        },
      }
    }),
  ],
})
