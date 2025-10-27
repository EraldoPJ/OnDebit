// consulta_clientes.js

// Pega os elementos da página
const filtroNome = document.getElementById("filtroNome")
const filtroTelefone = document.getElementById("filtroTelefone")
const btnBuscar = document.getElementById("btnBuscar")
const tabela = document.getElementById("tabelaClientes")

btnBuscar.addEventListener("click", async () => {
  // Captura os valores digitados
  const nome = filtroNome.value.trim()
  const telefone = filtroTelefone.value.trim()

  // Envia os filtros como um objeto para o backend
  const clientes = await window.electronAPI.buscarClientes({ nome, telefone })

  tabela.innerHTML = ""
  clientes.forEach((cli) => {
    const row = tabela.insertRow()
    row.insertCell(0).textContent = cli.id_cli
    row.insertCell(1).textContent = cli.nome_cli
    row.insertCell(2).textContent = cli.telefone_cli
    row.insertCell(3).textContent = cli.email_cli
    row.insertCell(4).textContent = cli.obs_cli || ""

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
document.getElementById("btnFechar").addEventListener("click", () => {
  window.electronAPI.fecharEmulaCancelar()
  window.close()
})
