import Joi from "joi";

const updateUserSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

export { updateUserSchema, updatePasswordSchema };
