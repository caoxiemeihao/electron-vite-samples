import { execa } from 'execa'
import got from 'got'
import nodeFetch from 'node-fetch'

document.getElementById('app')!.innerHTML = `
<h1>Hi there 👋</h1>
<p>Now, you can use esmodule in Renderer process.</p>
<pre>
  import { execa } from 'execa'
  import got from 'got'
  import nodeFetch from 'node-fetch'
</pre>
`

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

console.log('Node.js ESM package execa:\n', execa)
console.log('Node.js ESM package got:\n', got)
console.log('Node.js ESM package node-fetch:\n', nodeFetch)
