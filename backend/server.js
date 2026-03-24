const express = require("express")
const cors = require("cors")

const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

/*app.get("/", (req, res) => {
  res.send("API Ondebit rodando 🚀")
}) */

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()")

    res.json(result.rows)
  } catch (err) {
    console.error("Erro conexão banco:", err)
    res.status(500).send("Erro conexão banco")
  }
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
