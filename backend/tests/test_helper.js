const Product = require('../models/product')
const User = require('../models/user')

const initialProducts = [
  {
    name: 'iPhone 14',
    description: 'latest iphone',
    brand: 'Apple',
    price: 79900,
    category: 'SmartPhone',
    image:
      'https://www.apple.com/v/iphone-14/i/images/key-features/features/size/size_yellow__dnv9794q7loy_large.jpg',
    addedDate: '2023-08-20',
    rating: 4.4,
  },
  {
    name: 'Galaxy S23',
    description: 'latest galaxy S',
    brand: 'Samsung',
    price: 74999,
    category: 'SmartPhone',
    image:
      'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911bzkbins/gallery/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265914?imwidth=480',
    addedDate: '2023-08-21',
    rating: 4.5,
  },
  {
    name: 'Pixel 7',
    description: 'latest pixel',
    brand: 'Google',
    price: 49999,
    category: 'SmartPhone',
    image:
      'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911bzkbins/gallery/in-galaxy-s23-s911-sm-s911bzkbins-thumb-535265914?imwidth=480',
    addedDate: '2023-08-21',
    rating: 4.5,
  },
  {
    name: 'HP Omen 16',
    description: 'omen laptop',
    brand: 'HP',
    price: 104903,
    category: 'Laptop',
    image:
      'https://in-media.apjonlinecdn.com/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/c/0/c08509690_12.png',
    addedDate: '2023-08-20',
    rating: 4.8,
  },
]

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
