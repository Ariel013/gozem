const express = require('express')
const { getUsers, getAdmins, deactivate, updateUser, getOneUser, deleteuser, getOneAdmin, makeAdmin } = require('../controllers/user')
const { verifyRole } = require('../middlewares/auth')
const router = express.Router()

router.route('/users').get(verifyRole(['admin']), getUsers)
router.route('/users/admins').get(verifyRole('admin'), getAdmins)
router.route('/users/deactivateaccount/:id').post(verifyRole('admin'), deactivate)
router.route('/users/:id').put(verifyRole('admin'), updateUser)
router.route('/users/:id').get(verifyRole('admin'), getOneUser)
router.route('/users/:id').delete(verifyRole('admin'), deleteuser)
router.route('/users/admin/:id').get(verifyRole('admin'), getOneAdmin)
router.route('/users/makeadmin/:id').post(verifyRole('admin'), makeAdmin)
module.exports = router
