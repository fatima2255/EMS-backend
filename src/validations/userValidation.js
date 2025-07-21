const Joi = require('joi');

const signupSchema = Joi.object({

  firstName : Joi.string().min(3).max(30).required(),
  lastName : Joi.string().min(3).max(30).required(),
  username : Joi.string().alphanum().min(3).max(30).required(),
  contact : Joi.string().pattern(/^[0-9]{11}$/).required().messages({
    'string.pattern.base': 'Invalid contact number',}),
  email : Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .pattern(new RegExp('^(?=.*[!@#$%^&*(),.?":{}|<>])'))
  .required()
  .messages({
    'string.pattern.base': 'Password must include at least one special character',
    'string.min': 'Password must be at least 8 characters long',
  }),
  role: Joi.string()
  .valid('admin', 'employee', 'manager')
  .required()

}); 

module.exports ={signupSchema};