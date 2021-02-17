const Joi = require('joi');

const schema = {
  validatePostInput: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  }),
  validateGetInput: Joi.object({
    title: Joi.string(),
    page : Joi.number(),
    limit : Joi.number()
  }),
  validateUpdateInput: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  }),
  validateDeleteInput: Joi.object({
    title: Joi.string().required()
  }),
  validateLogin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  validateRegister: Joi.object({
    name : Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),

};

function validatePostInput(request) {
  return schema.validatePostInput.validate(request, {
    abortEarly: true,
    allowUnknown: true,
  });
}

function validateGetInput(request) {
  return schema.validateGetInput.validate(request, {
    abortEarly: true,
    allowUnknown: true,
  });
}
function validateUpdateInput(request) {
    return schema.validateUpdateInput.validate(request, {
      abortEarly: true,
      allowUnknown: true,
    });
}
function validateDeleteInput(request) {
    return schema.validateDeleteInput.validate(request, {
        abortEarly: true,
        allowUnknown: true,
    });
}

function validateLogin(request) {
    return schema.validateLogin.validate(request, {
        abortEarly: true,
        allowUnknown: true,
    });
}

function validateRegister(request) {
        return schema.validateRegister.validate(request, {
            abortEarly: true,
            allowUnknown: true,
        });
    }

 

module.exports = { validatePostInput, validateGetInput,  validateUpdateInput, validateDeleteInput, validateLogin, validateRegister}
