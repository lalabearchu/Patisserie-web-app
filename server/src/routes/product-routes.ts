import express from "express";
import {
  getAllProductsController,
  createProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product-controller";
import { validateInput } from "../middleware/validate-input";
import { authenticateUser, authorize } from "../middleware/authentication";
import {
  createProductSchema,
  updateProductSchema,
} from "../schema/product-schema";

const router = express.Router();

router
  .get("/", getAllProductsController)
  .post(
    "/",
    authenticateUser,
    authorize("admin"),
    validateInput(createProductSchema),
    createProductController
  )
  .get("/:id", getSingleProductController)
  .patch(
    "/:id",
    authenticateUser,
    authorize("admin"),
    validateInput(updateProductSchema),
    updateProductController
  )
  .delete(
    "/:id",
    authenticateUser,
    authorize("admin"),
    deleteProductController
  );

export { router as productRoutes };
