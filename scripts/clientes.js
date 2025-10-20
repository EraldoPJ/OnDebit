// Seleciona elementos do formulário
const btnNovo = document.getElementById("btnNovo")
const btnEditar = document.getElementById("btnEditar")
const btnExcluir = document.getElementById("btnExcluir")
const btnConfirmar = document.getElementById("btnConfirmar")
const btnCancelar = document.getElementById("btnCancelar")

const id = document.getElementById("id")
const nome = document.getElementById("nome")
const telefone = document.getElementById("telefone")
const email = document.getElementById("email")
const observacao = document.getElementById("observacao")

// Evento de clique no botão "Novo"
btnNovo.addEventListener("click", () => {
  nome.disabled = false
  telefone.disabled = false
  email.disabled = false
  observacao.disabled = false

  btnEditar.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false

  // (opcional) Coloca o foco automaticamente no campo nome
  nome.focus()
})

// Evento de clique no botão "Editar"
btnEditar.addEventListener("click", () => {
  nome.disabled = false
  telefone.disabled = false
  email.disabled = false
  observacao.disabled = false

  btnNovo.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false

  // (opcional) Coloca o foco automaticamente no campo nome
  nome.focus()
})

// Evento de clique no botão "Excluir"
btnExcluir.addEventListener("click", () => {
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true
})

// Evento de clique no botão "Confirmar"
btnConfirmar.addEventListener("click", () => {
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true

  btnNovo.disabled = false
  btnEditar.disabled = false
  btnConfirmar.disabled = true
  btnCancelar.disabled = true
})

// Evento de clique no botão "Cancelar"
btnCancelar.addEventListener("click", () => {
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true
  
  btnNovo.disabled = false
  btnEditar.disabled = false
  btnConfirmar.disabled = true
  btnCancelar.disabled = true
})
