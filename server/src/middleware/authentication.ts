import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import { UnauthenticatedError } from "../errors/unauthenticated-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

export interface UserData {
  name: string;
  userId: string;
  email: string;
  role: string;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError(
      "Authentication failed, please check your credentials"
    );
  }
  try {
    const { name, userId, email, role } = verifyToken(token) as UserData;
    req.user = { name, userId, email, role };
    return next();
  } catch (error) {
    throw new UnauthenticatedError(
      "Authentication failed, please check your credentials"
    );
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
    return next();
  };
};
