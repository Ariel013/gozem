const express = require('express')
const { getPackages, addPackage, updatePackage, getonePackage, deletepackage } = require('../controllers/package')
const { verifyRole, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/package').get(getPackages, auth)
router.route('/package/:id').get(getonePackage, verifyRole('user', 'admin'))
router.route('/package').post(addPackage, verifyRole('user', 'admin'))
router.route('/package/:id').put(updatePackage, verifyRole('admin'))
router.route('/package/:id').delete(deletepackage, verifyRole('admin'))
module.exports = router
