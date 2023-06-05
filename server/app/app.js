// Import necessary modules
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const cookieParser = require('cookie-parser')
const cors = require('cors')

// Import custom middleware functions and routes
const authMiddleware = require('./middlewares/auth.middleware')
const authRoutes = require('./routes')

// Create Express app instance
const app = express()

// Use security middlewares
app.use(cors())

// Parse incoming JSON payloads and cookies
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// Use authentication middleware for all routes
app.use('/api/v1', authMiddleware)

// Use routes
app.use('/', authRoutes)

// Configure view engine and static file directory)
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: './public' })
})

module.exports = app
