const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { addEmployeeInfo, getAllEmployees } = require('../controllers/employeeController');

router.post('/add',addEmployeeInfo);
router.get('/get', authMiddleware, getAllEmployees);

module.exports = router;
