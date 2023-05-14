import { CartItem, InitialState } from "./cart-context";
import { Reducer } from "react";

type CartAction =
  | { type: "CLEAR_CART" | "COUNT_CART_TOTALS" }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_CART_ITEM"; payload: string }
  | {
      type: "TOGGLE_CART_ITEM_AMOUNT";
      payload: { id: string; toggle: string };
    };

export const cart_reducer: Reducer<InitialState, CartAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return { ...state, cart: [...state.cart, action.payload] };
    }

    case "REMOVE_CART_ITEM": {
      const tempCart = state.cart.filter((item) => item._id !== action.payload);
      return { ...state, cart: tempCart };
    }

    case "TOGGLE_CART_ITEM_AMOUNT": {
      const { id, toggle } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item._id === id) {
          if (toggle === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > 10) {
              newAmount = 10;
            }
            return { ...item, amount: newAmount };
          }
          if (toggle === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      return { ...state, cart: tempCart };
    }

    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    case "COUNT_CART_TOTALS": {
      const { total_items, total_price } = state.cart.reduce(
        (total, item) => {
          const { amount, price } = item;
          total.total_items += amount;
          total.total_price += price * amount;
          return total;
        },
        { total_items: 0, total_price: 0 }
      );
      return { ...state, total_items, total_price };
    }
  }
};
