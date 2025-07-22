const express = require('express');
const router = express.Router();
const { generateWeeklyReport } = require('../utils/report');

router.get('/:userId', generateWeeklyReport);

module.exports = router;
