const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.post('/add', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/update/:id', taskController.updateTask);
router.delete('/delete/:taskId', taskController.deleteTask);

module.exports = router;

//authmiddleware and protected routes to be implemented later