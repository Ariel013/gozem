const express = require('express')
const { getPackages, addPackage, updatePackage, getonePackage, deletepackage } = require('../controllers/package')
const router = express.Router()

router.route('/package').get(getPackages)
router.route('/package/:id').get(getonePackage)
router.route('/package').post(addPackage)
router.route('/package/:id').put(updatePackage)
router.route('/package/:id').delete(deletepackage)
module.exports = router
