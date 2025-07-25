const express = require('express');
const router = express.Router();
const { generateWeeklyReport } = require('../utils/report');
const authMiddleware = require('../middlewares/auth.middleware');
const accessControl = require('../middlewares/permission.middleware');

router.get('/:userId', authMiddleware, accessControl('reports', 'generate') ,generateWeeklyReport);

module.exports = router;
