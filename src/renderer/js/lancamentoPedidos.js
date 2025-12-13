// Seleciona elementos do formulário
const btnNovo = document.getElementById("btnNovo")
const btnEditar = document.getElementById("btnEditar")
const btnExcluir = document.getElementById("btnExcluir")
const btnConfirmar = document.getElementById("btnConfirmar")
const btnCancelar = document.getElementById("btnCancelar")
const btnPesquisar = document.getElementById("btnPesquisar")

const id = document.getElementById("id")
const situacao = document.getElementById("situacao")
const idCliente = document.getElementById("idCliente")
const idNome = document.getElementById("idNome")
const observacao = document.getElementById("observacao")

// Evento de clique no botão "Novo"
btnNovo.addEventListener("click", () => {
  controleInclusao = "I"

  situacao.disabled = true
  idCliente.disabled = false
  idNome.disabled = false
  observacao.disabled = false

  btnNovo.disabled = true
  btnEditar.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false

  // (opcional) Coloca o foco automaticamente no campo nome
  nome.focus()
})