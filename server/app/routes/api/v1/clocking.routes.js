const express = require('express')
const router = express.Router()

// Import the controllers
const {
  clockingControllers: {
    indexController,
    clockinController,
    clockoutController,
  },
} = require('../../../controllers')

router.get('/', indexController)

router.post('/in', clockinController)

router.post('/out', clockoutController)

module.exports = router
