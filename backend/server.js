// Import des modules nécessaires
const express = require('express')
const http = require('http')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const cors = require('cors')
const connectDB = require('./config/db')

// Model User
const User = require('./models/user')
const bcrypt = require('bcrypt')

// Import des routes
const authRoute = require('./routes/auth')
const crudUsers = require('./routes/user')
const crudPackages = require('./routes/packages')
const crudDeliveries = require('./routes/delivery')

// Création de l'application Express
const app = express()

// Création du serveur HTTP
const server = http.createServer(app)

// Configure Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Configuration des connexions WebSocket

const io = require('socket.io')(server, {
  cors: {
    origin: `${process.env.FRONT_URL}`,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('Client connecté')

  // Écoute des événements de changement de statut et de localisation
  socket.on('update_status', (data) => {
    io.emit('status_changed', data)
  })

  socket.on('update_location', (locationUpdate) => {
    io.emit('location_changed', locationUpdate)
  })
})

// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config()

const corsOptions = {
  origin: `${process.env.FRONT_URL}`, // Autoriser uniquement ce domaine
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
}

// Création d'un admin au lancement de l'application
const createAdmin = async () => {
  try {
    // Vérifier si il existe déjà un administrateur
    const admin = await User.findOne({ role: 'admin' })

    if (!admin) {
      const mdp = 'Azerty1234'
      const saltRounds = 10
      const pass = await bcrypt.hash(mdp, saltRounds)

      const firstAdmin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: pass,
        phone: 22912345,
        role: 'admin',
        email_verified: true
      })
      await firstAdmin.save()
      console.log('Admin created succesfully')
    }
  } catch (error) {
    console.error('Erreur l\'ors de la création de l\'admin:', error)
  }
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
app.use('/api/users', authRoute)
app.use('/api', crudUsers)
app.use('/api', crudPackages)
app.use('/api', crudDeliveries)

// Gestion des erreurs centralisée
app.use((err, req, res, next) => {
  console.error(`Une erreur est survenue : ${err.message}`)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

createAdmin()
module.exports = app
