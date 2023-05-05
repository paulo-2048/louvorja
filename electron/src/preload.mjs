console.log('preload.mjs')

const { app, contextBridge, ipcRenderer } = require('electron');

console.log('preload.mjs :: contextBridge')

contextBridge.exposeInMainWorld('louvorJA', {
    application: {
        minimize: () => ipcRenderer.invoke('control-main-minimize'),
        maximize: async () => await ipcRenderer.invoke('control-main-maximize'),
        unmaximize: async () => await ipcRenderer.invoke('control-main-unmaximize'),
        isMaximized: async () => await ipcRenderer.invoke('control-main-isMaximized'),
        quit: () => ipcRenderer.invoke('quit-app')
    }
});

console.log('preload.mjs :: bridge ok')

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
