const conf = require('../utils/config')
const logger = require('../utils/logger')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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
    await api.post('/api/users').send(helper.initialUsers[1])

    const usersInDB = await helper.allUsers()
    const blogs = await helper.initialBlogs.map(blog => blog = { ...blog, user: usersInDB[0].id })
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
  })

  describe('GET all blogs', () => {
    test('right status code is returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.status).toBe(200)
    })
    test('returned blogs are in right format', async () => {
      const response = await api.get('/api/blogs')
      expect(response.type).toBe('application/json')
    })
    test('right number of blogs is returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('GET /api/blogs/:id', () => {
    test('correct blog is returned', async () => {
      const allBlogs = await api.get('/api/blogs')
      const blogs = allBlogs.body
      const id = blogs[0].id
      const singleBlog = await api.get(`/api/blogs/${id}`)
      expect(singleBlog.body.title).toBe(blogs[0].title)
      expect(singleBlog.body.author).toBe(blogs[0].author)
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
      expect(response.body).toEqual({ error: 'unknown endpoint' })
    })
  })

  describe('POST /api/blogs', () => {
    test('a blog is added correctly with POST request', async () => {
      const usersInDB = await helper.allUsers()
      const loginCredentials = {
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password
      }

      const login = await api.post('/api/login').send(loginCredentials)
      const token = login.body.token
      const blog =
        {
          title: 'testtitle',
          author: 'testauthor',
          url: 'testurl',
          likes: 1,
          user: usersInDB[0].id
        }

      const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blog)
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

    test('a blog cannot be added without a valid token', async () => {
      const usersInDB = await helper.allUsers()

      const blog =
        {
          title: 'testtitle',
          author: 'testauthor',
          url: 'testurl',
          likes: 1,
          user: usersInDB[0].id
        }

      const response = await api.post('/api/blogs').send(blog)
      expect(response.status).toBe(401)
      expect(response.body).toEqual({ error: 'token missing or invalid' })

      const finalBlogs = await helper.allBlogs()
      expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
    })

    test('if number of likes is not defined, it should be set to zero by default', async () => {
      const usersInDB = await helper.allUsers()
      const loginCredentials = {
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password
      }

      const login = await api.post('/api/login').send(loginCredentials)
      const token = login.body.token
      const blog =
        {
          title: 'noLikesTitle',
          author: 'noLikesAuthor',
          url: 'noLikesUrl',
          user: usersInDB[0].id
        }

      const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blog)
      expect(response.body.likes).toBe(0)
    })

    test('if title and url are not defined, the answer should be 400 Bad request', async () => {
      const blog =
        {
          author: 'noUrlOrTitleAuthor',
          likes: 5556245234
        }

      const response = await api.post('/api/blogs').send(blog)
      expect(response.status).toBe(400)
      expect(response.res.statusMessage).toBe('Bad Request')
    })
  })

  describe('a blog can be deleted', () => {
    test('succeeding deletion should be responded with status code 204 and number of blogs should be one less', async () => {
      const blogsAtStart = await helper.allBlogs()
      const loginCredentials = {
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password
      }

      const login = await api.post('/api/login').send(loginCredentials)
      const token = login.body.token

      const response = await api.delete(`/api/blogs/${blogsAtStart[0].id}`).set('Authorization', `bearer ${token}`).send()
      expect(response.status).toBe(204)

      const blogsAtEnd = await helper.allBlogs()
      expect(blogsAtEnd.length).toBe(blogsAtStart.length -1)
    })
  })

  describe('a blog can be modified', () => {
    test('succeeding modification should be responded with status code 200 and the corresponding blog should be modified correctly', async () => {

      const blogsAtStart = await helper.allBlogs()
      const id = blogsAtStart[0].id
      const blog = {
        title: 'modifiedTitle',
        author: 'modifiedAuthor',
        url: 'modifiedUrl',
        likes: 1234321
      }

      const response = await api.put(`/api/blogs/${id}`).send(blog)
      expect(response.status).toBe(200)

      const modifiedBlog = await api.get(`/api/blogs/${id}`)
      expect(modifiedBlog.body.title).toBe('modifiedTitle')
      expect(modifiedBlog.body.title).not.toBe(blogsAtStart[0].title)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
