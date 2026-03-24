const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Ondebit rodando 🚀")
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
