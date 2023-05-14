import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import mongoose from "mongoose";
import { MongoError } from "mongodb";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // custom error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // mongoose error
  if (err instanceof mongoose.Error.ValidationError) {
    const msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    return res.status(400).json({ msg });
  }
  if (err instanceof mongoose.Error.CastError) {
    const msg = `No resource found with id : ${err.value}`;
    return res.status(400).json({ msg });
  }
  // Duplicate key error
  if (err.name === "MongoServerError" && (err as MongoError).code === 11000) {
    const msg = "Email already exists";
    return res.status(400).json({ msg });
  }
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again later" });
};
