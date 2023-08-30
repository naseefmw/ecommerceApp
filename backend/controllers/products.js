const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', async (request, response) => {
  const products = await Product.find({})
  response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
  if (product) {
    response.json(product)
  } else {
    response.status(404).end()
  }
})

productsRouter.post('/', async (request, response) => {
  const body = request.body

  const product = new Product({
    name: body.name,
    description: body.description,
    brand: body.brand,
    price: body.price || 0,
    category: body.category,
    image: body.image,
    addedDate: body.addedDate,
    rating: body.rating || 2.5,
  })

  const savedProduct = await product.save()
  response.json(savedProduct)
})

productsRouter.delete('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
  if (product) {
    await Product.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

productsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const product = {
    name: body.name,
    description: body.description,
    brand: body.brand,
    price: body.price,
    category: body.category,
    image: body.image,
    addedDate: body.addedDate,
    rating: body.rating,
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    request.params.id,
    product,
    { new: true }
  )
  response.json(updatedProduct)
})

module.exports = productsRouter
