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

// GET: Get all employees 
const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateEmployeeInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = req.body;

        const result = await employeeService.updateEmployeeInfo(userId, data);

        res.status(200).json({
            message: 'Employee and user info updated successfully',
            user: result.user,
            employee: result.employee
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
};



module.exports = {
    addEmployeeInfo,
    getAllEmployees,
    updateEmployeeInfo,

};
