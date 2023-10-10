const express = require('express')
const { getPackages, addPackage, updatePackage, getonePackage, deletepackage } = require('../controllers/package')
const router = express.Router()

router.route('/getpackages').get(getPackages)
router.route('/getonePackage/:id').get(getonePackage)
router.route('/addpackage').post(addPackage)
router.route('/updatepackage/:id').put(updatePackage)
router.route('/deletepackage/:id').delete(deletepackage)
module.exports = router
