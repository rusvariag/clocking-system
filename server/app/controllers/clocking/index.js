const Employee = require('../../models/employee.model')
const Shift = require('../../models/shift.model')

exports.indexController = async (req, res, next) => {
  try {
    const { _sort, _limit = 10, _page = 1, ..._filters } = req.query

    let filters = {}
    if (req.user.role !== 'admin') {
      filters = { ..._filters, social_number: req.user.social_number }
    } else {
      filters = _filters
    }

    // Calculate the pagination values
    const startIndex = (_page - 1) * _limit

    // Retrieve the books that match the filter and sort criteria
    const data = await Employee.find(filters, _sort, _limit, startIndex)

    // Calculate the total number of books that match the filter criteria
    const total = await Employee.count(filters)

    res.status(200).json({
      data,
      total,
      page: _page,
      pages: Math.ceil(total / _limit),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.clockinController = async (req, res, next) => {
  try {
    const { employeeId } = req.body
    let status

    // Find the employee by social number
    const user = await Employee.findBySocialNumber(employeeId)

    if (!user) {
      status = { status: 'error', message: 'Wrong employee social number' }
    } else {
      // Create a new shift for the employee
      status = await Shift.create(user.id)
    }

    res.status(201).json(status)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}

exports.clockoutController = async (req, res, next) => {
  try {
    const { employeeId } = req.body

    // Find the employee by social number
    const user = await Employee.findBySocialNumber(employeeId)

    // Update the shift status for the employee
    const status = await Shift.update(user.id)

    res.status(201).json(status)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
