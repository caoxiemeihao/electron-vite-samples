// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer } from 'electron';

ipcRenderer.on('load-native-addons', (_event, arg1) => {
  document.body.innerHTML += `
<div style="padding:10px; background-color:#efefef; border-radius:4px;">
  <p>Native modules loaded successfully.</p>
  <pre>${JSON.stringify(arg1, null, 2)}</pre>
</div>
`;
});
