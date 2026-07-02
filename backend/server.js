const express = require("express")
const cors = require("cors")

const db = require("./db")

const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend")))
app.use("/assets", express.static(path.join(__dirname, "../assets")))

//---------------------------------------------- BUSCA DE CLIENTES ----------------------------------------------//
app.get("/clientes", async (req, res) => {
  try {
    const { id, situacao, nome, telefone } = req.query

    let query = "SELECT * FROM clientes WHERE 1=1"
    const params = []

    if (id && id.trim() !== "") {
      params.push(`%${id.trim()}%`)
      query += ` AND id_cli::text LIKE $${params.length}`
    }

    if (situacao && (situacao === "A" || situacao === "I")) {
      params.push(situacao)
      query += ` AND sit_cli = $${params.length}`
    }

    if (nome && nome.trim() !== "") {
      params.push(`%${nome.trim()}%`)
      query += ` AND nome_cli ILIKE $${params.length}`
    }

    if (telefone && telefone.trim() !== "") {
      params.push(`%${telefone.trim()}%`)
      query += ` AND telefone_cli LIKE $${params.length}`
    }

    const resultado = await db.query(query, params)
    res.json(resultado.rows)
  } catch (erro) {
    console.error("Erro ao buscar clientes:", erro)
    res.json([])
  }
})

//---------------------------------------------- INCLUSAO NO BANCO DE DADOS ----------------------------------------------//
app.post("/clientes", async (req, res) => {
  try {
    const cliente = req.body

    await db.query(
      `
      INSERT INTO clientes 
      (sit_cli, nome_cli, telefone_cli, email_cli, obs_cli, data_cad)
      VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
      `,
      [
        cliente.situacao,
        cliente.nome,
        cliente.telefone,
        cliente.email,
        cliente.observacao,
      ],
    )

    res.json({
      sucesso: true,
      mensagem: "Cliente incluído com sucesso!",
    })
  } catch (erro) {
    console.error("Erro ao incluir cliente:", erro)

    res.json({
      sucesso: false,
      mensagem: "Erro ao incluir cliente.",
    })
  }
})

//---------------------------------------------- EDICAO NO BANCO DE DADOS ----------------------------------------------//
app.put("/clientes/:id", async (req, res) => {
  try {
    const cliente = req.body
    const id = req.params.id

    await db.query(
      `
      UPDATE clientes 
      SET sit_cli = $1,
          nome_cli = $2,
          telefone_cli = $3,
          email_cli = $4,
          obs_cli = $5
      WHERE id_cli = $6
      `,
      [
        cliente.situacao,
        cliente.nome,
        cliente.telefone,
        cliente.email,
        cliente.observacao,
        id,
      ],
    )

    res.json({
      sucesso: true,
      mensagem: "Cliente editado com sucesso!",
    })
  } catch (erro) {
    console.error("Erro ao editar cliente:", erro)

    res.json({
      sucesso: false,
      mensagem: "Erro ao editar cliente.",
    })
  }
})

//---------------------------------------------- EXCLUSAO NO BANCO DE DADOS ----------------------------------------------//
app.delete("/clientes/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM clientes WHERE id_cli = $1", [req.params.id])

    res.json({
      sucesso: true,
      mensagem: `Cliente ID: ${req.params.id} excluído com sucesso!`,
    })
  } catch (erro) {
    console.error("Erro ao excluir cliente:", erro)

    res.json({
      sucesso: false,
      mensagem: "Erro ao excluir cliente.",
    })
  }
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
