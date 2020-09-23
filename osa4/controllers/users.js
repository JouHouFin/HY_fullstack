const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  if (!request.body.password) {
    response.status(400).json({ error: 'a password with minimum of 3 characters must be supplied' })
  }
  if (request.body.password.length < 3) {
    response.status(400).json({ error: 'password must be at least 3 characters long' })
  }
  if (!request.body.userName) {
    response.status(400).json({ error: 'a username with minimum of 3 characters must be supplied' })
  }
  if (request.body.userName.length < 3) {
    response.status(400).json({ error: 'username must be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(request.body.password, 10)

  const user = new User({
    userName: request.body.userName,
    name: request.body.name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter