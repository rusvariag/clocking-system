const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Employee = require('../../models/employee.model')

exports.loginController = async (req, res, next) => {
  // Extract the social number and password from the request body
  const { social_number, password } = req.body

  try {
    // Find the user in the database by social number
    const user = await Employee.findBySocialNumber(social_number)

    // If the user doesn't exist, return a 401 Unauthorized response
    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid social number or password' })
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)

    // If the passwords don't match, return a 401 Unauthorized response
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid social number or password' })
    }

    // Generate a JWT token with the user ID as the payload
    const token = jwt.sign(
      { socialId: user.social_number },
      process.env.JWT_SECRET
    )

    res.status(200).json({ token })
  } catch (err) {
    // If there's an error, pass it to the next middleware function
    next(err)
  }
}

exports.logoutController = (req, res, next) => {
  // Clear the JWT cookie to log the user out
  res.clearCookie('jwt')

  res.status(200).json({ message: 'Logout successful' })
}
