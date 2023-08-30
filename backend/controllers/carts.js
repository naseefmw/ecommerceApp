const cartsRouter = require('express').Router()
const Cart = require('../models/cart')

cartsRouter.get('/', async (request, response) => {
  const carts = await Cart.find({})
    .populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
    .populate({
      path: 'purchaseHistory',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
    .populate('user', { username: 1, name: 1 })
  response.json(carts)
})

cartsRouter.get('/myCart', async (request, response) => {
  const user = request.user
  const carts = await Cart.find({})
    .populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
    .populate({
      path: 'purchaseHistory',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
    .populate('user', { username: 1, name: 1 })

  const cart = carts.find((cart) => cart.user.id === user.id)

  if (cart) {
    response.json(cart)
  } else {
    response.status(404).end()
  }
})

cartsRouter.get('/:id', async (request, response) => {
  const cart = await Cart.findById(request.params.id)
  if (cart) {
    response.json(cart)
  } else {
    response.status(404).end()
  }
})

cartsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const cart = new Cart({
    user: user.id,
    items: body.items,
  })

  const savedCart = await cart.save()
  user.cart = savedCart._id
  await user.save()
  response.json(savedCart)
})

cartsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const cart = {
    items: body.items,
    purchaseHistory: body.purchaseHistory,
  }

  const updatedCart = await Cart.findByIdAndUpdate(request.params.id, cart, {
    new: true,
  })
  response.json(updatedCart)
})

module.exports = cartsRouter
