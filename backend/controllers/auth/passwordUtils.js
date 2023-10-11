function generateConfirmationToken () {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const stringLength = 32

  let token = ''
  for (let i = 0; i < stringLength; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }

  return token
}
module.exports = {
  generateConfirmationToken
}
