let controleInclusao = ""
let controleEdicao = ""

const btnNovo = document.getElementById("btnNovo")
const btnEditar = document.getElementById("btnEditar")
const btnExcluir = document.getElementById("btnExcluir")
const btnConfirmar = document.getElementById("btnConfirmar")
const btnCancelar = document.getElementById("btnCancelar")
const btnPesquisar = document.getElementById("btnPesquisar")

const id = document.getElementById("id")
const situacao = document.getElementById("situacao")
const nome = document.getElementById("nome")
const telefone = document.getElementById("telefone")
const email = document.getElementById("email")
const observacao = document.getElementById("observacao")

function preencherCliente(cliente) {
  id.value = cliente.id_cli
  situacao.value = cliente.sit_cli
  nome.value = cliente.nome_cli
  telefone.value = cliente.telefone_cli
  email.value = cliente.email_cli
  observacao.value = cliente.obs_cli || ""

  situacao.disabled = true
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true

  btnNovo.disabled = true
  btnEditar.disabled = false
  btnExcluir.disabled = false
  btnConfirmar.disabled = true
  btnCancelar.disabled = false
  btnPesquisar.disabled = false
}

carregarClienteSelecionado(preencherCliente)

btnNovo.addEventListener("click", () => {
  controleInclusao = "I"

  situacao.disabled = true
  nome.disabled = false
  telefone.disabled = false
  email.disabled = false
  observacao.disabled = false

  btnNovo.disabled = true
  btnEditar.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false
  btnPesquisar.disabled = true

  nome.focus()
})

btnEditar.addEventListener("click", () => {
  controleEdicao = "E"

  situacao.disabled = false
  nome.disabled = false
  telefone.disabled = false
  email.disabled = false
  observacao.disabled = false

  btnNovo.disabled = true
  btnEditar.disabled = true
  btnExcluir.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false
  btnPesquisar.disabled = true

  nome.focus()
})

btnExcluir.addEventListener("click", async () => {
  if (id.value === "") {
    alert("Nenhum cliente carregado em tela!!!")
  } else if (situacao.value === "I") {
    alert("Cliente inativo. Impossível excluir!")
  } else {
    const desejaExcluir = confirm(
      "Deseja excluir o cliente ID: " + id.value + "?",
    )

    if (desejaExcluir) {
      const resultado = await excluirCliente(id.value)

      alert(resultado.mensagem)

      if (resultado.sucesso) {
        situacao.disabled = true
        nome.disabled = true
        telefone.disabled = true
        email.disabled = true
        observacao.disabled = true

        id.value = ""
        situacao.value = "A"
        nome.value = ""
        telefone.value = ""
        email.value = ""
        observacao.value = ""

        btnNovo.disabled = false
        btnEditar.disabled = true
        btnExcluir.disabled = true
        btnConfirmar.disabled = true
        btnCancelar.disabled = true
        btnPesquisar.disabled = false
      }
    } else {
      return
    }
  }

  controleInclusao = ""
  controleEdicao = ""
})

btnConfirmar.addEventListener("click", async () => {
  if (nome.value === "" || telefone.value === "") {
    alert("Informe no mínimo Nome e Telefone!!")
    return
  }

  const dadosCliente = {
    situacao: situacao.value,
    nome: nome.value,
    telefone: telefone.value,
    email: email.value,
    observacao: observacao.value,
  }

  if (controleInclusao === "I") {
    const resultado = await incluirCliente(dadosCliente)
    alert(resultado.mensagem)

    if (resultado.sucesso) {
      id.value = ""
      situacao.value = "A"
      nome.value = ""
      telefone.value = ""
      email.value = ""
      observacao.value = ""

      btnNovo.disabled = false
      btnEditar.disabled = true
      btnConfirmar.disabled = true
      btnCancelar.disabled = true
      btnPesquisar.disabled = false
    }
  } else if (controleEdicao === "E") {
    const resultado = await editarCliente(id.value, dadosCliente)
    alert(resultado.mensagem)

    if (resultado.sucesso) {
      btnNovo.disabled = true
      btnEditar.disabled = false
      btnExcluir.disabled = false
      btnConfirmar.disabled = true
      btnCancelar.disabled = true
      btnPesquisar.disabled = false
    }
  }

  situacao.disabled = true
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true

  controleInclusao = ""
  controleEdicao = ""
})

btnCancelar.addEventListener("click", () => {
  situacao.disabled = true
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true

  id.value = ""
  situacao.value = "A"
  nome.value = ""
  telefone.value = ""
  email.value = ""
  observacao.value = ""

  btnNovo.disabled = false
  btnEditar.disabled = true
  btnExcluir.disabled = true
  btnConfirmar.disabled = true
  btnCancelar.disabled = true
  btnPesquisar.disabled = false

  controleInclusao = ""
  controleEdicao = ""
})

btnPesquisar.addEventListener("click", () => {
  abrirConsultaClientes("/src/renderer/telas/clientes.html")
  controleInclusao = ""
  controleEdicao = ""
})
