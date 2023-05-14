import express from "express";
import {
  getAllUsersController,
  getSingleUserController,
  getUserInfoController,
  updateUserController,
  updatePasswordController,
} from "../controllers/user-controller";
import { validateInput } from "../middleware/validate-input";
import { authenticateUser, authorize } from "../middleware/authentication";
import { updateUserSchema, updatePasswordSchema } from "../schema/user-schema";

const router = express.Router();

router
  .get("/", authenticateUser, authorize("admin"), getAllUsersController)
  .get("/userinfo", authenticateUser, getUserInfoController)
  .patch(
    "/updateUser",
    authenticateUser,
    validateInput(updateUserSchema),
    updateUserController
  )
  .patch(
    "/updatePassword",
    authenticateUser,
    validateInput(updatePasswordSchema),
    updatePasswordController
  )
  .get("/:id", authenticateUser, authorize("admin"), getSingleUserController);

export { router as userRoutes };
