// preload.js
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  salvarCliente: (cliente) => ipcRenderer.invoke("salvar-cliente", cliente),
})

