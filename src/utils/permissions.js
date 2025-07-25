const employeeModel = require("../models/employeeModel");

module.exports = {
  users: {
    signup: ['admin'],
    signin: ['admin', 'manager', 'employee'],
  },

  employee_info:{
    add: ['admin'],
    view: ['admin', 'manager', 'employee'],
    update: ['admin'],
    // delete only admin
  },

  Attendance_Log: {
    add: ['manager', 'employee'],
    get_userid: ['admin'  , 'manager', 'employee'],
    get_all: ['admin'],
  },

  projects: {
    add: ['admin'],
    view: ['admin', 'manager', 'employee'],
    update: ['admin'],
    delete: ['admin'],
  },

  tasks: {
    add: ['admin', 'manager'],
    view: ['admin', 'manager', 'employee'],
    update: ['admin', 'manager'],
    delete: ['admin', 'manager'],
  },
  reports: {
    generate: ['admin'],
  },
  
};