const Mongoose = require('mongoose')
const PackageSchema = new Mongoose.Schema({
  active_delivery_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Delivery'
    // required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  from_name: {
    type: String,
    required: true
  },
  from_address: {
    type: String,
    required: true
  },
  from_location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  to_name: {
    type: String,
    required: true
  },
  to_address: {
    type: String,
    required: true
  },
  to_location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  }
})
const Package = Mongoose.model('Package', PackageSchema)
module.exports = Package
