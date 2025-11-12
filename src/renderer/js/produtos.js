// Seleciona elementos do formulário
const btnNovo = document.getElementById("btnNovo")
const btnEditar = document.getElementById("btnEditar")
const btnExcluir = document.getElementById("btnExcluir")
const btnConfirmar = document.getElementById("btnConfirmar")
const btnCancelar = document.getElementById("btnCancelar")
const btnPesquisar = document.getElementById("btnPesquisar")

const id = document.getElementById("id")
const situacao = document.getElementById("situacao")
const nome = document.getElementById("nome")
const preco = document.getElementById("preco")
const observacao = document.getElementById("observacao")

// Evento de clique no botão "Novo"
btnNovo.addEventListener("click", () => {
  controleInclusao = "I"

  situacao.disabled = true
  nome.disabled = false
  preco.disabled = false
  observacao.disabled = false

  btnNovo.disabled = true
  btnEditar.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false

  // (opcional) Coloca o foco automaticamente no campo nome
  nome.focus()
})

// Evento de clique no botão "Editar"
btnEditar.addEventListener("click", async () => {
  controleEdicao = "E"

  situacao.disabled = false
  nome.disabled = false
  preco.disabled = false
  observacao.disabled = false

  btnNovo.disabled = true
  btnEditar.disabled = true
  btnExcluir.disabled = true
  btnConfirmar.disabled = false
  btnCancelar.disabled = false
  btnPesquisar.disabled = true

  // (opcional) Coloca o foco automaticamente no campo nome
  situacao.focus()
})

// Evento de clique no botão "Excluir"
btnExcluir.addEventListener("click", async () => {
  if (id.value === "") {
    alert("Nenhum produto carregado em tela!")
  } else {
    const desejaExcluir = confirm(
      "Deseja excluir o produto ID: " + id.value + "?"
    )

    if (desejaExcluir) {
      excluirProduto = {
        id: id.value, //valor do campo ID
        situacao: situacao.value, // valor do campo nome
      }

      const resultadoExcluirProduto = await window.electronAPI.excluirProduto(
        excluirProduto
      )

      // Se o delete foi bem-sucedido:
      if (resultadoExcluirProduto.sucesso) {
        alert(resultadoExcluirProduto.mensagem) // Mostra mensagem de sucesso
      } else {
        alert(resultadoExcluirProduto.mensagem) // Mostra mensagem de erro (vinda do main.js)
      }

      //Desabilita inputs
      situacao.disabled = true
      nome.disabled = true
      preco.disabled = true
      observacao.disabled = true

      //Limpa os campos
      id.value = ""
      situacao.value = "A"
      nome.value = ""
      preco.value = ""
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

  controleInclusao = ""
  controleEdicao = ""
})

// Evento de clique no botão "Confirmar"
btnConfirmar.addEventListener("click", async () => {
  if (nome.value === "" || preco.value === "") {
    alert("Informe no mínimo Nome e Preço!!")
    return
  } else {
    if (controleInclusao === "I") {
      const inclusaoProduto = {
        situacao: situacao.value, // valor do campo situacao
        nome: nome.value, // valor do campo nome
        preco: preco.value, // valor do campo preco
        observacao: observacao.value, // valor do campo observação
      }

      const resultadoInclusao = await window.electronAPI.incluirProduto(
        inclusaoProduto
      )

      // Se o salvamento foi bem-sucedido:
      if (resultadoInclusao.sucesso) {
        alert(resultadoInclusao.mensagem) // Mostra mensagem de sucesso
      } else {
        alert(resultadoInclusao.mensagem) // Mostra mensagem de erro (vinda do main.js)
      }
    } else if (controleEdicao === "E") {
      const edicaoProduto = {
        id: id.value, // passa o id para update
        situacao: situacao.value, // valor do campo telefone
        nome: nome.value, // valor do campo nome
        preco: preco.value, // valor do campo email
        observacao: observacao.value, // valor do campo observação
      }

      const resultadoEdicao = await window.electronAPI.editarProduto(
        edicaoProduto
      )

      // Se a edicao foi bem-sucedida:
      if (resultadoEdicao.sucesso) {
        alert(resultadoEdicao.mensagem) // Mostra mensagem de sucesso
      } else {
        alert(resultadoEdicao.mensagem) // Mostra mensagem de erro (vinda do main.js)
      }
    }

    //Desabilita inputs
    situacao.disabled = true
    nome.disabled = true
    preco.disabled = true
    observacao.disabled = true

    //Limpa os campos
    id.value = ""
    situacao.value = "A"
    nome.value = ""
    preco.value = ""
    observacao.value = ""

    //Controle de botoes
    btnNovo.disabled = false
    btnEditar.disabled = true
    btnConfirmar.disabled = true
    btnCancelar.disabled = true
    btnPesquisar.disabled = false

    controleInclusao = ""
    controleEdicao = ""
  }
})

// Evento de clique no botão "Cancelar"
btnCancelar.addEventListener("click", () => {
  situacao.disabled = true
  nome.disabled = true
  preco.disabled = true
  observacao.disabled = true

  // limpa os campos
  id.value = ""
  situacao.value = "A"
  nome.value = ""
  preco.value = ""
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

/* ------------------- RECEBER CLIENTE SELECIONADO ------------------- */

// Quando o usuário der duplo clique na tela de consulta,
// o cliente é enviado pra cá e preenche os campos:
window.electronAPI.produtoSelecionado((produto) => {
  id.value = produto.id_prod
  situacao.value = produto.sit_prod
  nome.value = produto.nome_prod
  preco.value = produto.preco_prod
  observacao.value = produto.obs_prod || ""
})

//Ao clicar em fechar, emula o clique do botao cancelar.
window.electronAPI.cancelarProduto(() => {
  btnCancelar.click()
})
