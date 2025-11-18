// consulta_clientes.js

// Pega os elementos da página
const filtroId = document.getElementById("filtroId")
const filtroSituacao = document.getElementById("filtroSituacao")
const filtroNome = document.getElementById("filtroNome")
const filtroTelefone = document.getElementById("filtroTelefone")
const btnBuscar = document.getElementById("btnBuscar")
const btnFechar = document.getElementById("btnFechar")
const tabela = document.getElementById("tabelaClientes")

btnBuscar.addEventListener("click", async () => {
  // Captura os valores digitados
  const id = filtroId.value.trim()
  const situacao = filtroSituacao.value.trim()
  const nome = filtroNome.value.trim()
  const telefone = filtroTelefone.value.trim()

  // Envia os filtros como um objeto para o backend
  const clientes = await window.electronAPI.buscarClientes({
    id,
    situacao,
    nome,
    telefone,
  })

  tabela.innerHTML = ""
  clientes.forEach((cli) => {
    const row = tabela.insertRow()
    row.insertCell(0).textContent = cli.id_cli
    let situacao
    if (cli.sit_cli === "I") {
      situacao = "Inativo"
    } else if (cli.sit_cli === "A") {
      situacao = "Ativo"
    }
    row.insertCell(1).textContent = situacao
    row.insertCell(2).textContent = cli.nome_cli
    row.insertCell(3).textContent = cli.telefone_cli
    row.insertCell(4).textContent = cli.email_cli
    row.insertCell(5).textContent = cli.obs_cli || ""

    // 👉 Quando o usuário der duplo clique na linha
    row.addEventListener("dblclick", () => {
      // Envia o cliente selecionado para o main.js
      window.electronAPI.selecionarCliente(cli)
      // Fecha a janela de consulta
      window.close()
    })
  })
})

//Serve para fechar a tela no clique do botao fechar.
btnFechar.addEventListener("click", () => {
  window.electronAPI.fecharEmulaCancelarCli()
  setTimeout(() => {
    window.close()
  }, 50)
})
