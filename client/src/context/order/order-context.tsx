import { ReactNode, useContext, createContext, useReducer } from "react";
import axios from "axios";
import { CartItem } from "../cart/cart-context";
import { orders_reducer } from "./order-reducer";

export interface OrderItem extends CartItem {
  _id: string;
}

export interface SingleOrder {
  _id: string;
  total: number;
  orderItems: OrderItem[];
  createdAt: Date;
}

export interface InitialState {
  create_order_loading: boolean;
  create_order_error: boolean;

  orders_loading: boolean;
  orders_error: boolean;
  orders: SingleOrder[];

  single_order_loading: boolean;
  single_order_error: boolean;
  single_order: SingleOrder;

  user_order_loading: boolean;
  user_order_error: boolean;
  user_order: SingleOrder[];
}

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersContext extends InitialState {
  createOrder: (cart: CartItem[]) => void;
  getOrders: () => void;
  getSingleOrder: (id: string) => void;
  getUserOrder: () => void;
}

const initialState: InitialState = {
  create_order_loading: false,
  create_order_error: false,

  orders_loading: false,
  orders_error: false,
  orders: [],

  single_order_loading: false,
  single_order_error: false,
  single_order: {} as SingleOrder,

  user_order_loading: false,
  user_order_error: false,
  user_order: [],
};

const OrdersContext = createContext({} as OrdersContext);

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [state, dispatch] = useReducer(orders_reducer, initialState);

  const createOrder = async (cart: CartItem[]) => {
    dispatch({ type: "CREATE_ORDER_BEGIN" });
    try {
      await axios.post("/api/v1/orders", { cart });
      dispatch({ type: "CREATE_ORDER_SUCCESS" });
    } catch (error) {
      dispatch({ type: "CREATE_ORDER_ERROR" });
    }
  };

  const getOrders = async () => {
    dispatch({ type: "GET_ORDERS_BEGIN" });
    try {
      const res = await axios.get("/api/v1/orders");
      const orders = res.data.orders;
      dispatch({ type: "GET_ORDERS_SUCCESS", payload: orders });
    } catch (error) {
      dispatch({ type: "GET_ORDERS_ERROR" });
    }
  };

  const getSingleOrder = async (id: string) => {
    dispatch({ type: "GET_SINGLE_ORDER_BEGIN" });
    try {
      const res = await axios.get(`/api/v1/orders/${id}`);
      const order = res.data.order;
      dispatch({ type: "GET_SINGLE_ORDER_SUCCESS", payload: order });
    } catch (error) {
      dispatch({ type: "GET_SINGLE_ORDER_ERROR" });
    }
  };

  const getUserOrder = async () => {
    dispatch({ type: "GET_USER_ORDER_BEGIN" });
    try {
      const res = await axios.get("/api/v1/orders/getUserOrders");
      const orders = res.data.orders;
      dispatch({ type: "GET_USER_ORDER_SUCCESS", payload: orders });
    } catch (error) {
      dispatch({ type: "GET_USER_ORDER_ERROR" });
    }
  };

  return (
    <OrdersContext.Provider
      value={{ ...state, createOrder, getOrders, getSingleOrder, getUserOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
