import { FilterQuery, SortValues, UpdateQuery } from "mongoose";
import { ProductModel, ProductInput, ProductDocument } from "../models/Product";
import { NotFoundError } from "../errors/not-found-error";

const getAllProducts = async (
  query: FilterQuery<ProductDocument>,
  sort: string | undefined
) => {
  let tempProducts = ProductModel.find(query);

  if (!sort || sort === "date-latest") {
    tempProducts = tempProducts.sort("-createdAt");
  }
  if (sort === "date-oldest") {
    tempProducts = tempProducts.sort("createdAt");
  }
  if (sort === "price-highest") {
    tempProducts = tempProducts.sort("-price");
  }
  if (sort === "price-lowest") {
    tempProducts = tempProducts.sort("price");
  }

  const products = await tempProducts;
  return products;
};

const createProduct = async (input: ProductInput) => {
  const product = await ProductModel.create(input);
  return product;
};

const getSingleProduct = async (id: string) => {
  const product = await ProductModel.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError(`No product found with id : ${id}`);
  }
  return product;
};

const updateProduct = async (
  id: string,
  query: UpdateQuery<ProductDocument>
) => {
  const product = await ProductModel.findOneAndUpdate({ _id: id }, query, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError(`No product found with id : ${id}`);
  }
  return product;
};

const deleteProduct = async (id: string) => {
  const product = await ProductModel.findOneAndDelete({ _id: id });
  if (!product) {
    throw new NotFoundError(`No product found with id : ${id}`);
  }
  return;
};

export {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
