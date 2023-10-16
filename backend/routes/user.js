const express = require('express')
const { getUsers, getAdmins, deactivate, updateUser, getOneUser, deleteuser, getOneAdmin, makeAdmin } = require('../controllers/user')
const { verifyRole, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/getusers').get(getUsers, auth)
router.route('/getadmins').get(getAdmins, verifyRole('admin'))
router.route('/deactivateaccount/:id').post(deactivate, verifyRole('admin'))
router.route('/updateuser/:id').put(updateUser, verifyRole('admin'))
router.route('/getoneuser/:id').get(getOneUser, verifyRole('admin'))
router.route('/deleteuser/:id').delete(deleteuser, verifyRole('admin'))
router.route('/getoneadmin/:id').get(getOneAdmin, verifyRole('admin'))
router.route('/makeadmin/:id').post(makeAdmin, verifyRole('admin'))
module.exports = router
