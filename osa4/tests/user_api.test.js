const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

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
})

afterAll(() => {
  mongoose.connection.close()
})
