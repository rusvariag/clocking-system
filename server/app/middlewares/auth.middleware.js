const jwt = require('jsonwebtoken')
const Employee = require('../models/employee.model')

async function authMiddleware(req, res, next) {
  try {
    // Extract the JWT token from the cookie
    const token = req.headers.authorization

    // Allow access to /login route without a token
    if (['/auth/login', '/clocking/in', '/clocking/out'].includes(req.path)) {
      return next()
    }

    if (!token) {
      // If no token is found, return a 401 Unauthorized response
      return res.status(401).send('Unauthorized')
    }

    // Verify the token using the JWT secret
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

    // Look up the user in the database by ID
    const user = await Employee.findBySocialNumber(decodedToken.socialId)

    if (!user) {
      // If the user doesn't exist, return a 401 Unauthorized response
      throw new Error('User not found')
    }

    // Attach the user object to the request for use in subsequent middleware functions
    req.user = user

    // Call the next middleware function in the chain
    next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = authMiddleware
