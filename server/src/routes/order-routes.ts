import express from "express";
import {
  getAllOrdersController,
  getClientSecretController,
  createOrderController,
  getSingleOrderController,
  getUserOrdersController,
} from "../controllers/order-controller";
import { validateInput } from "../middleware/validate-input";
import { authenticateUser, authorize } from "../middleware/authentication";
import { createOrderSchema } from "../schema/order-schema";

const router = express.Router();

router
  .get("/", authenticateUser, authorize("admin"), getAllOrdersController)
  .post("/paymentIntent", authenticateUser, getClientSecretController)
  .post(
    "/",
    authenticateUser,
    validateInput(createOrderSchema),
    createOrderController
  )
  .get("/getUserOrders", authenticateUser, getUserOrdersController)
  .get("/:id", authenticateUser, getSingleOrderController);

export { router as orderRoutes };
