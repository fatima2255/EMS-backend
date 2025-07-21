// controllers/project.controller.js
const projectService = require('../services/projectService');
const { createProjectSchema } = require('../validations/projectValidation');

exports.createProject = async (req, res) => {
  try {
    const { error, value } = createProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const project = await projectService.createProject(value);
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProject = async (req, res) => {
  const projectId = Number(req.params.id);

  if (isNaN(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  try {
    const updatedProject = await projectService.updateProject(projectId, req.body);

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteProject = async (req, res) => {
  const projectId = Number(req.params.projectId); 

  if (isNaN(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  try {
    const deletedProject = await projectService.deleteProject(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

