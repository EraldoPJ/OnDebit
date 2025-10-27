let janelaPrincipal // referência janela principal
let consultaCli // referencia tela de consulta de clientes.

// main.js
const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

function createWindow() {
  janelaPrincipal = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "OnDebit",
    webPreferences: {
      preload: path.join(__dirname, "./scripts/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  janelaPrincipal.loadFile(path.join(__dirname, "index.html"))
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  // no macOS normalmente apps ficam abertas até o usuário fechar
  if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

const db = require("./scripts/db.js") // importa teu módulo de banco

// Abre a janela de consulta de clientes
ipcMain.on("abrir-consulta-clientes", () => {
  consultaCli = new BrowserWindow({
    width: 700,
    height: 500,
    resizable: false,
    parent: BrowserWindow.getFocusedWindow(),
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "./scripts/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  consultaCli.loadFile(
    path.join(__dirname, "./telas/consultas/consultaClientes.html")
  )

  consultaCli.on("closed", () => {
    consultaCli = null
  })
})

//handle para fazer a inclusao do registro no banco.
ipcMain.handle("incluir-cliente", async (event, cliente) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO clientes (nome_cli, telefone_cli, email_cli, obs_cli, data_cad)
      VALUES (?, ?, ?, ?, CURRENT_DATE)
    `)

    stmt.run(cliente.nome, cliente.telefone, cliente.email, cliente.observacao)

    return { sucesso: true, mensagem: "Cliente incluido com sucesso!" }
  } catch (erro) {
    console.error("Erro ao incluir cliente:", erro)
    return { sucesso: false, mensagem: "Erro ao incluir cliente." }
  }
})

//handle para fazer a edicao de informacao no banco.
ipcMain.handle("editar-cliente", async (event, cliente) => {
  try {
    const stmt = db.prepare(`
      UPDATE clientes SET nome_cli = ?, telefone_cli = ?, email_cli = ?, obs_cli = ? WHERE id_cli = ?
    `)

    stmt.run(
      cliente.nome,
      cliente.telefone,
      cliente.email,
      cliente.observacao,
      cliente.id
    )

    return { sucesso: true, mensagem: "Cliente editado com sucesso!" }
  } catch (erro) {
    console.error("Erro ao editar cliente:", erro)
    return { sucesso: false, mensagem: "Erro ao editar cliente." }
  }
})

//handle para fazer a exclusao das informacoes do DB.
ipcMain.handle("excluir-cliente", async (event, cliente) => {
  try {
    const stmt = db.prepare(`
      DELETE FROM clientes WHERE id_cli = ?
    `)

    stmt.run(cliente.id)

    return {
      sucesso: true,
      mensagem: "Cliente ID: " + cliente.id + " excluído com sucesso!",
    }
  } catch (erro) {
    console.error("Erro ao excluir cliente:", erro)
    return { sucesso: false, mensagem: "Erro ao excluir cliente." }
  }
})

// Busca clientes com filtros opcionais dinâmicos-------------------------------------------------------------------------
ipcMain.handle("buscar-clientes", async (event, filtros) => {
  try {
    const db = require("./scripts/db.js")

    // Monta a query base
    let queryClientes = "SELECT * FROM clientes clientes WHERE 1=1"
    const params = []

    // Se tiver nome informado, adiciona na query
    if (filtros.nome && filtros.nome.trim() !== "") {
      queryClientes += " AND clientes.nome_cli LIKE ?"
      params.push(`%${filtros.nome}%`)
    }

    // Se tiver telefone informado, adiciona na query
    if (filtros.telefone && filtros.telefone.trim() !== "") {
      queryClientes += " AND clientes.telefone_cli LIKE ?"
      params.push(`%${filtros.telefone}%`)
    }

    // Prepara e executa a consulta
    const stmt = db.prepare(queryClientes)
    const clientes = stmt.all(...params)

    return clientes
  } catch (erro) {
    console.error("Erro ao buscar clientes:", erro)
    return []
  }
})

// Recebe o cliente selecionado e envia pra janela principal
ipcMain.on("selecionar-cliente", (event, cliente) => {
  janelaPrincipal.webContents.send("carregar-cliente", cliente)
})

ipcMain.on("fechar-emula-cancelar", () => {
  if (consultaCli && !consultaCli.isDestroyed()) {
    // Envia um evento pra janela principal acionar o botão cancelar
    janelaPrincipal.webContents.send("emula-cancelar")
  }
})

//-----------------------------------------------------------------------------------------------------------------------------------------------
