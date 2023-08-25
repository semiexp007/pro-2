const pgp = require('pg-promise')()
const path = require('path')


const createDbString = () => {
  return `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}
const db = pgp(createDbString())

module.exports = { db }