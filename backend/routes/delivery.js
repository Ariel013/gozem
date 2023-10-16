const express = require('express')
const { getDeliveries, addDelivery, getoneDelivery, updateDelivery, deletedelivery } = require('../controllers/delivery')
const { verifyRole } = require('../middlewares/auth')
const router = express.Router()

router.route('/delivery').get(verifyRole(['admin']), getDeliveries)
router.route('/delivery/:id').get(verifyRole(['admin', 'livreur']), getoneDelivery)
router.route('/delivery').post(verifyRole(['admin']), addDelivery)
router.route('/delivery/:id').put(verifyRole(['admin']), updateDelivery)
router.route('/delivery/:id').delete(verifyRole(['admin']), deletedelivery)
module.exports = router
