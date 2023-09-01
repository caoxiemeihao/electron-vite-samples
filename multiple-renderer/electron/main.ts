import path from 'path'
import {
  app,
  BrowserWindow,
  ipcMain,
} from 'electron'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const windows: BrowserWindow[] = []

function switchURL(html = 'index.html') {
  const existWin = windows.find(w => w.title === html)

  if (existWin) {
    existWin.focus()
  } else {
    const win = new BrowserWindow({
      title: html,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  
    if (process.env.VITE_DEV_SERVER_URL) {
      win.loadURL(path.posix.join(process.env.VITE_DEV_SERVER_URL, 'html', html))
    } else {
      win.loadFile(path.join(__dirname, `../dist/html/${html}`))
    }
    windows.push(win)
  }
}

ipcMain.handle('to-window', (_ev, html: string) => {
  switchURL(html)
})

app.whenReady().then(() => {
  switchURL()
})

app.on('window-all-closed', () => {
  windows.length = 0
  app.quit()
})
