const User = require('../../models/user')
// const Package = require('../models/package')
// const Delivery = require('../models/delivery')
const { generateConfirmationToken } = require('./passwordUtils')
const { sendMail } = require('./sendMail')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const emailRegex = /^[a-zA-Z0-9_\-.]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
const regex = /^[a-zA-Z]+(?: [a-zA-Z ]+){0,29}$/
const tokenKey = process.env.jwtKey
const saltRounds = 10
let nameUser = ''
let emailUser = ''
let newUser = ''

// Register
exports.register = async (req, res, next) => {
  const user = req.body

  // Control of fields
  if (!user.name || !user.email || !user.phone || !user.password || !user.role) {
    return res.status(400).json({ message: 'All fields are required to register' })
  } else if (!emailRegex.test(user.email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  } else if (!regex.test(user.name)) {
    return res.status(400).json({ message: 'Invalid username format' })
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

// Login
exports.login = async (req, res, next) => {
  const requestUser = req.body

  if (requestUser.password.lenght < 8) {
    return res.status(400).json({ message: 'Mot de passe incorrect' })
  } else if (requestUser.name === '' || requestUser.email === '' || requestUser.password === '') {
    return res.status(400).json({ message: 'All fields are required' })
  } else {
    try {
      const user = await User.findOne({
        $or: [
          { email: requestUser.email },
          { name: requestUser.name }
        ]
      })

      if (user) {
        //  Comparaison des mots de passe
        const comparaison = await bcrypt.compare(requestUser.password, user.password)

        // Generation du token
        if (comparaison === true) {
          if (user.email_verified === true && user.is_active === true) {
            const token = jwt.sign({ userId: user.id, role: user.role }, tokenKey, { expiresIn: '24h' })
            return res.status(200).json({
              message: 'Connexion réussie',
              token,
              role: user.role,
              name: user.name,
              email: user.email
            })
          } else if (user.email_verified === false) {
            return res.status(401).json({ message: 'Email not verified' })
          } else if (user.is_active === false) {
            return res.status(401).json({ message: 'Account is deactivate. Please contact the admin' })
          } else {
            return res.status(401).json({ message: 'You are not authorized to login' })
          }
        } else {
          res.status(401).json({ message: 'Wrong password! Please enter valid password' })
        }
      } else {
        return res.status(400).json({ message: 'Wrong informations' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'user not catch', error: error.message })
    }
  }
}

// Get user Role
exports.getRole = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: ' you are Unauthorized' })
  }

  // Verification du token et extraction des informations
  // console.log(token)
  jwt.verify(token, tokenKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: ' hello Unauthorized' })
    }

    // Extraction du role avec decoded et envoie
    const userRole = decoded.role
    res.json({ role: userRole })
  })
}
