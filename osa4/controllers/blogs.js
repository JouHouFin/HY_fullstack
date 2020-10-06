const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const process = require('process')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: 'title must be specified' })
  }
  if (!request.body.url) {
    return response.status(400).json({ error: 'url must be specified' })
  }
  if (!request.body.url) {
    return response.status(400).json({ error: 'user must be specified' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog(
    {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes ? request.body.likes : 0,
      user: user._id
    }
  )

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(401).json({ error: 'invalid blog id' })
  }

  if ( blog.user.toString() === user._id.toString() ){
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  response.status(401).json({ error: 'unauthorized operation: trying to delete someone other´s blog?' })
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedPerson = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user')
  response.json(updatedPerson.toJSON())
})

module.exports = blogsRouter