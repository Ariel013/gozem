const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false,
    required: true
  },
  phone: {
    type: Number,
    unique: true,
    maxlength: 8,
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  },
  confirmation_token: {
    type: String
  }
})
const User = Mongoose.model('User', UserSchema)
module.exports = User
