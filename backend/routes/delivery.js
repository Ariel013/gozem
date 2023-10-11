const express = require('express')
const { getDeliveries, addDelivery, getoneDelivery, updateDelivery, deletedelivery } = require('../controllers/delivery')
const router = express.Router()

router.route('/delivery').get(getDeliveries)
router.route('/delivery/:id').get(getoneDelivery)
router.route('/delivery').post(addDelivery)
router.route('/delivery/:id').put(updateDelivery)
router.route('/delivery/:id').delete(deletedelivery)
module.exports = router
