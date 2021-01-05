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

describe('two users saved initially', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  describe('GET /api/users', () => {
    test('right status code is returned', async () => {
      const response = await api.get('/api/users')
      expect(response.status).toBe(200)
    })
    test('returned users are in right format', async () => {
      const response = await api.get('/api/users')
      expect(response.type).toBe('application/json')
    })
    test('right number of users is returned', async () => {
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(helper.initialUsers.length)
    })
  })

  describe('POST /api/users', () => {
    test('right status code is returned and number of users should increase', async () => {
      const user = {
        username: 'usrNm',
        name: 'nm',
        password: 'verystrongpassword'
      }
      const response = await api.post('/api/users').send(user)
      expect(response.status).toBe(201)
      const usersInDB = await helper.allUsers()
      expect(usersInDB.length).toBe(helper.initialUsers.length + 1)
    })

    test('user with too short username cannot be created', async () => {
      const user = {
        username: 'un',
        name: 'nm',
        password: 'verystrongpassword'
      }
      const response = await api.post('/api/users').send(user)
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('username must be at least 3 characters long')
      const usersInDB = await helper.allUsers()
      expect(usersInDB.length).toBe(helper.initialUsers.length)
    })

    test('user with too short password cannot be created', async () => {
      const user = {
        username: 'veryUniqueUsername',
        name: 'Dick Hardsteel',
        password: 'pw'
      }
      const response = await api.post('/api/users').send(user)
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('password must be at least 3 characters long')
      const usersInDB = await helper.allUsers()
      expect(usersInDB.length).toBe(helper.initialUsers.length)
    })

    test('multiple users with same username cannot be created', async () => {
      const user = {
        username: 'veryUniqueUsername',
        name: 'Dick Hardsteel',
        password: 'password'
      }
      const response = await api.post('/api/users').send(user)
      expect(response.status).toBe(201)

      const response2 = await api.post('/api/users').send(user)
      expect(response2.status).toBe(400)
      expect(response2.body.error).toBe('Error, expected `username` to be unique.')

      const usersInDB = await helper.allUsers()
      expect(usersInDB.length).toBe(helper.initialUsers.length + 1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
