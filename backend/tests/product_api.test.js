const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Product = require('../models/product')

describe('when there is initially some products in the db', () => {
  beforeEach(async () => {
    await Product.deleteMany({})
    await Product.insertMany(helper.initialProducts)
  })

  test('all products are returned', async () => {
    const response = await api.get('/api/products')
    expect(response.body).toHaveLength(helper.initialProducts.length)
  })

  test('a product is added', async () => {
    const productsAtStart = await helper.productsInDb()

    const newProduct = {
      name: 'Galaxy S20',
      description: 'a galaxy S',
      brand: 'Samsung',
      price: 54999,
      category: 'SmartPhone',
      image: 'image link',
      addedDate: '2023-07-21',
      rating: 3.9,
    }

    await api
      .post('/api/products')
      .send(newProduct)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const productsAtEnd = await helper.productsInDb()
    expect(productsAtEnd).toHaveLength(productsAtStart.length + 1)

    const names = productsAtEnd.map((product) => product.name)
    expect(names).toContain(newProduct.name)
  })

  test('a product is removed', async () => {
    const newProduct = {
      name: 'Galaxy S20',
      description: 'a galaxy S',
      brand: 'Samsung',
      price: 54999,
      category: 'SmartPhone',
      image: 'image link',
      addedDate: '2023-07-21',
      rating: 3.9,
    }

    await api.post('/api/products').send(newProduct).expect(200)

    const productsAtStart = await helper.productsInDb()
    const productToDelete = productsAtStart.find(
      (product) => product.name === newProduct.name
    )

    await api.delete(`/api/products/${productToDelete.id}`).expect(204)

    const productsAtEnd = await helper.productsInDb()
    expect(productsAtEnd).toHaveLength(productsAtStart.length - 1)
    const names = productsAtEnd.map((product) => product.name)
    expect(names).not.toContain(newProduct.name)
  })

  test('a product is updated', async () => {
    const productsAtStart = await helper.productsInDb()
    const productToUpdate = productsAtStart[0]
    const updatedProduct = {
      ...productToUpdate,
      price: productToUpdate.price + 1000,
    }

    const response = await api
      .put(`/api/products/${updatedProduct.id}`)
      .send(updatedProduct)
    expect(response.body.price).toEqual(helper.initialProducts[0].price + 1000)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
