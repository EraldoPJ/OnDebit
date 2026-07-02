const filtroId = document.getElementById("filtroId")
const filtroSituacao = document.getElementById("filtroSituacao")
const filtroNome = document.getElementById("filtroNome")
const filtroTelefone = document.getElementById("filtroTelefone")
const btnBuscar = document.getElementById("btnBuscar")
const btnFechar = document.getElementById("btnFechar")
const tabela = document.getElementById("tabelaClientes")

const modoSelecao =
  new URLSearchParams(window.location.search).get("modo") === "selecao"

function voltarParaOrigem() {
  const retorno =
    sessionStorage.getItem("consultaRetorno") ||
    "/src/renderer/telas/clientes.html"
  sessionStorage.removeItem("consultaRetorno")
  window.location.href = retorno
}

btnBuscar.addEventListener("click", async () => {
  const clientes = await buscarClientes({
    id: filtroId.value.trim(),
    situacao: filtroSituacao.value.trim(),
    nome: filtroNome.value.trim(),
    telefone: filtroTelefone.value.trim(),
  })

  tabela.innerHTML = ""

  clientes.forEach((cli) => {
    const row = tabela.insertRow()
    row.insertCell(0).textContent = cli.id_cli

    let situacaoTexto = ""
    if (cli.sit_cli === "I") situacaoTexto = "Inativo"
    else if (cli.sit_cli === "A") situacaoTexto = "Ativo"

    row.insertCell(1).textContent = situacaoTexto
    row.insertCell(2).textContent = cli.nome_cli
    row.insertCell(3).textContent = cli.telefone_cli
    row.insertCell(4).textContent = cli.email_cli
    row.insertCell(5).textContent = cli.obs_cli || ""

    if (modoSelecao) {
      row.addEventListener("dblclick", () => {
        sessionStorage.setItem("clienteSelecionado", JSON.stringify(cli))
        voltarParaOrigem()
      })
    }
  })
})

btnFechar.addEventListener("click", () => {
  voltarParaOrigem()
})
