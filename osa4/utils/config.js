require('dotenv').config()
const process = require('process')

const PORT = 3001
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}