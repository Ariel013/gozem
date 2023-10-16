const express = require('express')
const { getDeliveries, addDelivery, getoneDelivery, updateDelivery, deletedelivery } = require('../controllers/delivery')
const { verifyAdmin, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/delivery').get(auth, verifyAdmin, getDeliveries)
router.route('/delivery/:id').get(auth, getoneDelivery).put(auth, updateDelivery).delete(auth, verifyAdmin, deletedelivery)
router.route('/delivery').post(auth, verifyAdmin, addDelivery)
module.exports = router
