// preload.js
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  salvarCliente: (cliente) => ipcRenderer.invoke("salvar-cliente", cliente),
  buscarClientes: (filtros) => ipcRenderer.invoke("buscar-clientes", filtros),
  abrirConsultaClientes: () => ipcRenderer.send("abrir-consulta-clientes"),
})
