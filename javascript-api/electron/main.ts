import { app, BrowserWindow } from 'electron'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://vitejs.dev/')

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
})

app.on('window-all-closed', () => {
  app.quit()
  win = null
})
