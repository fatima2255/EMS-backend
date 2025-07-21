const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth.middleware');
const accessControl = require('../middlewares/permission.middleware');

router.post('/add', authMiddleware, accessControl('projects', 'add'), projectController.createProject);
router.get('/get', authMiddleware, accessControl('projects', 'view') ,projectController.getAllProjects);
router.put('/update/:id', authMiddleware, accessControl('projects', 'update'), projectController.updateProject);
router.delete('/delete/:projectId', authMiddleware, accessControl('projects', 'delete'), projectController.deleteProject);

module.exports = router;

//authmiddleware and protected routes to be implemented later