const express = require('express')
const router = express.Router()

// Import the controllers
const {
  authControllers: { loginController, logoutController },
} = require('../../../controllers')

router.post('/login', loginController)

router.get('/logout', logoutController)

module.exports = router
