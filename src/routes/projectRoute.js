const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { createProjectSchema } = require('../validations/projectValidation');

router.post('/add', projectController.createProject);
router.get('/get', projectController.getAllProjects);
router.put('/update/:id', projectController.updateProject);
router.delete('/delete/:projectId', projectController.deleteProject);

module.exports = router;

//authmiddleware and protected routes to be implemented later