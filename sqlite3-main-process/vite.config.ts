import path from 'node:path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'
import native from 'vite-plugin-native'

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          plugins: [
            native({
              webpack: {},
            }),
          ],
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
    }),
  ],
})
