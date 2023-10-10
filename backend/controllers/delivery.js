const Delivery = require('../models/delivery')
const Package = require('../models/package')

// Create a new delivery
exports.addDelivery = async (req, res) => {
  const delivery = req.body

  // Validation de la requete

  if (!delivery.pickup_time || !delivery.start_time || !delivery.end_time || !delivery.location) {
    return res.status(500).json({ message: 'All fields are required to add a delivery' })
  } else {
    try {
      // Verifier si le package existe
      const packageId = delivery.package_id
      const existingPackage = await Package.findOne({ _id: packageId })

      if (!existingPackage) {
        return res.status(404).json({ message: 'Le package n\'a pas été trouvé' })
      }
      // Création du delivery
      delivery.status = 'open'
      await Delivery.create(delivery)
      return res.status(201).json({ message: 'Delivery created successfully' })
    } catch (error) {
      console.error('Erreur lors de la création de la livraison', error)
      res.status(500).json({
        message: 'Delivery not created successfully',
        error: error.message
      })
    }
  }
}

// Update Delivery
exports.updateDelivery = async (req, res) => {
  const delivery = req.body
  const deliveryId = req.params.id

  try {
    const deliveryToUpdate = await Delivery.findById(deliveryId)

    if (!deliveryToUpdate) {
      return res.status(404).json({ error: 'Livraison non trouvé' })
    }

    // Mise à jour des informations de la livraison seulement si elles sont renseignées dans la requête
    if (delivery.pickup_time) {
      deliveryToUpdate.pickup_time = delivery.pickup_time
    }
    if (delivery.start_time) {
      deliveryToUpdate.start_time = delivery.start_time
    }
    if (delivery.end_time) {
      deliveryToUpdate.end_time = delivery.end_time
    }
    if (delivery.location) {
      deliveryToUpdate.location = delivery.location
    }

    await deliveryToUpdate.save()
    return res.status(200).json({ message: 'Informations de la livraison mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la livraison', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la livraison' })
  }
}

// Delete Delivery
exports.deletedelivery = async (req, res) => {
  try {
    const deliveryId = req.params.id

    // Recherche de la livraison correspondante
    const delivery = await Delivery.findById(deliveryId)
    // console.log(delivery)
    if (!delivery) {
      return res.status(404).json({ error: 'Livraison non trouvé' })
    }

    // Suppression du package
    await Delivery.deleteOne({ _id: deliveryId })
    return res.status(200).json({ message: 'Livraison supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la livraison', error)
    res.status(500).json({ error: 'Erreur lors de la suppression de la livraison' })
  }
}

// Get all Deliveries
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
    return res.status(200).json(deliveries)
  } catch (error) {
    console.error('Erreur lors de la récupération des delivery', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des delivery' })
  }
}

// Get one Delivery by his id
exports.getoneDelivery = async (req, res) => {
  try {
    const deliveryId = req.params.id

    // Recherche du delivery correspondant
    const delivery = await Delivery.findById(deliveryId)
    if (!delivery) {
      return res.status(404).json({ error: 'Livraison non trouvé' })
    }
    res.json(delivery)
  } catch (error) {
    console.error('Erreur lors de la récupération des livraisons', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des livraisons' })
  }
}
