// services/project.service.js
const Task = require('../models/taskModel');7


exports.createTask = async (data) => {
  const newTask = new Task(data);
  return await newTask.save();
};


exports.getAllTasks = async () => {
  return await Task.find().sort({ due_date: -1 });
};


exports.getTaskById = async (taskId) => {
  const task = await Task.findOne({ task_id: taskId });
  return task ? task.toObject() : null;
};

exports.updateTask = async (taskId, data) => {
  return await Task.findOneAndUpdate({ task_id: taskId }, data, { new: true });
};  

exports.deleteTask = async (taskId) => {
  return await Task.findOneAndDelete({ task_id: taskId });
};
