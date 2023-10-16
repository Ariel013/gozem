const express = require('express')
const { getPackages, addPackage, updatePackage, getonePackage, deletepackage } = require('../controllers/package')
const { verifyRole } = require('../middlewares/auth')
const router = express.Router()

router.route('/package').get(verifyRole(['admin']), getPackages)
router.route('/package/:id').get(verifyRole(['admin', 'user']), getonePackage)
router.route('/package').post(verifyRole(['admin']), addPackage)
router.route('/package/:id').put(verifyRole(['admin']), updatePackage)
router.route('/package/:id').delete(verifyRole(['admin']), deletepackage)
module.exports = router
