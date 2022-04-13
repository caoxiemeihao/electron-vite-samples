import path from 'path'
import { app, BrowserWindow } from 'electron'

let win: BrowserWindow

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, '../electron-preload/index.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

    win.loadURL(url)
  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
