const express = require('express')
const { register, login } = require('../controllers/auth/auth')
const { confirmationEmail } = require('../controllers/auth/confirmation')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/confirm/:token').get(confirmationEmail)

module.exports = router
