const conf = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeAll(() => {
  mongoose.connect(conf.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connection to MongoDB:', error.message)
    })
})

describe('two blogs saved initially', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(helper.initialUsers[0])
  })

  describe('login', () => {
    test('logging in should return status code 200', async () => {
      const response = await api.post('/api/login').send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
      expect(response.status).toBe(200)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
