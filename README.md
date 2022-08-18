![screenshort.png](https://github.com/electron-vite/vite-plugin-electron-quick-start/blob/main/public/screenshort.png?raw=true)

## Overview

🚀 Quick Start of [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)  
🎯 Based on the official [template-vanilla-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vanilla-ts), less invasive  

## Run Setup

```sh
# clone the project
git clone https://github.com/electron-vite/vite-plugin-electron-quick-start.git

# enter the project directory
cd vite-plugin-electron-quick-start

# install dependency
npm install

# develop
npm run dev
```

## Be aware

🚨 By default, this template integrates Node.js in the Renderer process. If you don't need it, you just remove the option below. [Because it will modify the default config of Vite](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

electron({
- renderer: {}
})
```

## FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#dependencies-vs-devdependencies)
- [Using C/C++ native addons in Electron-Renderer](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#load-nodejs-cc-native-modules)
- [Node.js ESM packages](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#nodejs-esm-packages) (e.g. `execa` `node-fetch`)
