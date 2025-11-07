// preload.js
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  //Processos de Clientes
  incluirCliente: (cliente) => ipcRenderer.invoke("incluir-cliente", cliente),
  editarCliente: (cliente) => ipcRenderer.invoke("editar-cliente", cliente),
  excluirCliente: (cliente) => ipcRenderer.invoke("excluir-cliente", cliente),
  buscarClientes: (filtros) => ipcRenderer.invoke("buscar-clientes", filtros),
  abrirConsultaClientes: () => ipcRenderer.send("abrir-consulta-clientes"),

  selecionarCliente: (cliente) =>
    ipcRenderer.send("selecionar-cliente", cliente),

  clienteSelecionado: (callback) =>
    ipcRenderer.on("carregar-cliente", (event, cliente) => {
      callback(cliente)
    }),

  //Processos de Produtos----------------------------------------------------------------------------------------------------------------------
  incluirProduto: (produto) => ipcRenderer.invoke("incluir-produto", produto),
  editarProduto: (produto) => ipcRenderer.invoke("editar-produto", produto),
  excluirProduto: (produto) => ipcRenderer.invoke("excluir-produto", produto),
  buscarProdutos: (filtrosProd) =>
    ipcRenderer.invoke("buscar-produtos", filtrosProd),
  abrirConsultaProdutos: () => ipcRenderer.send("abrir-consulta-produtos"),

  selecionarProduto: (produto) =>
    ipcRenderer.send("selecionar-produto", produto),

  produtoSelecionado: (callback) =>
    ipcRenderer.on("carregar-produto", (event, produto) => {
      callback(produto)
    }),

  
  //Realiza o fechamento das telas de consulta
  fecharEmulaCancelar: () => ipcRenderer.send("fechar-emula-cancelar"),

  cancelarCliente: (callback) =>
    ipcRenderer.on("emula-cancelar", () => callback()),
})
