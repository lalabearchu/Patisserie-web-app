import { FilterQuery } from "mongoose";
import { UserModel, UserDocument } from "../models/User";
import { NotFoundError } from "../errors/not-found-error";
import { UnauthenticatedError } from "../errors/unauthenticated-error";

const getAllUsers = async (query: FilterQuery<UserDocument>) => {
  const users = await UserModel.find(query).select("-password");
  return users;
};

const getSingleUser = async (id: string) => {
  const user = await UserModel.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user found with id : ${id}`);
  }
  return user;
};

const updateUser = async (
  id: string,
  {
    name,
    email,
  }: {
    name: string;
    email: string;
  }
) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { name, email },
    { new: true, runValidators: true }
  ).select("-password");
  if (!user) {
    throw new NotFoundError("No user found");
  }
  return user;
};

const updatePassword = async (
  id: string,
  {
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError("No user found");
  }
  const isValid = await user.comparePassword(oldPassword);
  if (!isValid) {
    throw new UnauthenticatedError("Invalid password");
  }
  user.password = newPassword;
  await user.save();
  return;
};

export { getAllUsers, getSingleUser, updateUser, updatePassword };
