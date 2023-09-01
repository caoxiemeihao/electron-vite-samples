import { ipcRenderer } from 'electron'
import { getSqlite3 } from './sqlite3'

document.getElementById('app')!.innerHTML = `
<h1>Hi there 👋</h1>
<p>Now, you can use sqlite3 in Renderer process.</p>
`

ipcRenderer.invoke('get-database-path').then(dbpath => {
  getSqlite3(dbpath).then(db => {
    console.log(db)
  })
})

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')
