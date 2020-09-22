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

describe('identification field correctness', () => {
  test('returned blogs should have identifying field as "id", not "_id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('unknown endpoint', () => {
  test('trying to reach a nonexisting address should return 404 unknown endpoint error', async () => {
    const response = await api.get('/api/bloggs')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ error: "unknown endpoint" })
  })
})

describe('POST /api/blogs', () => {
  test('a blog is added correctly with POST request', async () => {
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
    expect(response.body.likes).toBe(1)

    const finalBlogs = await helper.allBlogs()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const contents = finalBlogs.map(n => n.title)
    expect(contents).toContain(
      'testtitle'
    )
  })
})

describe('default likes', () => {
  test('if number of likes is not defined, it should be set to zero by default', async () => {
    const blog = new Blog(
      {
        title: "noLikesTitle",
        author: "noLikesauthor",
        url: "noLikesurl",
      }
    )

    const response = await api.post('/api/blogs').send(blog)
    expect(response.body.likes).toBe(0)
    
  })
})

describe('missing fields', () => {
  test('if title and url are not defined, the answer should be 400 Bad request', async () => {
    const blog = new Blog(
      {
        author: "noUrlOrTitleAuthor",
        likes: 5556245234
      }
    )

    const response = await api.post('/api/blogs').send(blog)
    expect(response.status).toBe(400)
    expect(response.res.statusMessage).toBe('Bad Request')
  })
})

afterAll(() => {
  mongoose.connection.close()
})