const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.post('/add', taskController.createTask);
router.get('/', taskController.getAllTasks);
//router.get('/:id', taskController.getTaskById);
router.put('/update/:id', taskController.updateTask); // admin/manager can update tasks
router.patch('/update-status/:taskId', taskController.updateTaskStatus);
router.delete('/delete/:taskId', taskController.deleteTask);

module.exports = router;

//authmiddleware and protected routes to be implemented later