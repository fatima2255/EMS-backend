const EmployeeInfo = require('../models/employeeModel');
const User = require('../models/userModel');

const addEmployeeInfo = async ({ userId, address, designation, salaryPerMonth, managerId, isManager, profile_completed }) => {
    const exists = await EmployeeInfo.findOne({ userId });
    if (exists) {
        const error = new Error('Employee info already exists.');
        error.status = 400;
        throw error;
    }

    const employee = new EmployeeInfo({
        userId,
        address,
        designation,
        salaryPerMonth,
        managerId,
        profile_completed,
        isManager,
    });

    await employee.save();
    return 'Employee info added successfully.';
};


const getAllEmployees = async () => {
  const users = await User.find().select('-password');
  const userMap = new Map(users.map(u => [u.userId, u]));

  const employees = await EmployeeInfo.find();

  const enrichedEmployees = employees.map(emp => {
    return {
      ...emp._doc,
      user: userMap.get(emp.userId),
      manager: userMap.get(emp.managerId)
    };
  });

  return enrichedEmployees;
};

module.exports = {
    addEmployeeInfo,
    getAllEmployees
};
