const express = require('express')
const { getPackages, addPackage, updatePackage, getonePackage, deletepackage } = require('../controllers/package')
const { verifyAdmin, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/package').get(auth, verifyAdmin, getPackages)
router.route('/package/:id').get(auth, getonePackage).put(auth, updatePackage).delete(auth, verifyAdmin, deletepackage)
router.route('/package').post(auth, verifyAdmin, addPackage)
module.exports = router
