const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { addEmployeeInfo, getAllEmployees } = require('../controllers/employeeController');
const accessControl = require('../middlewares/permission.middleware');

router.post('/add',authMiddleware, accessControl('employee_info', 'add') ,addEmployeeInfo);
router.get('/get', authMiddleware, accessControl('employee_info', 'view'), getAllEmployees);

module.exports = router;
