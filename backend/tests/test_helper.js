const Product = require('../models/product')
const User = require('../models/user')

const initialProducts = []

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map((product) => product.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialProducts,
  productsInDb,
  usersInDb,
}
