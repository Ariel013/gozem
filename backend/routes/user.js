const express = require('express')
const { getUsers, getAdmins, deactivate, updateUser, getOneUser, deleteuser, getOneAdmin, makeAdmin } = require('../controllers/user')
const { verifyRole, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/users').get(getUsers, auth)
router.route('/users/admins').get(getAdmins, verifyRole('admin'))
router.route('/users/deactivateaccount/:id').post(deactivate, verifyRole('admin'))
router.route('/updateuser/:id').put(updateUser, verifyRole('admin'))
router.route('/users/:id').get(getOneUser, verifyRole('admin'))
router.route('/users/:id').delete(deleteuser, verifyRole('admin'))
router.route('/users/admin/:id').get(getOneAdmin, verifyRole('admin'))
router.route('/users/makeadmin/:id').post(makeAdmin, verifyRole('admin'))
module.exports = router
