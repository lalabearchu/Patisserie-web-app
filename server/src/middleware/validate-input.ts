import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import Joi from "joi";

export const validateInput = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      throw new BadRequestError("Please provide valid input");
    }
  };
};
