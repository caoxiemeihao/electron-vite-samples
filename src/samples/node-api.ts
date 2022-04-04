import path from 'path'
import fs from 'fs'
import { ipcRenderer } from 'electron'

console.log(Date.now())

// Use ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, message) => {
  console.log('[Receive Main-process message]:', message)
  console.log('[path]', path)
  console.log('[fs]', fs)
})
