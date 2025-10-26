// preload.js
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  incluirCliente: (cliente) => ipcRenderer.invoke("incluir-cliente", cliente),
  excluirCliente: (cliente) => ipcRenderer.invoke("excluir-cliente", cliente),
  buscarClientes: (filtros) => ipcRenderer.invoke("buscar-clientes", filtros),
  abrirConsultaClientes: () => ipcRenderer.send("abrir-consulta-clientes"),
  selecionarCliente: (cliente) =>
    ipcRenderer.send("selecionar-cliente", cliente),

  clienteSelecionado: (callback) =>
    ipcRenderer.on("carregar-cliente", (event, cliente) => {
      console.log("🟣 Cliente recebido no preload:", cliente)
      callback(cliente)
    }),
})
