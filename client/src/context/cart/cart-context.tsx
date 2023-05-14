import {
  ReactNode,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import { Product } from "../products/products-context";
import { cart_reducer } from "./cart-reducer";

export interface CartItem extends Product {
  amount: number;
}

export interface InitialState {
  cart: CartItem[];
  total_items: number;
  total_price: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface CartContext extends InitialState {
  addToCart: (product: Product, amount: number) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, toggle: string) => void;
  clearCart: () => void;
}

const getLocalCart = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart) as CartItem[];
  } else {
    return [];
  }
};

const initialState: InitialState = {
  cart: getLocalCart(),
  total_items: 0,
  total_price: 0,
};

const CartContext = createContext({} as CartContext);

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cart_reducer, initialState);

  const addToCart = (product: Product, amount: number) => {
    const cartItem = { ...product, amount };
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  const toggleAmount = (id: string, toggle: string) => {
    dispatch({ type: "TOGGLE_CART_ITEM_AMOUNT", payload: { id, toggle } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
