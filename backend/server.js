const express = require("express")
const cors = require("cors")

const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Ondebit rodando 🚀")
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
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

