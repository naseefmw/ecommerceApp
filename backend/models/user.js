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
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 9999999999,
  },
  avatarId: Number,
  address: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
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
