let controleInclusao = ""
let controleEdicao = ""

// Seleciona elementos do formulário
const btnNovo = document.getElementById("btnNovo")
const btnEditar = document.getElementById("btnEditar")
const btnExcluir = document.getElementById("btnExcluir")
const btnConfirmar = document.getElementById("btnConfirmar")
const btnCancelar = document.getElementById("btnCancelar")
const btnPesquisar = document.getElementById("btnPesquisar")
const btnPesquisarCliente = document.getElementById("btnPesquisarCliente")
const btnAdicionarProduto = document.getElementById("btnAdicionarProduto")
const btnExcluirProduto = document.getElementById("btnExcluirProduto")

const id = document.getElementById("id")
const situacao = document.getElementById("situacao")
const idCliente = document.getElementById("idCliente")
const idNomeCliente = document.getElementById("idNomeCliente")
const observacao = document.getElementById("observacao")

// Evento de clique no botão "Novo"
btnNovo.addEventListener("click", () => {
  controleInclusao = "I"

  situacao.disabled = true
  idCliente.disabled = true
  idNomeCliente.disabled = true
  observacao.disabled = false

  btnNovo.disabled = true
  btnEditar.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false
  btnPesquisarCliente.disabled = false
  btnAdicionarProduto.disabled = false
  btnExcluirProduto.disabled = false
})

//Evento de clique do botao de adicionar produto
btnAdicionarProduto.addEventListener("click", () => {
  window.electronAPI.abrirConsultaProdutos()
})

//Evento de clique do botao de adicionar cliente
btnPesquisarCliente.addEventListener("click", () => {
  window.electronAPI.abrirConsultaClientes()
})

//Evento de clique do botao pesquisar
btnPesquisar.addEventListener("click", () => {
  window.electronAPI.abrirConsultaProdutos()

  btnNovo.disabled = true
  btnEditar.disabled = false
  btnExcluir.disabled = false
  btnConfirmar.disabled = true
  btnCancelar.disabled = false

  controleInclusao = ""
  controleEdicao = ""
})

// Evento de clique no botão "Cancelar"
btnCancelar.addEventListener("click", () => {
  controleInclusao = "I"

  situacao.disabled = true
  idCliente.disabled = true
  idNomeCliente.disabled = true
  observacao.disabled = true

  btnNovo.disabled = false
  btnEditar.disabled = true
  btnConfirmar.disabled = true
  btnCancelar.disabled = true
  btnPesquisarCliente.disabled = true
  btnAdicionarProduto.disabled = true
  btnExcluirProduto.disabled = true
})

//Mesmo metodo para emular o cancelar na tela de cadastro de clientes, apenas reutilizado aqui para quando fechar a pesquisa de clientes, emular o botao cancelar nessa tela
window.electronAPI.cancelarCliente(() => {
  btnCancelar.click()
})

//Mesmo metodo para emular o cancelar na tela de cadastro de produtos, apenas reutilizado aqui para quando fechar a pesquisa de clientes, emular o botao cancelar nessa tela
window.electronAPI.cancelarProduto(() => {
  btnCancelar.click()
})
