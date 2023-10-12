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
  phone: {
    type: Number,
    unique: true,
    maxlength: 8,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'livreur']
  },
  is_active: {
    type: Boolean,
    default: true,
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
