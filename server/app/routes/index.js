// Import the necessary modules
const express = require('express')

// Import the routes
const apiRoutes = require('./api/v1')

// Create a new router instance
const router = express.Router()

// Mount the routes on the router instance
router.use('/api/v1/', apiRoutes)

// Export the router instance as a module
module.exports = router
