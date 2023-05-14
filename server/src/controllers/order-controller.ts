import { Request, Response } from "express";
import {
  getAllOrders,
  getClientSecret,
  createOrder,
  getSingleOrder,
} from "../services/order-service";
import { checkPermission } from "../utils/checkPermission";

const getAllOrdersController = async (req: Request, res: Response) => {
  const orders = await getAllOrders({});
  res.status(200).json({ orders });
};

const getClientSecretController = async (req: Request, res: Response) => {
  const { cart } = req.body;
  const clientSecret = await getClientSecret(cart);
  res.status(200).json({ clientSecret });
};

const createOrderController = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { cart } = req.body;
  const order = await createOrder(userId, cart);
  res.status(201).json({ order });
};

const getSingleOrderController = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await getSingleOrder(orderId);
  const orderUserId = String(order.user);
  checkPermission(req.user, orderUserId);
  res.status(200).json({ order });
};

const getUserOrdersController = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const orders = await getAllOrders({ user: userId });
  res.status(200).json({ orders });
};

export {
  getAllOrdersController,
  getClientSecretController,
  createOrderController,
  getSingleOrderController,
  getUserOrdersController,
};
