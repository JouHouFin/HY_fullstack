require('dotenv').config()
const process = require('process')

const PORT = 3001
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'cypress') {
  process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}