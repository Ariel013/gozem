// Import des modules nécessaires
const express = require('express')
const http = require('http')
// const socketIo = require('socket.io')

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

// const io = socketIo(server)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('Client connecté')

  // Écoute des événements de changement de statut et de localisation
  socket.on('update_status', (data) => {
    // Mettez à jour le statut en base de données avec data.delivery_id et data.newStatus
    // Diffusez ensuite le changement de statut à tous les clients connectés
    io.emit('status_changed', data)
  })

  socket.on('update_location', (locationUpdate) => {
    // Mettez à jour la localisation en base de données avec data.delivery_id et data.location
    // Diffusez ensuite la mise à jour de la localisation à tous les clients connectés
    io.emit('location_changed', locationUpdate)
  })
})

// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config()

const corsOptions = {
  origin: 'http://localhost:4200', // Autoriser uniquement ce domaine
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
}

// Middleware pour gérer les CORS
app.use(cors(corsOptions))

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
