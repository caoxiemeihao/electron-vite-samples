import { join } from 'path'
import { app, BrowserWindow } from 'electron'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null
// Here, you can also use other preload
const preload = join(__dirname, './preload.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

function createWindow() {
  win = new BrowserWindow({
    icon: join(ROOT_PATH.public, 'logo.svg'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (app.isPackaged) {
    win.loadFile(join(ROOT_PATH.dist, 'index.html'))
  } else {
    win.loadURL(url)
  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
