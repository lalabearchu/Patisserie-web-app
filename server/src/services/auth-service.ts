import { FilterQuery } from "mongoose";
import { UserModel, UserInput, UserDocument } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { UnauthenticatedError } from "../errors/unauthenticated-error";

const createUser = async (input: UserInput) => {
  const { name, email, password, role } = input;
  const emailAlreadyExists = await UserModel.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }
  const user = await UserModel.create({ name, email, password, role });
  return user;
};

const findUser = async (query: FilterQuery<UserDocument>) => {
  const user = await UserModel.findOne(query).select("-password");
  if (!user) {
    throw new NotFoundError("No user found");
  }
  return user;
};

const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new NotFoundError("No user found");
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new UnauthenticatedError("Invalid password");
  }
  return isValid;
};

export { createUser, findUser, validatePassword };
