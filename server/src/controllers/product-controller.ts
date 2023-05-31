import { Request, Response } from "express";
import { ProductDocument } from "../models/Product";
import { FilterQuery } from "mongoose";
import {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../services/product-service";

const getAllProductsController = async (req: Request, res: Response) => {
  const { search, featured, category, sort } = req.query as {
    search: string | undefined;
    featured: string | undefined;
    category: string | undefined;
    sort: string | undefined;
  };

  let query: FilterQuery<ProductDocument> = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (featured) {
    query.featured = featured === "true" ? true : false;
  }
  if (category && category !== "All") {
    query.category = category;
  }

  const products = await getAllProducts(query, sort);

  res.status(200).json({ products });
};

const createProductController = async (req: Request, res: Response) => {
  req.body.user = req.user.userId;
  const product = await createProduct(req.body);
  res.status(201).json({ product });
};

const getSingleProductController = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const product = await getSingleProduct(productId);
  res.status(200).json({ product });
};

const updateProductController = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const product = await updateProduct(productId, req.body);
  res.status(200).json({ product });
};

const deleteProductController = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  await deleteProduct(productId);
  res.status(200).json({ msg: "Product deleted" });
};

export {
  getAllProductsController,
  createProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};
