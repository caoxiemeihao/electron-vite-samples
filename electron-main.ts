import { app, BrowserWindow } from 'electron'

let win: BrowserWindow

function createWindow() {
  win = new BrowserWindow({
    x: 0,
    y: 100,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (app.isPackaged) {
    // TODO
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
