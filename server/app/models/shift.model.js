const pool = require('../database')

const Shift = {
  create: async (employeeId) => {
    try {
      const [shift] = await pool.query(
        'SELECT * FROM shifts WHERE employee_id = ? AND clock_out_time IS NULL',
        employeeId
      )
      if (shift[0]) {
        return { status: 'error', message: 'Employee is already clocked in' }
      }
      const query =
        'INSERT INTO shifts (employee_id, clock_in_time) VALUES (?, ?)'
      const params = [employeeId, new Date()]
      await pool.query(query, params)
      return { status: 'open', message: 'Shift started successfully' }
    } catch (error) {
      throw error
    }
  },
  update: async (employeeId) => {
    try {
      const query =
        'UPDATE shifts SET clock_out_time = ? WHERE employee_id AND clock_out_time IS NULL'
      const params = [new Date(), employeeId]
      await pool.query(query, params)
      return { status: 'closed', message: 'Shift ended successfully' }
    } catch (error) {
      throw error
    }
  },
}

module.exports = Shift
