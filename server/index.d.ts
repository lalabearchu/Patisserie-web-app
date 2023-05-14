import { Express } from "express-serve-static-core";
import { ObjectId } from "mongoose";

interface UserData {
  name: string;
  userId: string;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user: UserData;
  }
}
