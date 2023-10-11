const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoute = require('./routes/auth')
const crudUsers = require('./routes/user')
const crudPackages = require('./routes/packages')
const crudDeliveries = require('./routes/delivery')

const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

// Connecting server
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)

// Connecting the Database
connectDB()

// Handling Error
process.on('unhandledRejection', (err) => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

// Routes
app.use('/api/auth', authRoute)
app.use('/api/users', crudUsers)
app.use('/api', crudPackages)
app.use('/api', crudDeliveries)

// Gestion des erreurs centralisée
app.use((err, req, res, next) => {
  console.error(`Une erreur est survenue : ${err.message}`)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

module.exports = app
