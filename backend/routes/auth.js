const express = require('express')
const { register, login, getRole } = require('../controllers/auth/auth')
const { confirmationEmail } = require('../controllers/auth/confirmation')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/confirm/:token').get(confirmationEmail)
router.route('/role').get(getRole)

module.exports = router
