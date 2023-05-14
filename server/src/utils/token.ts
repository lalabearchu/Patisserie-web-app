import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { Response } from "express";
import { UserDocument } from "../models/User";

const createTokenPayload = (user: UserDocument) => {
  return {
    name: user.name,
    userId: user._id as ObjectId,
    email: user.email,
    role: user.role,
  };
};

const createToken = (user: UserDocument) => {
  const payload = createTokenPayload(user);
  const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "1d",
  });
  return token;
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
};

const attachCookieToResponse = (res: Response, user: UserDocument) => {
  const token = createToken(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDay),
    httpOnly: true,
    signed: true,
    // sends the cookie over HTTPS in production
    secure: process.env.NODE_ENV === "production",
  });
};

const removeCookie = (res: Response) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
};

export { verifyToken, attachCookieToResponse, removeCookie };
