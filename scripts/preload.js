// preload.js
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  // exemplo: teste de ping
  ping: () => ipcRenderer.invoke("ping"),
})
