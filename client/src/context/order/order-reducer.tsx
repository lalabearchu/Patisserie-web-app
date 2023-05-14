import { InitialState, SingleOrder } from "./order-context";
import { Reducer } from "react";

type OrdersAction =
  | {
      type:
        | "CREATE_ORDER_BEGIN"
        | "CREATE_ORDER_SUCCESS"
        | "CREATE_ORDER_ERROR"
        | "GET_ORDERS_BEGIN"
        | "GET_ORDERS_ERROR"
        | "GET_SINGLE_ORDER_BEGIN"
        | "GET_SINGLE_ORDER_ERROR"
        | "GET_USER_ORDER_BEGIN"
        | "GET_USER_ORDER_ERROR";
    }
  | { type: "GET_ORDERS_SUCCESS"; payload: SingleOrder[] }
  | { type: "GET_SINGLE_ORDER_SUCCESS"; payload: SingleOrder }
  | { type: "GET_USER_ORDER_SUCCESS"; payload: SingleOrder[] };

export const orders_reducer: Reducer<InitialState, OrdersAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "CREATE_ORDER_BEGIN": {
      return { ...state, create_order_loading: true };
    }

    case "CREATE_ORDER_SUCCESS": {
      return { ...state, create_order_loading: false };
    }

    case "CREATE_ORDER_ERROR": {
      return { ...state, create_order_error: true };
    }

    case "GET_ORDERS_BEGIN": {
      return { ...state, orders_loading: true };
    }

    case "GET_ORDERS_SUCCESS": {
      return { ...state, orders_loading: false, orders: action.payload };
    }

    case "GET_ORDERS_ERROR": {
      return { ...state, orders_loading: false, orders_error: true };
    }

    case "GET_SINGLE_ORDER_BEGIN": {
      return { ...state, single_order_loading: true };
    }

    case "GET_SINGLE_ORDER_SUCCESS": {
      return {
        ...state,
        single_order_loading: false,
        single_order: action.payload,
      };
    }

    case "GET_SINGLE_ORDER_ERROR": {
      return {
        ...state,
        single_order_loading: false,
        single_order_error: true,
      };
    }

    case "GET_USER_ORDER_BEGIN": {
      return { ...state, user_order_loading: true };
    }

    case "GET_USER_ORDER_SUCCESS": {
      return {
        ...state,
        user_order_loading: false,
        user_order: action.payload,
      };
    }

    case "GET_USER_ORDER_ERROR": {
      return { ...state, user_order_loading: false, user_order_error: true };
    }
  }
};
