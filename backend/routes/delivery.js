const express = require('express')
const { getDeliveries, addDelivery, getoneDelivery, updateDelivery, deletedelivery } = require('../controllers/delivery')
const { verifyRole, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/delivery').get(getDeliveries, auth)
router.route('/delivery/:id').get(getoneDelivery, verifyRole('livreur', 'admin'))
router.route('/delivery').post(addDelivery, verifyRole('admin'))
router.route('/delivery/:id').put(updateDelivery, verifyRole('admin'))
router.route('/delivery/:id').delete(deletedelivery, verifyRole('admin'))
module.exports = router
