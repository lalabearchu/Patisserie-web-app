import { Request, Response } from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  updatePassword,
} from "../services/user-service";
import { attachCookieToResponse } from "../utils/token";

const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsers({});
  res.status(200).json({ users });
};

const getSingleUserController = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const user = await getSingleUser(userId);
  res.status(200).json({ user });
};

const getUserInfoController = async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};

const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { name, email } = req.body;
  const user = await updateUser(userId, { name, email });
  attachCookieToResponse(res, user);
  res.status(200).json({ user });
};

const updatePasswordController = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  await updatePassword(userId, { oldPassword, newPassword });
  res.status(200).json({ msg: "Password updated" });
};

export {
  getAllUsersController,
  getSingleUserController,
  getUserInfoController,
  updateUserController,
  updatePasswordController,
};
