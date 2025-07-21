const employeeModel = require("../models/employeeModel");

module.exports = {
  users: {
    signup: ['admin'],
    signin: ['admin', 'manager', 'employee'],
  },

  employee_info:{
    add: ['admin'],
    view: ['admin', 'manager'],
    // update: all 3
    // delete only admin
  },

  Attendance_Log: {
    add: ['manager', 'employee'],
    get_userid: ['admin'  , 'manager', 'employee'],
    get_all: ['admin'],
  },
  
};