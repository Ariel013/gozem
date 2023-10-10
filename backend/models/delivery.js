const Mongoose = require('mongoose')
const DeliverySchema = new Mongoose.Schema({
  package_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    require: true
  },
  pickup_time: {
    type: Date,
    require: true
  },
  start_time: {
    type: Date,
    require: true
  },
  end_time: {
    type: Date,
    require: true
  },
  location: {
    lat: {
      type: Number,
      require: true
    },
    lng: {
      type: Number,
      require: true
    }
  },
  status: {
    type: String,
    enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed']
  },
  created_at: {
    type: Date,
    default: Date.now(),
    require: true
  }
})
const Delivery = Mongoose.model('Delivery', DeliverySchema)
module.exports = Delivery
