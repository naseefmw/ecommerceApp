const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require('../models/product')

let token

beforeEach(async () => {
  await User.deleteMany({})
  await Product.deleteMany({})
  await Cart.deleteMany({})
  await Product.insertMany(helper.initialProducts)

  const user = {
    username: 'admin',
    password: 'Password123',
    name: 'Naseef',
    email: 'naseef@gmail.com',
    phone: 9876543210,
    avatarId: 1,
    address: 'Kannur',
  }

  await api.post('/api/users').send(user)
  const result = await api.post('/api/login').send(user)
  token = result.body.token
})

describe('when the cart is not created', () => {
  test('cart is created and an item is added', async () => {
    const productsAtStart = await helper.productsInDb()
    const productToAdd = productsAtStart[0]
    const newCart = {
      items: [
        {
          product: productToAdd.id,
          quantity: 1,
        },
      ],
    }
    await api
      .post('/api/carts')
      .set('Authorization', `Bearer ${token}`)
      .send(newCart)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)
    expect(result.body.items[0].product.name).toContain(productToAdd.name)
  })
})

describe('when the cart is created', () => {
  beforeEach(async () => {})
})

afterAll(async () => {
  await mongoose.connection.close()
})
