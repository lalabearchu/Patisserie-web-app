import Joi from "joi";

export const createOrderSchema = Joi.object({
  cart: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().max(1000).required(),
      image: Joi.string().required(),
      category: Joi.string().required(),
      featured: Joi.boolean().required(),
      user: Joi.string().required(),
      amount: Joi.number().required(),
      createdAt: Joi.date(),
      updatedAt: Joi.date(),
      __v: Joi.number(),
    })
  ),
});
