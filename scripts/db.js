const Database = require("better-sqlite3")
const path = require("path")

// Caminho para o banco já existente
const dbPath = path.join(__dirname, "../db/Ondebit.db")
const db = new Database(dbPath)

module.exports = db
