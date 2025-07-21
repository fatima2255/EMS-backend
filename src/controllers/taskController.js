const TaskService = require('../services/taskService');
const { createTaskSchema } = require('../validations/taskValidation');


exports.createTask = async (req, res) => {
    try {
        const { error, value } = createTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const project = await TaskService.createTask(value);
        res.status(201).json(project);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getTaskById = async (req, res) => {
    const taskId = Number(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }
    try {   
        const task = await TaskService.getTaskById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    const taskId = Number(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }
    try {
        const updatedTask = await TaskService.updateTask(taskId, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Update error:', err);
    }
};

exports.deleteTask = async (req, res) => {
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }
    try {
        const deletedTask = await TaskService.deleteTask(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

