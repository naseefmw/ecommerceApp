const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  brand: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: String,
  image: {
    type: String,
    required: true,
  },
  addedDate: Date,
  rating: Number,
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._Id
    delete returnedObject.__v
  },
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product
