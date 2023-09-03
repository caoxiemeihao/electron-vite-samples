import { ipcRenderer } from 'electron'
import { getSqlite3 } from './better-sqlite3'

document.getElementById('app')!.innerHTML = `
<h1>Hi there 👋</h1>
<p>Now, you can use better-sqlite3 in Renderer process.</p>
`

ipcRenderer.invoke('get-database-path').then(dbpath => {
  const db = getSqlite3(dbpath)
  console.log('[better-sqlite3]', db.pragma('journal_mode = WAL'))
})

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')
