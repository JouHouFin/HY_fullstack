const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title) {
    return response.status(400).end()
  }
  var lks = 0
  if (request.body.likes) {
    lks = request.body.likes
  }

  const blog = new Blog(
    {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: lks

    }
  )

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedPerson = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedPerson.toJSON())
})

module.exports = blogsRouter