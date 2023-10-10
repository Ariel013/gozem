const Mongoose = require('mongoose')
const PackageSchema = new Mongoose.Schema({
  active_delivery_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Delivery',
    require: true
  },
  description: {
    type: String,
    require: true
  },
  weight: {
    type: Number,
    require: true
  },
  width: {
    type: Number,
    require: true
  },
  height: {
    type: Number,
    require: true
  },
  depth: {
    type: Number,
    require: true
  },
  from_name: {
    type: String,
    require: true
  },
  from_address: {
    type: String,
    require: true
  },
  from_location: {
    lat: {
      type: Number,
      require: true
    },
    lng: {
      type: Number,
      require: true
    }
  },
  to_name: {
    type: String,
    require: true
  },
  to_address: {
    type: String,
    require: true
  },
  to_location: {
    lat: {
      type: Number,
      require: true
    },
    lng: {
      type: Number,
      require: true
    }
  },
  created_at: {
    type: Date,
    default: Date.now(),
    require: true
  }
})
const Package = Mongoose.model('Package', PackageSchema)
module.exports = Package
