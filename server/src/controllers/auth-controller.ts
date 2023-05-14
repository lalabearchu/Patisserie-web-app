import { Request, Response } from "express";
import {
  createUser,
  findUser,
  validatePassword,
} from "../services/auth-service";
import { attachCookieToResponse, removeCookie } from "../utils/token";

const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await createUser({ name, email, password, role: "user" });
  attachCookieToResponse(res, user);
  res.status(201).json({ user });
};

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  await validatePassword({ email, password });
  attachCookieToResponse(res, user);
  res.status(200).json({ user });
};

const logoutController = async (req: Request, res: Response) => {
  removeCookie(res);
  res.status(200).json({ msg: "user logged out" });
};

export { registerController, loginController, logoutController };
