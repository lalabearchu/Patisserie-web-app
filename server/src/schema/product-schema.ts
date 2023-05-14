import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().max(1000).required(),
  image: Joi.string(),
  category: Joi.string().required(),
  featured: Joi.boolean(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  description: Joi.string().max(1000),
  image: Joi.string(),
  category: Joi.string(),
  featured: Joi.boolean(),
});

export { createProductSchema, updateProductSchema };
