// main.js
const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "./scripts/preload.js"), // segurança: expõe APIs específicas
      contextIsolation: true, // mantém isolamento seguro
      nodeIntegration: false, // impede require no renderer
    },
  })

  // carrega a tua página index.html a partir da pasta do projeto
  win.loadFile(path.join(__dirname, "index.html"))
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

//handle para fazer a definicao do comando feito para o banco.
ipcMain.handle("salvar-cliente", async (event, cliente) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO clientes (nome_cli, telefone_cli, email_cli, obs_cli)
      VALUES (?, ?, ?, ?)
    `)

    stmt.run(cliente.nome, cliente.telefone, cliente.email, cliente.observacao)

    return { sucesso: true, mensagem: "Cliente salvo com sucesso!" }
  } catch (erro) {
    console.error("Erro ao salvar cliente:", erro)
    return { sucesso: false, mensagem: "Erro ao salvar cliente." }
  }
})

// Busca clientes com filtros opcionais dinâmicos
ipcMain.handle("buscar-clientes", async (event, filtros) => {
  try {
    console.log("Filtros recebidos:", filtros)

    const db = require("./scripts/db.js")

    // Monta a query base
    let queryClientes = "SELECT * FROM clientes WHERE 1=1"
    const params = []

    // Se tiver nome informado, adiciona na query
    if (filtros.nome && filtros.nome.trim() !== "") {
      queryClientes += " AND nome_cli LIKE ?"
      params.push(`%${filtros.nome}%`)
    }

    // Se tiver telefone informado, adiciona na query
    if (filtros.telefone && filtros.telefone.trim() !== "") {
      queryClientes += " AND telefone_cli LIKE ?"
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

ipcMain.on("abrir-consulta-clientes", () => {
  const consultaWin = new BrowserWindow({
    width: 700,
    height: 500,
    resizable: false,
    parent: BrowserWindow.getFocusedWindow(), // deixa a janela principal bloqueada
    modal: true, // impede interação com a principal
    webPreferences: {
      preload: path.join(__dirname, "./scripts/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
})
