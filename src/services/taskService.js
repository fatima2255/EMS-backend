// services/project.service.js
const Task = require('../models/taskModel'); 7


const createTask = async (data) => {
  const newTask = new Task(data);
  return await newTask.save();
};


const getAllTasks = async () => {
  return await Task.find().sort({ task_id: 1 });
};


// exports.getTaskById = async (taskId) => {
//   const task = await Task.findOne({ task_id: taskId });
//   return task ? task.toObject() : null;
// };

const updateTask = async (taskId, data) => {
  return await Task.findOneAndUpdate({ task_id: taskId }, data, { new: true });
};

const deleteTask = async (taskId) => {
  return await Task.findOneAndDelete({ task_id: taskId });
};

const updateStatus = async (task_id, status) => {
  const updateFields = { status };

  if (status === 'completed') {
    updateFields.submission_date = new Date();
  } else {
    updateFields.submission_date = null;
  }

  const updatedTask = await Task.findOneAndUpdate(
    { task_id: parseInt(task_id) },
    updateFields,
    { new: true }
  );

  return updatedTask;
};


module.exports = {
  createTask,
  getAllTasks,
  // getTaskById,
  updateTask,
  deleteTask,
  updateStatus
};