import express from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/auth-controller";
import { validateInput } from "../middleware/validate-input";
import { registerSchema, loginSchema } from "../schema/auth-schema";

const router = express.Router();

router
  .post("/register", validateInput(registerSchema), registerController)
  .post("/login", validateInput(loginSchema), loginController)
  .get("/logout", logoutController);

export { router as authRoutes };
