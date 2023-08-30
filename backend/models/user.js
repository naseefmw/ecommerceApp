const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const isEmail = require('validator/lib/isEmail')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: String,
  email: {
    type: String,
    validate: [isEmail, 'invalid email'],
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
  },
  avatarId: Number,
  address: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
