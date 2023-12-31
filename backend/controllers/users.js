const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('cart')

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password, email, phone, avatarId, address } =
    request.body

  if (password === undefined) {
    return response.status(400).json({
      error: 'User validation failed: Path `password` is required.',
    })
  }
  if (password.length < 8) {
    return response.status(400).json({
      error:
        'Validation failed: password length is shorter than minimum allowed length(8)',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    email,
    phone,
    avatarId,
    address,
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
