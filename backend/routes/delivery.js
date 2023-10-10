const express = require('express')
const { getDeliveries, addDelivery, getoneDelivery, updateDelivery, deletedelivery } = require('../controllers/delivery')
const router = express.Router()

router.route('/getdeliveries').get(getDeliveries)
router.route('/getoneDelivery/:id').get(getoneDelivery)
router.route('/adddelivery').post(addDelivery)
router.route('/updatedelivery/:id').put(updateDelivery)
router.route('/deletedelivery/:id').delete(deletedelivery)
module.exports = router
