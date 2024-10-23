// request/validateDoctor.js
const Joi = require('joi');

const doctorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  image: Joi.string().max(2048).required(),
  password: Joi.string().min(6).required(),
  specialization_id: Joi.string().required(),
});

const validateDoctor = (data) => {
  return doctorSchema.validate(data);
};

module.exports = validateDoctor;
