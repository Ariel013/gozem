const nodemailer = require('nodemailer')

exports.sendMail = async (data) => {
  const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sodjinoukevin13@gmail.com',
      pass: 'dsavkrrphrhcmnfd'
    }
  }

  const transporter = nodemailer.createTransport(config)
  try {
    const info = await transporter.sendMail(data)
    return info.response
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', err)
    throw err
  }
}
