// services/project.service.js
const Project = require('../models/projectModel');

exports.createProject = async (data) => {
  const newProject = new Project(data);
  return await newProject.save();
};

exports.getAllProjects = async () => {
  return await Project.find().sort({ project_id: 1, title: 1 ,description: 1 });
};

exports.updateProject = async (projectId, data) => {
  return await Project.findOneAndUpdate({ project_id: projectId}, data, { new: true });
};

exports.deleteProject = async (projectId) => {
  return await Project.findOneAndDelete({ project_id: projectId });
};