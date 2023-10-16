const express = require('express')
const { getUsers, getAdmins, deactivate, updateUser, getOneUser, deleteuser, getOneAdmin, makeAdmin } = require('../controllers/user')
const { verifyAdmin } = require('../middlewares/auth')
const router = express.Router()

router.route('/users').get(verifyAdmin, getUsers)
router.route('/users/admins').get(verifyAdmin, getAdmins)
router.route('/users/deactivateaccount/:id').post(verifyAdmin, deactivate)
router.route('/users/:id').put(verifyAdmin, updateUser).get(verifyAdmin, getOneUser).delete(verifyAdmin, deleteuser)
router.route('/users/admin/:id').get(verifyAdmin, getOneAdmin)
router.route('/users/makeadmin/:id').post(verifyAdmin, makeAdmin)
module.exports = router
