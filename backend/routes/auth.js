const express = require('express')
const { register } = require('../controllers/auth/auth')
const { confirmationEmail } = require('../controllers/auth/confirmation')

const router = express.Router()

router.route('/register').post(register)
router.route('/confirm/:token').get(confirmationEmail)

module.exports = router
