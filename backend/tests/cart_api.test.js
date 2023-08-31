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
    const products = await helper.productsInDb()
    const productToAdd = products[0]
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

describe('when the cart is created and initialized', () => {
  beforeEach(async () => {
    const products = await helper.productsInDb()
    const newCart = {
      items: [
        {
          product: products[0].id,
          quantity: 1,
        },
        {
          product: products[1].id,
          quantity: 2,
        },
      ],
      purchaseHistory: [
        {
          product: products[2].id,
          quantity: 3,
          date: '2023-07-20',
        },
      ],
    }
    await api
      .post('/api/carts')
      .set('Authorization', `Bearer ${token}`)
      .send(newCart)
  })

  test('all items are returned', async () => {
    const response = await api.get('/api/carts')
    expect(response.body[0].items).toHaveLength(2)
    expect(response.body[0].purchaseHistory).toHaveLength(1)
  })

  test('an item is added to cart', async () => {
    const products = await helper.productsInDb()
    const cart = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)
    const myCart = cart.body

    const newItem = {
      product: products[3].id,
      quantity: 1,
    }
    const updatedCart = {
      ...myCart,
      items: myCart.items.concat(newItem),
    }

    const result = await api
      .put(`/api/carts/${myCart.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedCart)
    const names = result.body.items.map((item) => item.product.name)
    expect(names).toContain(helper.initialProducts[3].name)
  })

  test('quantity of an item in cart is updated', async () => {
    const cart = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)
    const myCart = cart.body
    const itemToBeUpdated = myCart.items[0]

    const updatedItem = {
      ...itemToBeUpdated,
      quantity: 4,
    }
    const updatedItems = myCart.items.map((item) =>
      item.product._id === itemToBeUpdated.product._id ? updatedItem : item
    )

    const updatedCart = {
      ...myCart,
      items: updatedItems,
    }

    const result = await api
      .put(`/api/carts/${myCart.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedCart)

    expect(result.body.items[0].quantity).toEqual(4)
  })

  test('items in cart are removed', async () => {
    const myCart = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)

    const emptyCart = { ...myCart.body, items: [] }

    await api
      .put(`/api/carts/${myCart.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(emptyCart)

    const cartsAtEnd = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)
    expect(cartsAtEnd.body.items).toHaveLength(0)
  })

  test('items in cart are moved to purchase history', async () => {
    const cart = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)
    const myCart = cart.body

    const newPurchaseHistory = myCart.items.map((item) => ({
      ...item,
      date: new Date().toISOString(),
    }))
    const updatedCart = {
      ...myCart,
      items: [],
      purchaseHistory: myCart.purchaseHistory.concat(newPurchaseHistory),
    }

    await api
      .put(`/api/carts/${myCart.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedCart)

    const cartsAtEnd = await api
      .get('/api/carts/myCart')
      .set('Authorization', `Bearer ${token}`)
    expect(cartsAtEnd.body.items).toHaveLength(0)
    expect(cartsAtEnd.body.purchaseHistory).toHaveLength(3)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
