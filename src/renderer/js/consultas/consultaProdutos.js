// consulta_clientes.js

// Pega os elementos da página
const filtroId = document.getElementById("filtroId")
const filtroSituacao = document.getElementById("filtroSituacao")
const filtroNome = document.getElementById("filtroNome")
const btnBuscar = document.getElementById("btnBuscar")
const btnFechar = document.getElementById("btnFechar")
const tabela = document.getElementById("tabelaProdutos")

btnBuscar.addEventListener("click", async () => {
  // Captura os valores digitados
  const id = filtroId.value.trim()
  const situacao = filtroSituacao.value.trim()
  const nome = filtroNome.value.trim()

  console.log("consultaProdutos: enviando filtros:", { id, situacao, nome })
  // Envia os filtros como um objeto para o backend
  const produtos = await window.electronAPI.buscarProdutos({
    id,
    situacao,
    nome,
  })

  console.log("consultaProdutos: produtos retornados:", produtos)

  tabela.innerHTML = ""
  produtos.forEach((prod) => {
    const row = tabela.insertRow()
    row.insertCell(0).textContent = prod.id_prod
    row.insertCell(1).textContent = prod.sit_prod
    row.insertCell(2).textContent = prod.nome_prod
    row.insertCell(3).textContent = prod.preco_prod
    row.insertCell(4).textContent = prod.obs_prod || ""

    // 👉 Quando o usuário der duplo clique na linha
    row.addEventListener("dblclick", () => {
      // Envia o cliente selecionado para o main.js
      window.electronAPI.selecionarProduto(prod)
      // Fecha a janela de consulta
      setTimeout(() => {
        window.close()
      }, 50)
    })
  })
})

//Serve para fechar a tela no clique do botao fechar.
btnFechar.addEventListener("click", () => {
  window.electronAPI.fecharEmulaCancelarProd()

  // espera curtinha para dar tempo ao main de encaminhar o evento antes de fechar a janela.
  // 100ms costuma ser suficiente; se preferir pode ajustar.
  setTimeout(() => {
    window.close()
  }, 50)
})
