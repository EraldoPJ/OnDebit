// Seleciona elementos do formulário
const btnNovo = document.getElementById("btnNovo")
const btnEditar = document.getElementById("btnEditar")
const btnExcluir = document.getElementById("btnExcluir")
const btnConfirmar = document.getElementById("btnConfirmar")
const btnCancelar = document.getElementById("btnCancelar")
const btnPesquisar = document.getElementById("btnPesquisar")

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

  btnNovo.disabled = true
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
  btnEditar.disabled = true
  btnExcluir.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false

  // (opcional) Coloca o foco automaticamente no campo nome
  nome.focus()
})

// Evento de clique no botão "Excluir"
btnExcluir.addEventListener("click", async () => {
  if (id.value === "") {
    alert("Nenhum cliente carregado em tela!!!")
  } else {
    const desejaExcluir = confirm(
      "Deseja excluir o cliente ID: " + id.value + "?"
    )

    if (desejaExcluir) {
      const excluirCliente = {
        id: id.value, //valor do campo ID
        nome: nome.value, // valor do campo nome
        telefone: telefone.value, // valor do campo telefone
        email: email.value, // valor do campo email
        observacao: observacao.value, // valor do campo observação
      }

      const resultadoExcluirCliente = await window.electronAPI.excluirCliente(
        excluirCliente
      )

      // Se o delete foi bem-sucedido:
      if (resultadoExcluirCliente.sucesso) {
        alert(resultadoExcluirCliente.mensagem) // Mostra mensagem de sucesso
      } else {
        alert(resultadoExcluirCliente.mensagem) // Mostra mensagem de erro (vinda do main.js)
      }

      //Desabilita inputs
      nome.disabled = true
      telefone.disabled = true
      email.disabled = true
      observacao.disabled = true

      //Limpa os campos
      id.value = ""
      nome.value = ""
      telefone.value = ""
      email.value = ""
      observacao.value = ""

      //Controle de botoes
      btnNovo.disabled = false
      btnEditar.disabled = true
      btnExcluir.disabled = true
      btnConfirmar.disabled = true
      btnCancelar.disabled = true
      btnPesquisar.disabled = false
    } else {
      return
    }
  }
})

// Evento de clique no botão "Confirmar"
btnConfirmar.addEventListener("click", async () => {
  if (nome.value === "" || telefone.value === "") {
    alert("Informe no mínimo Nome e Telefone!!")
    return
  } else {
    const novoCliente = {
      nome: nome.value, // valor do campo nome
      telefone: telefone.value, // valor do campo telefone
      email: email.value, // valor do campo email
      observacao: observacao.value, // valor do campo observação
    }

    // Chama a função "incluirCliente" que foi exposta pelo preload.js
    // Essa função usa o IPC do Electron pra enviar os dados ao main.js,
    // onde o Node (com o better-sqlite3) faz o INSERT no banco de dados.
    const resultadoCliente = await window.electronAPI.incluirCliente(
      novoCliente
    )

    // Se o salvamento foi bem-sucedido:
    if (resultadoCliente.sucesso) {
      alert(resultadoCliente.mensagem) // Mostra mensagem de sucesso
    } else {
      alert(resultadoCliente.mensagem) // Mostra mensagem de erro (vinda do main.js)
    }

    //Desabilita inputs
    nome.disabled = true
    telefone.disabled = true
    email.disabled = true
    observacao.disabled = true

    //Limpa os campos
    nome.value = ""
    telefone.value = ""
    email.value = ""
    observacao.value = ""

    //Controle de botoes
    btnNovo.disabled = false
    btnEditar.disabled = false
    btnConfirmar.disabled = true
    btnCancelar.disabled = true
  }
})

// Evento de clique no botão "Cancelar"
btnCancelar.addEventListener("click", () => {
  nome.disabled = true
  telefone.disabled = true
  email.disabled = true
  observacao.disabled = true

  // limpa os campos
  id.value = ""
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
})

//Evento de clique do botao pesquisar
btnPesquisar.addEventListener("click", () => {
  window.electronAPI.abrirConsultaClientes()

  btnNovo.disabled = true
  btnEditar.disabled = false
  btnExcluir.disabled = false
  btnConfirmar.disabled = true
  btnCancelar.disabled = false
})

/* ------------------- RECEBER CLIENTE SELECIONADO ------------------- */

// Quando o usuário der duplo clique na tela de consulta,
// o cliente é enviado pra cá e preenche os campos:
window.electronAPI.clienteSelecionado((cliente) => {
  id.value = cliente.id_cli
  nome.value = cliente.nome_cli
  telefone.value = cliente.telefone_cli
  email.value = cliente.email_cli
  observacao.value = cliente.obs_cli || ""
})
