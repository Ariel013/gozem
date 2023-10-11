const express = require('express')
const router = express.Router()
const { sendLocationChangedEvent } = require('../controllers/websocket-event')

module.exports = (wss) => {
  router.put('/update-location', (req, res) => {
    // Récupération des données de la demande
    const { deliveryId, location } = req.body

    // Envoie l'événement grace à la fonction
    sendLocationChangedEvent(wss, deliveryId, location)

    res.status(200).json({ message: 'Localisation mise à jour avec succès' })
  })

  return router
}
