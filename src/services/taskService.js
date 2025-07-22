// services/project.service.js
const Task = require('../models/taskModel'); 7


const createTask = async (data) => {
  const newTask = new Task(data);
  return await newTask.save();
};


const getAllTasks = async () => {
  return await Task.find().sort({ due_date: -1 });
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
  // console.log("Inside service - task_id:", task_id, "status:", status);
  const updatedTask = await Task.findOneAndUpdate(
    { task_id: parseInt(task_id) }, 
    {
      status,
      submission_date: new Date()
    },
    { new: true }
  );

  //console.log("Updated Task:", updatedTask);
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