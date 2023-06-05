const pool = require('../database')

function sqlOperation(operator) {
  switch (operator) {
    case 'eq':
      return '='
    case 'gte':
      return '=>'
    case 'gt':
      return '>'
    case 'lte':
      return '=<'
    case 'lt':
      return '<'
    default:
      return '='
  }
}

const Employee = {
  // Function to find an employee by social number
  findBySocialNumber: async (socialNumber) => {
    try {
      const query = 'SELECT * FROM employees WHERE social_number = ?'
      const [results] = await pool.query(query, [socialNumber])
      return results[0]
    } catch (error) {
      throw error
    }
  },

  // Retrieve employees based on filter and sort criteria
  find: async (filters, sorters, limit, startIndex) => {
    try {
      // Build the sort object based on the _sort parameter
      const sort = {}
      if (sorters) {
        const sortFields = sorters.split(',')
        sortFields.forEach((field) => {
          const [fieldName, direction] = field.split('.')
          sort[fieldName] = direction
        })
      } else {
        sort['id'] = 'asc'
      }
      const order = Object.entries(sort)
        .map(([key, value]) => `${key} ${value}`)
        .join(', ')

      const query =
        'SELECT shifts.*, employees.name, employees.role, employees.social_number FROM employees JOIN shifts on employees.id = shifts.employee_id WHERE '
      const conditions = []
      const params = []

      Object.entries(filters).forEach(([key, value]) => {
        const [field, action] = key.split('.')
        const operator = sqlOperation(action)
        conditions.push(`${field} ${operator} ?`)
        params.push(value)
      })

      const conditionsString = conditions.length
        ? conditions.join(' AND ')
        : '1'
      const queryString = `${query}${conditionsString} ORDER BY ${order} LIMIT ? OFFSET ?`
      params.push(Number(limit), Number(startIndex))

      const [results] = await pool.query(queryString, params)
      return results
    } catch (error) {
      throw error
    }
  },

  // Count employees based on filter criteria
  count: async (filters) => {
    try {
      const query =
        'SELECT COUNT(*) AS total FROM employees JOIN shifts on employees.id = shifts.employee_id WHERE '
      const conditions = []
      const params = []

      Object.entries(filters).forEach(([key, value]) => {
        const [field, action] = key.split('.')
        const operator = sqlOperation(action)
        conditions.push(`${field} ${operator} ?`)
        params.push(value)
      })

      const conditionsString = conditions.length
        ? conditions.join(' AND ')
        : '1'
      const countQuery = query + conditionsString

      const [results] = await pool.query(countQuery, params)

      const totalCount = results[0].total
      return totalCount
    } catch (error) {
      throw error
    }
  },
}

module.exports = Employee
