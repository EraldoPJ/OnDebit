const fs = require("fs")
const ini = require("ini")
const { Pool } = require("pg")
const path = require("path")

const configPath = path.join(__dirname, "..", "ONDEBIT.INI")

const config = ini.parse(fs.readFileSync(configPath, "utf-8"))

const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
})

module.exports = pool
