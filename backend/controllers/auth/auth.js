const User = require('../../models/user')
// const Package = require('../models/package')
// const Delivery = require('../models/delivery')
const { generateConfirmationToken } = require('./passwordUtils')
const { sendMail } = require('./sendMail')

const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

require('dotenv').config()

const emailRegex = /^[a-zA-Z0-9_\-.]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
const regex = /^[a-zA-Z]+(?: [a-zA-Z ]+){0,29}$/
const saltRounds = 10
let newUser = ''
let nameUser = ''
let emailUser = ''

// Register
exports.register = async (req, res, next) => {
  const user = req.body

  // Control of fields
  if (!user.name || !user.email || !user.phone || !user.password) {
    return res.status(500).json({ message: 'All fields are required to register' })
  } else if (!emailRegex.test(user.email)) {
    return res.status(500).json({ message: 'Invalid email format' })
  } else if (!regex.test(user.name)) {
    return res.status(500).json({ message: 'Invalid username format' })
  } else {
    try {
      nameUser = await User.findOne({ name: user.name })
      emailUser = await User.findOne({ email: user.email })

      if (nameUser) {
        return res.status(500).json({ message: 'Please change username, this name is already used' })
      }
      if (emailUser) {
        return res.status(500).json({ message: 'Please change email, this email is already use' })
      }

      // Générationdu token de confirmation
      const tokConfirm = generateConfirmationToken()

      // Hashage du mot de passe
      const motPasse = user.password
      const hashed = await bcrypt.hash(motPasse, saltRounds)
      user.password = hashed
      user.confirmation_token = tokConfirm

      // creation de l'utilisateur
      try {
        newUser = await User.create(user)
      } catch (error) {
        return res.status(500).json({
          message: 'User not created successfully',
          error: error.message
        })
      }

      const confirmationLink = `${process.env.BACK_URL}/api/auth/confirm/${tokConfirm}`
      // Envoie de mail de confirmation
      const emailData = {
        from: 'sodjinoukevin13@gmail.com',
        to: user.email,
        subject: 'Confirmation de compte',
        html: `
        <html>
        <head>
          <style>
            /* Styles pour la mise en forme */
            .container {
              width: 100%;
              max-width: 400px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              font-family: Arial, sans-serif;
            }
  
            h1 {
              font-size: 24px;
              color: #333;
            }
  
            p {
              font-size: 16px;
              color: #555;
            }
  
            ul {
              list-style-type: disc;
              margin-left: 20px;
            }
  
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #5C5D62;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
  
            a:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Merci de vous être inscrit sur notre site</h1>
            <p>Veuillez s'il-vous-plait activer votre compte en cliquant sur le lien suivant:</p>
            <a href="${confirmationLink}">Confirmer votre compte</a>
          </div>
        </body>
      </html>`
      }
      sendMail(emailData)
      res.status(201).json({ message: 'User created successfully', newUser })
    } catch (error) {
      res.status(500).json({
        message: 'Something wrong',
        error: error.message
      })
    }
  }
}
