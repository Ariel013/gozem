const Package = require('../models/package')
// const Delivery = require('../models/delivery')

// let newPack = ''

// Create a new package
exports.addPackage = async (req, res) => {
  const pack = {
    description: req.body.description,
    weight: req.body.weight,
    width: req.body.width,
    height: req.body.height,
    depth: req.body.depth,
    from_name: req.body.from_name,
    from_address: req.body.from_address,
    from_location: {
      lat: req.body.from_lat,
      lng: req.body.from_lng
    },
    to_name: req.body.to_name,
    to_address: req.body.to_address,
    to_location: {
      lat: req.body.to_lat,
      lng: req.body.to_lng
    }
  }

  // Validation de la requete

  if (!pack.description || !pack.weight || !pack.width || !pack.height || !pack.depth || !pack.from_name || !pack.from_address || !pack.from_location || !pack.to_name || !pack.to_address || !pack.to_location) {
    return res.status(500).json({ message: 'All fields are required to add a package' })
  } else {
    try {
      // Création du package
      await Package.create(pack)
      return res.status(201).json({ message: 'Package created successfully' })
    } catch (error) {
      console.error('Erreur lors de la création du package', error)
      res.status(500).json({
        message: 'Package not created successfully',
        error: error.message
      })
    }
  }
}

// Update Package
exports.updatePackage = async (req, res) => {
  const packUpdates = req.body
  const packId = req.params.id

  try {
    const packToUpdate = await Package.findById(packId)

    if (!packToUpdate) {
      return res.status(404).json({ error: 'Package non trouvé' })
    }

    // Mise à jour des informations du package seulement si elles sont renseignées dans la requête
    if (packUpdates.description) {
      packToUpdate.description = packUpdates.description
    }
    if (packUpdates.active_delivery_id) {
      packToUpdate.active_delivery_id = packUpdates.active_delivery_id
    }
    if (packUpdates.weight) {
      packToUpdate.weight = packUpdates.weight
    }
    if (packUpdates.width) {
      packToUpdate.width = packUpdates.width
    }
    if (packUpdates.height) {
      packToUpdate.height = packUpdates.height
    }
    if (packUpdates.depth) {
      packToUpdate.depth = packUpdates.depth
    }
    if (packUpdates.from_name) {
      packToUpdate.from_name = packUpdates.from_name
    }
    if (packUpdates.from_address) {
      packToUpdate.from_address = packUpdates.from_address
    }
    if (packUpdates.from_location) {
      packToUpdate.from_location = packUpdates.from_location
    }
    if (packUpdates.to_name) {
      packToUpdate.to_name = packUpdates.to_name
    }
    if (packUpdates.to_address) {
      packToUpdate.to_address = packUpdates.to_address
    }
    if (packUpdates.to_location) {
      packToUpdate.to_location = packUpdates.to_location
    }

    await packToUpdate.save()
    return res.status(200).json({ message: 'Informations du package mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du package', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour du package' })
  }
}

// Delete Package
exports.deletepackage = async (req, res) => {
  try {
    const packageId = req.params.id

    // Recherche du package correspondant
    const pack = await Package.findById(packageId)
    // console.log(pack)
    if (!pack) {
      return res.status(404).json({ error: 'Package non trouvé' })
    }

    // Suppression du package
    await Package.deleteOne({ _id: packageId })
    return res.status(200).json({ message: 'Package supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du package', error)
    res.status(500).json({ error: 'Erreur lors de la suppression du package' })
  }
}

// Get on Package by his id
exports.getonePackage = async (req, res) => {
  try {
    const packageId = req.params.id

    // Recherche du package correspondant
    const pack = await Package.findById(packageId)
    if (!pack) {
      return res.status(404).json({ error: 'Package non trouvé' })
    }
    res.json(pack)
  } catch (error) {
    console.error('Erreur lors de la récupération des packages', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des packages' })
  }
}

// Get all Packages
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find()
    return res.status(200).json(packages)
  } catch (error) {
    console.error('Erreur lors de la récupération des packages', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des packages' })
  }
}
