const User = require('../models/user')
const bcrypt = require('bcrypt')

const saltRounds = 10

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10

    // Calcule de l'indice de départ
    const startIndex = (page - 1) * perPage

    // Requete vers la BD pour récupérer les utilisateurs avec role user et livreur
    const users = await User.find({ $or: [{ role: 'user' }, { role: 'livreur' }] })
      .skip(startIndex)
      .limit(perPage)
      .exec()

    // Recupération du nombre total d'utilisateurs
    // const totalUser = await User.countDocuments({ $or: [{ role: 'user' }, { role: 'livreur' }] })

    // Retour des données paginées
    return res.status(200).json({
      users
      // currentPage: page,
      // totalPages: Math.ceil(totalUser / perPage),
      // totalItems: totalUser
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
}

// Get All Admin
exports.getAdmins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10

    // Calcule de l'indice de départ
    const startIndex = (page - 1) * perPage

    // Requete vers la BD pour récupérer les utilisateurs avec role à user ou livreur
    const users = await User.find({ role: 'admin' })
      .skip(startIndex)
      .limit(perPage)
      .exec()

    // Recupération du nombre total d'utilisateurs
    const totalUser = await User.countDocuments({ role: 'admin' })

    // Retour des données paginées
    res.status(200).json({
      data: users,
      currentPage: page,
      totalPages: Math.ceil(totalUser / perPage),
      totalItems: totalUser
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
}

// Deactivate Account
exports.deactivate = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findOne({ _id: id })

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' })
    }

    // Verifons si l'utilisateur est admin
    if (user.is_active === false) {
      user.is_active = true
      await user.save()
      return res.status(200).json({ message: 'Compte réactivé avec succès' })
    } else if (user.is_active === true) {
      user.is_active = false
      await user.save()
      return res.status(200).json({ message: 'Compte désactivé avec succès' })
    }
  } catch (error) {
    console.error('Erreur lors de la désactivation du compte:', error)
    res.status(500).json({ error: 'Erreur lors de la désactivation du compte' })
  }
}

// Update User Profile
exports.updateUser = async (req, res) => {
  const user = req.body
  const userId = req.params.id

  try {
    const userToUpdate = await User.findById(userId)

    if (!userToUpdate) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Mise à jour des informations de l'utilisateur
    if (user.name) {
      userToUpdate.name = user.name
    }
    if (user.email) {
      userToUpdate.email = user.email
    }
    if (user.phone) {
      userToUpdate.phone = user.phone
    }
    if (user.role) {
      userToUpdate.role = user.role
    }

    if (user.password) {
      const passwordMOd = user.password

      const hashedPassword = await bcrypt.hash(passwordMOd, saltRounds)
      userToUpdate.password = hashedPassword
    }
    await userToUpdate.save()
    res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil utilisateur' })
  }
}

// Get One User

exports.getOneUser = async (req, res) => {
  try {
    const userId = req.params.id

    // Recherche de l'utilisateur correspondant
    const user = await User.findOne({ _id: userId, $or: [{ role: 'user' }, { role: 'livreur' }] })
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    res.json(user)
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur', error)
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur spécifié' })
  }
}

// Delete User
exports.deleteuser = async (req, res) => {
  try {
    const userId = req.params.id

    // Recherche de l'utilisateur correspondant
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Suppression de l'utilisateur
    await User.deleteOne({ _id: userId })
    return res.status(200).json({ message: 'Utilisateur supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur', error)
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' })
  }
}

// Get One Admin

exports.getOneAdmin = async (req, res) => {
  try {
    const userId = req.params.id

    // Recherche de l'admin correspondant
    const user = await User.findOne({ _id: userId, role: 'admin' })
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    res.json(user)
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur', error)
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur spécifié' })
  }
}

// Make A user an Admin

exports.makeAdmin = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Faire Admin
    user.role = 'admin'
    await user.save()
    res.status(200).json({ message: 'Utilisateur est maintenant un administrateur' })
  } catch (error) {
    console.error('Erreur lors du changement du statut de l\'utilisateur spécifié', error)
    res.status(500).json({ error: 'Erreur lors du changement du statut de l\'utilisateur spécifié' })
  }
}
