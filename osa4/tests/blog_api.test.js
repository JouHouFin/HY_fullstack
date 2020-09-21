const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)
const logger = require('../utils/logger')



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
  test('right number blogs are returned in right format', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('POST /api/blogs', () => {
  test('a blog can be added', async () => {
    const blog = new Blog(
      {
        title: "testtitle",
        author: "testauthor",
        url: "testurl",
        likes: 1
      }
    )

    const response = await api.post('/api/blogs').send(blog)
    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')

    const finalBlogs = await helper.allBlogs()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const contents = finalBlogs.map(n => n.title)
    expect(contents).toContain(
      'testtitle'
    )
  })
})

describe('identification field correctness', () => {
  test('returned blogs should have identifying field as "id", not "_id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('unknown endpoint', () => {
  test('trying to get nonexisting address should return 404 unknown endpoint error', async () => {
    const response = await api.get('/api/bloggs')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({error: "unknown endpoint"})
  })
})

afterAll(() => {
  mongoose.connection.close()
})