import { Product, InitialState } from "./products-context";
import { Reducer } from "react";

type ProductsAction =
  | {
      type:
        | "GET_PRODUCTS_BEGIN"
        | "GET_PRODUCTS_ERROR"
        | "GET_SINGLE_PRODUCT_BEGIN"
        | "GET_SINGLE_PRODUCT_ERROR"
        | "CLEAR_FILTERS"
        | "CREATE_PRODUCT_BEGIN"
        | "CREATE_PRODUCT_SUCCESS"
        | "UPDATE_PRODUCT_BEGIN"
        | "UPDATE_PRODUCT_SUCCESS"
        | "DELETE_PRODUCT_BEGIN"
        | "DELETE_PRODUCT_SUCCESS";
    }
  | { type: "GET_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "GET_SINGLE_PRODUCT_SUCCESS"; payload: Product }
  | {
      type: "UPDATE_SORT";
      payload: "price-lowest" | "price-highest" | "date-latest" | "date-oldest";
    }
  | {
      type: "UPDATE_FILTERS";
      payload: {
        name: string;
        value: string | boolean;
      };
    }
  | { type: "CREATE_PRODUCT_ERROR"; payload: string }
  | { type: "UPDATE_PRODUCT_ERROR"; payload: string }
  | { type: "DELETE_PRODUCT_ERROR"; payload: string };

export const products_reducer: Reducer<InitialState, ProductsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "GET_PRODUCTS_BEGIN": {
      return { ...state, products_loading: true };
    }

    case "GET_PRODUCTS_SUCCESS": {
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      };
    }

    case "GET_PRODUCTS_ERROR": {
      return { ...state, products_loading: false, products_error: true };
    }

    case "GET_SINGLE_PRODUCT_BEGIN": {
      return { ...state, single_product_loading: true };
    }

    case "GET_SINGLE_PRODUCT_SUCCESS": {
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };
    }

    case "GET_SINGLE_PRODUCT_ERROR": {
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    }

    case "UPDATE_SORT": {
      return {
        ...state,
        sort: action.payload,
      };
    }

    case "UPDATE_FILTERS": {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    }

    case "CLEAR_FILTERS": {
      return {
        ...state,
        filters: {
          search: "",
          category: "All",
          featured: false,
        },
      };
    }

    case "CREATE_PRODUCT_BEGIN": {
      return { ...state, create_product_loading: true };
    }

    case "CREATE_PRODUCT_SUCCESS": {
      return { ...state, create_product_loading: false };
    }

    case "CREATE_PRODUCT_ERROR": {
      return {
        ...state,
        create_product_loading: false,
        create_product_error: action.payload,
      };
    }

    case "UPDATE_PRODUCT_BEGIN": {
      return { ...state, update_product_loading: true };
    }

    case "UPDATE_PRODUCT_SUCCESS": {
      return { ...state, update_product_loading: false };
    }

    case "UPDATE_PRODUCT_ERROR": {
      return {
        ...state,
        update_product_loading: false,
        update_product_error: action.payload,
      };
    }

    case "DELETE_PRODUCT_BEGIN": {
      return { ...state, delete_product_loading: true };
    }

    case "DELETE_PRODUCT_SUCCESS": {
      return { ...state, delete_product_loading: false };
    }

    case "DELETE_PRODUCT_ERROR": {
      return {
        ...state,
        delete_product_loading: false,
        delete_product_error: action.payload,
      };
    }
  }
};
