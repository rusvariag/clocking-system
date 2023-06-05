const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')

const generateHashedPassword = async () => {
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(process.env.SUPER_PASSWORD, salt)
    return hashedPassword
  } catch (error) {
    console.error('Error generating hashed password:', error)
  }
}

const executeQuery = async (conn, query) => {
  try {
    const results = await conn.query(query)
    console.log('Query executed successfully:', query)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

const executeQueries = async (conn, queries) => {
  for (const query of queries) {
    try {
      await executeQuery(conn, query)
    } catch (error) {
      console.error('Error executing queries:', error)
    }
  }
}

const initDatabase = async () => {
  let conn

  try {
    // Create a connection without specifying a database
    conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    })

    // Check if the database exists and if not, create it
    await executeQuery(
      conn,
      `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
    )

    conn.end()

    return mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
  } catch (error) {
    console.error('Error initializing database:', error)
    if (conn) conn.end()
    throw error
  }
}

const main = async () => {
  const pool = await initDatabase()
  const hashedPassword = await generateHashedPassword()

  const queries = [
    `USE ${process.env.MYSQL_DATABASE}`,
    // Check if the table Employees exists and create it if necessary
    `
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      social_number CHAR(9) NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL
    )
    `,
    // Check if the table Shifts exists and create it if necessary
    `
    CREATE TABLE IF NOT EXISTS shifts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT,
      clock_in_time TIMESTAMP NULL,
      clock_out_time TIMESTAMP NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
    `,
    // Check if the Record admin exists and create it if necessary
    `
    INSERT INTO employees (social_number, name, password, role)
    SELECT ${process.env.SUPER_SOCIAL_NUMBER}, '${process.env.SUPER_USER}', '${hashedPassword}', 'admin'
    WHERE NOT EXISTS (
      SELECT * FROM employees WHERE social_number = ${process.env.SUPER_SOCIAL_NUMBER}
    )
    `,
  ]

  executeQueries(pool, queries)
}

main()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

module.exports = pool
