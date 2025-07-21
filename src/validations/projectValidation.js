const Joi = require('joi');

const createProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = { createProjectSchema };
