const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    minlength: 8,
    require: true
  },
  is_admin: {
    type: Boolean,
    default: false,
    require: true
  },
  phone: {
    type: Number,
    unique: true,
    maxlength: 8,
    require: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now(),
    require: true
  },
  confirmation_token: {
    type: String
  }
})
const User = Mongoose.model('User', UserSchema)
module.exports = User
