const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const accessControl = require('../middlewares/permission.middleware');  
const {
  createAttendanceLog,
  getAllLogs,
  getUserLogs
} = require('../controllers/attendanceController');

router.post('/', authMiddleware, accessControl('Attendance_Log', 'add'), createAttendanceLog);
router.get('/',authMiddleware, accessControl('Attendance_Log', 'get_all'), getAllLogs);
router.get('/:userId', authMiddleware, accessControl('Attendance_Log', 'get_userid') ,getUserLogs);

module.exports = router;
