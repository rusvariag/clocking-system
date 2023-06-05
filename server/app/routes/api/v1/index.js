// Import the necessary modules
const express = require('express');

// Import the routes
const authRoutes = require('./auth.routes');
const fileRoutes = require('./clocking.routes');

// Create a new router instance
const router = express.Router();

// Mount the routes on the router instance
router.use('/auth', authRoutes);
router.use('/clocking', fileRoutes);

// Export the router instance as a module
module.exports = router;