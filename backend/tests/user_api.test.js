const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('horsebatterystaple', 10)

    const user = new User({
      username: 'admin',
      passwordHash,
      name: 'Naseef',
      email: 'naseef@gmail.com',
      phone: 9876543210,
      avatarId: 1,
      address: 'Kannur',
    })

    await user.save()
  })

  test('creating a fresh user succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      password: 'hello12345',
      email: 'taylor@gmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails if an already existing username is used', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Administrator',
      username: 'admin',
      password: 'password',
      email: 'someemail@gmail.com',
      phone: 1234567809,
      avatarId: 2,
      address: 'New York',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if an already existing email is used', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Administrator',
      username: 'admin2',
      password: 'password',
      email: 'naseef@gmail.com',
      phone: 1234567809,
      avatarId: 2,
      address: 'New York',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `email` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if there is no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      password: 'hello12345',
      email: 'taylor@gmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if there is no name', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'TaylorH',
      password: 'hello12345',
      email: 'taylor@gmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`name` is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if there is no phone number', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      password: 'hello12345',
      email: 'taylor@gmail.com',
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`phone` is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if there is no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      email: 'taylor@gmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user validation fails if username length is < 4', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'tay',
      password: 'Password321',
      email: 'taylor@gmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'is shorter than the minimum allowed length (4)'
    )
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user validation fails if password length is < 8', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      password: 'Passwor',
      email: 'taylor@gmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'is shorter than minimum allowed length(8)'
    )
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user validation fails if phone number length is < 10', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      password: 'Password123',
      email: 'taylor@gmail.com',
      phone: 123456789,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is less than minimum allowed value')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user validation fails if phone number length is > 10', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      password: 'Password123',
      email: 'taylor@gmail.com',
      phone: 12345678901,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is more than maximum allowed value')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user validation fails if email does not have @', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Taylor H',
      username: 'taylor',
      password: 'Password123',
      email: 'taylorgmail.com',
      phone: 1234567890,
      avatarId: 2,
      address: 'Brockton Bay',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('email: invalid email')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
