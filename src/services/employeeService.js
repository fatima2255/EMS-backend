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
  // Fetch all users and map them by userId
  const users = await User.find().select('-password');
  const userMap = new Map(users.map(user => [user.userId, user]));

  // Fetch all employees
  const employees = await EmployeeInfo.find();

  const enrichedEmployees = employees.map(emp => {
    const employeeUser = userMap.get(emp.userId);
    const managerUser = userMap.get(emp.managerId);

    return {
      employeeId: emp.userId,
      fullName: employeeUser ? `${employeeUser.firstName} ${employeeUser.lastName}` : 'N/A',
      role: employeeUser ? `${employeeUser.role}` : 'N/A',
      designation: emp.designation,
      salary: emp.salaryPerMonth,
      email: employeeUser?.email || 'N/A',
      username: employeeUser?.username || 'N/A',
      contact: employeeUser?.contact || 'N/A',
      managerId: emp.managerId || 'N/A',
      managerFullName: managerUser ? `${managerUser.firstName} ${managerUser.lastName}` : 'N/A',
    };
  });

  return enrichedEmployees;
};


module.exports = {
    addEmployeeInfo,
    getAllEmployees
};
