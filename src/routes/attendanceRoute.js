// backend/src/routes/attendanceRoute.js

const express = require('express');
const router = express.Router();

const {
  createAttendanceLog,
  getAllLogs,
  getUserLogs
} = require('../controllers/attendanceController');

router.post('/', createAttendanceLog);
router.get('/', getAllLogs);
router.get('/:userId', getUserLogs);

module.exports = router;
