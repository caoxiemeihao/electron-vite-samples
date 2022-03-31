[![npm package](https://nodei.co/npm/vitejs-plugin-electron.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vitejs-plugin-electron)
[![NPM version](https://img.shields.io/npm/v/vitejs-plugin-electron.svg?style=flat)](https://npmjs.org/package/vitejs-plugin-electron)
[![NPM Downloads](https://img.shields.io/npm/dm/vitejs-plugin-electron.svg?style=flat)](https://npmjs.org/package/vitejs-plugin-electron)

Integrate Vite and Electron

## Usage

**vite.config.js**

```js
import { defineConfig } from 'vite'
import electron from 'vitejs-plugin-electron'
import electronConfig from './vite-electron.config'

export default defineConfig({
  plugins: [
    electron({ ...electronConfig }),
  ],
})
```

**vite-electron.config.js**

```js
import { defineConfig } from 'vitejs-plugin-electron'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {},
})
```
