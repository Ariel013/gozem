// Import des modules nécessaires
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const cors = require('cors')
const connectDB = require('./config/db')

// Import des routes
const authRoute = require('./routes/auth')
const crudUsers = require('./routes/user')
const crudPackages = require('./routes/packages')
const crudDeliveries = require('./routes/delivery')

// Création de l'application Express
const app = express()

// Création du serveur HTTP
const server = http.createServer(app)

// Configuration des connexions WebSocket
const wss = new WebSocket.Server({ server })

// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config()

// Middleware pour gérer les CORS
app.use(cors())

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json())

// Port sur lequel le serveur écoutera
const PORT = process.env.PORT

// Démarrage du serveur HTTP
server.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)

// Connexion à la base de données
connectDB()

// Gestion des erreurs non gérées
process.on('unhandledRejection', (err) => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

// Gestionnaires d'événements WebSocket
wss.on('connection', (ws) => {
  console.log('New WebSocket Connection Established.')

  // Gestionnaire pour les messages WebSocket entrants
  ws.on('message', (message) => {
    console.log('WebSocket Message Received:', message)
    // Handle the WebSocket message here
  })
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
