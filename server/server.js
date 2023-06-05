const app = require('./app/app.js')
const PORT = process.env.PORT || 3000

const requiredEnvVars = [
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
  'SUPER_USER',
  'SUPER_PASSWORD',
  'JWT_SECRET',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Required environment variable ${envVar} is missing`)
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
