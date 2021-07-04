const Joi = require("@hapi/joi");

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
