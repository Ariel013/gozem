const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtkey = process.env.jwtkey
const User = require('../models/user')

// User
exports.verifyRole = (role) => async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodedToken = jwt.verify(token, jwtkey)
            if (decodedToken) {
                if (decodedToken.role === role) {
                    const user = await User.findOne({ _id: decodedToken.userId })
                    req.auth = {
                        id: decodedToken.userId,
                    }
                    next()
                } else {
                    return res.status(400).json({ message: 'Unauthorized' })
                }
            } else {
                return res.status(401).json({ message: 'unauthorized' })
            }
        } catch (error) {
            res.status(401).json({ message: 'Error', error: error.message })
        }
    } else {
        return res.status(401).json({ message: 'unauthorized' })
    }
}

// For Auth
exports.auth = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, jwtkey)
      if (decodedToken) {
        next()
      } else {
        return res.status(401).json({ message: 'unauthorized' })
      }
    } catch (error) {
      res.status(401).json({ message: 'Error', error: error.message })
    }
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}