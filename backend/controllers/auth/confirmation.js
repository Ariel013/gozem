const User = require('../../models/user')

exports.confirmationEmail = async (req, res) => {
  const { token } = req.params

  try {
    const user = await User.findOne({ confirmation_token: token })

    if (user) {
      user.email_verified = true
      user.confirmation_token = null
      await user.save()
      // Rediriger l'utilisateur vers une page de confirmation réussie ou envoyez une réponse JSON A faire!!!!!!!!!!!!!!!!!!!!!!!
      // res.status(200).json({ message: 'Email utilisateur confirmé avec succès.' })
      res.redirect(`${process.env.FRONT_URL}/login`)
    } else {
      return res.status(400).json({ message: 'Jeton de confirmation invalide.' })
    }
  } catch (error) {
    console.error('Erreur lors de la confirmation de l\'email:', error)
    res.status(500).json({ message: 'Erreur lors de la confirmation de l\'email.' })
  }
}
