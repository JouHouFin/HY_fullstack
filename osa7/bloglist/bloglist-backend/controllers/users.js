const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  if (request.body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }
  if (request.body.username.length < 3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(request.body.password, 10)

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter