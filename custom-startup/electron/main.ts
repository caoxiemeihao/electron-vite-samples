import path from 'node:path'
import { app, BrowserWindow } from 'electron'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null

app.whenReady().then(() => {
  win = new BrowserWindow()

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
})

app.on('window-all-closed', () => {
  app.quit()
  win = null
})
