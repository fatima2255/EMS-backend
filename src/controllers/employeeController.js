const employeeService = require('../services/employeeService');

// POST: Add employee info
const addEmployeeInfo = async (req, res) => {
    try {
        const { userId, address, designation, salaryPerMonth, managerId,isManager, profile_completed } = req.body;

        const result = await employeeService.addEmployeeInfo({ userId, address, designation, salaryPerMonth, managerId, isManager, profile_completed });

        res.status(201).json({ message: result });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
};

// GET: Get all employees (admin/manager only)
const getAllEmployees = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    addEmployeeInfo,
    getAllEmployees
};
