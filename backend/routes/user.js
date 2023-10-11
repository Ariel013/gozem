const express = require('express')
const { getUsers, getAdmins, deactivate, updateUser, getOneUser, deleteuser, getOneAdmin, makeAdmin } = require('../controllers/user')

const router = express.Router()

router.route('/getusers').get(getUsers)
router.route('/getadmins').get(getAdmins)
router.route('/deactivateaccount/:id').post(deactivate)
router.route('/updateuser/:id').put(updateUser)
router.route('/getoneuser/:id').get(getOneUser)
router.route('/deleteuser/:id').delete(deleteuser)
router.route('/getoneadmin/:id').get(getOneAdmin)
router.route('/makeadmin/:id').post(makeAdmin)
module.exports = router
