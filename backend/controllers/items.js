const itemsRouter = require('express').Router()
const Item = require('../models/item')

itemsRouter.get('/', async (request, response) => {
  const items = await Item.find({})
    .populate('product')
    .populate('user', { username: 1, name: 1 })
  response.json(items)
})

itemsRouter.get('/myCart', async (request, response) => {
  const user = request.user
  const items = await Item.find({}).populate('product')
  //console.log(items)
  const myCart = items.filter((item) => item.user.toString() === user.id)

  if (myCart) {
    response.json(myCart)
  } else {
    response.status(404).end()
  }
})

itemsRouter.get('/:id', async (request, response) => {
  const item = await Item.findById(request.params.id)
  if (item) {
    response.json(item)
  } else {
    response.status(404).end()
  }
})

itemsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const item = new Item({
    user: user.id,
    product: body.product,
    quantity: body.quantity || 1,
  })

  const savedItem = await item.save()
  user.cart = user.cart.concat(savedItem._id)
  await user.save()
  response.json(savedItem)
})

itemsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const item = {
    product: body.product,
    quantity: body.quantity,
  }

  const updatedItem = await Item.findByIdAndUpdate(request.params.id, item, {
    new: true,
  })
  response.json(updatedItem)
})

itemsRouter.delete('/:id', async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = itemsRouter
