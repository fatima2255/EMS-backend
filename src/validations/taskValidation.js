const Joi = require('joi');

const createTaskSchema = Joi.object({
    project_id: Joi.number().required(),
    task_name: Joi.string().required(),
    task_description: Joi.string().required(),
    assigned_to: Joi.number().required(),
    assigned_by: Joi.number().required(),
    due_date: Joi.date().required(),
    submission_date: Joi.date().allow(null),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
});

module.exports = { createTaskSchema };
