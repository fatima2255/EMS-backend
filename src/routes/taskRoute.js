const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth.middleware');
const accessControl = require('../middlewares/permission.middleware');

router.post('/add', authMiddleware, accessControl('tasks', 'add'), taskController.createTask);
router.get('/', authMiddleware, accessControl('tasks', 'view') , taskController.getAllTasks);
//router.get('/:id', taskController.getTaskById);
router.put('/update/:id', authMiddleware, accessControl('tasks', 'update') ,taskController.updateTask); // admin/manager can update tasks
router.patch('/update-status/:taskId', taskController.updateTaskStatus);
router.delete('/delete/:taskId', authMiddleware, accessControl('tasks', 'delete'), taskController.deleteTask);

module.exports = router;

//authmiddleware and protected routes to be implemented later