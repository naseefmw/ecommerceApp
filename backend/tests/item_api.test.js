const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Item = require('../models/item')
const User = require('../models/user')
const Product = require('../models/product')

let token

beforeEach(async () => {
  await User.deleteMany({})
  await Product.deleteMany({})
  await Item.deleteMany({})
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

describe('when the cart is empty', () => {
  test('an item is added', async () => {
    const products = await helper.productsInDb()
    const productToAdd = products[0]
    const newItem = {
      product: productToAdd.id,
    }
    await api
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .get('/api/items/myCart')
      .set('Authorization', `Bearer ${token}`)
    expect(result.body[0].product.name).toContain(productToAdd.name)
  })
})

describe('when the cart is initialized', () => {
  beforeEach(async () => {
    const products = await helper.productsInDb()
    const newItems = [
      {
        product: products[0].id,
        quantity: 1,
      },
      {
        product: products[1].id,
        quantity: 2,
      },
    ]

    await Item.insertMany(newItems)
  })

  test('all items are returned', async () => {
    const response = await api.get('/api/items')
    expect(response.body).toHaveLength(2)
  })

  test('an item is added to cart', async () => {
    const products = await helper.productsInDb()

    const newItem = {
      product: products[3].id,
      quantity: 3,
    }

    await api
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/items')

    const names = result.body.map((item) => item.product.name)

    expect(names).toContain(helper.initialProducts[3].name)
  })

  test('quantity of an item is updated', async () => {
    const items = await api
      .get('/api/items')
      .set('Authorization', `Bearer ${token}`)
    const itemToBeUpdated = items.body[0]

    const updatedItem = {
      product: itemToBeUpdated.product.id,
      quantity: 4,
    }

    const result = await api
      .put(`/api/items/${itemToBeUpdated.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedItem)

    expect(result.body.quantity).toEqual(4)
  })

  test('an item is removed', async () => {
    const items = await api.get('/api/items')

    await api.delete(`/api/items/${items.body[0].id}`)

    const itemsAtEnd = await api.get('/api/items')
    expect(itemsAtEnd.body).toHaveLength(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
