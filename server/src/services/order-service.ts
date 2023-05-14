import dotenv from "dotenv";
dotenv.config();
import { FilterQuery, UpdateQuery } from "mongoose";
import { OrderModel, SingleItem, OrderDocument } from "../models/Order";
import { ProductModel } from "../models/Product";
import { NotFoundError } from "../errors/not-found-error";
import Stripe from "stripe";

const getAllOrders = async (filter: FilterQuery<OrderDocument>) => {
  const orders = await OrderModel.find(filter);
  return orders;
};

const getClientSecret = async (cart: SingleItem[]) => {
  // calculate order amount
  let total = 0;
  for (const item of cart) {
    const dbProduct = await ProductModel.findOne({ _id: item._id });
    if (!dbProduct) {
      throw new NotFoundError(`No product found with id : ${item._id}`);
    }
    total += item.amount * dbProduct.price;
  }
  // stripe format price
  total = total * 100;
  // create stripe paymentIntent, get client_secret
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "twd",
  });
  const clientSecret = paymentIntent.client_secret;
  return clientSecret;
};

const createOrder = async (userId: string, cart: SingleItem[]) => {
  let orderItems: SingleItem[] = [];
  let total = 0;
  for (const item of cart) {
    const dbProduct = await ProductModel.findOne({ _id: item._id });
    if (!dbProduct) {
      throw new NotFoundError(`No product found with id : ${item._id}`);
    }
    const singleOrderItem = {
      ...dbProduct,
      amount: item.amount,
    };
    orderItems = [...orderItems, singleOrderItem];
    total += item.amount * dbProduct.price;
  }

  const order = await OrderModel.create({
    total,
    orderItems,
    user: userId,
  });

  return order;
};

const getSingleOrder = async (id: string) => {
  const order = await OrderModel.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError(`No order found with id : ${id}`);
  }
  return order;
};

export { getAllOrders, getClientSecret, createOrder, getSingleOrder };
