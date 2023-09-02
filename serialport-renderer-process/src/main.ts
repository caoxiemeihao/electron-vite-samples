import './serialport'

document.getElementById('app')!.innerHTML = `
<h1>Hi there 👋</h1>
<p>Now, you can use serialport in Renderer process.</p>
`
// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')
