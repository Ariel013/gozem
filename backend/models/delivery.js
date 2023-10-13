const Mongoose = require('mongoose')
const DeliverySchema = new Mongoose.Schema({
  package_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Package'
    // required: true
  },
  pickup_time: {
    type: Date
    // required: true
  },
  start_time: {
    type: Date
    // required: true
  },
  end_time: {
    type: Date
    // required: true
  },
  location: {
    lat: {
      type: Number
      // required: true
    },
    lng: {
      type: Number
      // required: true
    }
  },
  status: {
    type: String,
    enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed']
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  }
})
const Delivery = Mongoose.model('Delivery', DeliverySchema)
module.exports = Delivery
