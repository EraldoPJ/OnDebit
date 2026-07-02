async function buscarClientes(filtros) {
  const params = new URLSearchParams()

  if (filtros.id) params.set("id", filtros.id)
  if (filtros.situacao && filtros.situacao !== "T") {
    params.set("situacao", filtros.situacao)
  }
  if (filtros.nome) params.set("nome", filtros.nome)
  if (filtros.telefone) params.set("telefone", filtros.telefone)

  const response = await fetch(`/clientes?${params}`)
  return response.json()
}

async function incluirCliente(cliente) {
  const response = await fetch("/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  })
  return response.json()
}

async function editarCliente(id, cliente) {
  const response = await fetch(`/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  })
  return response.json()
}

async function excluirCliente(id) {
  const response = await fetch(`/clientes/${id}`, { method: "DELETE" })
  return response.json()
}

function carregarClienteSelecionado(callback) {
  const salvo = sessionStorage.getItem("clienteSelecionado")
  if (!salvo) return

  sessionStorage.removeItem("clienteSelecionado")
  callback(JSON.parse(salvo))
}

function abrirConsultaClientes(retorno) {
  sessionStorage.setItem("consultaRetorno", retorno)
  window.location.href =
    "/src/renderer/telas/consultas/consultaClientes.html?modo=selecao"
}
