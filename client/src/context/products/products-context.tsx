import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useReducer,
  ChangeEvent,
} from "react";
import axios, { AxiosError } from "axios";
import { products_reducer } from "./products-reducer";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InitialState {
  products_loading: boolean;
  products_error: boolean;
  products: Product[];
  featured_products: Product[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Product;

  create_product_loading: boolean;
  create_product_error: string | null;

  update_product_loading: boolean;
  update_product_error: string | null;

  delete_product_loading: boolean;
  delete_product_error: string | null;

  sort: "price-lowest" | "price-highest" | "date-latest" | "date-oldest";
  filters: {
    search: string;
    category: "All" | "Cake" | "Tart" | "Macaron" | "Cookie";
    featured: boolean;
  };
}

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContext extends InitialState {
  getProducts: () => Promise<void>;
  getSingleProduct: (id: string) => Promise<void>;
  updateSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (name: string, value: string | boolean) => void;
  clearFilters: () => void;
  createProduct: (input: {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    featured: boolean;
  }) => Promise<void>;
  updateProduct: (
    id: string,
    input: {
      name: string;
      price: number;
      description: string;
      image: string;
      category: string;
      featured: boolean;
    }
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const initialState: InitialState = {
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as Product,

  create_product_loading: false,
  create_product_error: null,

  update_product_loading: false,
  update_product_error: null,

  delete_product_loading: false,
  delete_product_error: null,

  sort: "date-latest",
  filters: {
    search: "",
    category: "All",
    featured: false,
  },
};

const ProductsContext = createContext({} as ProductsContext);

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  const getProducts = async () => {
    const {
      sort,
      filters: { search, category, featured },
    } = state;
    let url = `/api/v1/products?category=${category}&sort=${sort}`;
    if (featured) {
      url = url + `&featured=${featured}`;
    }
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: "GET_PRODUCTS_BEGIN" });
    try {
      const res = await axios.get(url);
      const products: Product[] = res.data.products;
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products });
    } catch (error) {
      dispatch({ type: "GET_PRODUCTS_ERROR" });
    }
  };

  const getSingleProduct = async (id: string) => {
    dispatch({ type: "GET_SINGLE_PRODUCT_BEGIN" });
    try {
      const res = await axios.get(`/api/v1/products/${id}`);
      const product = res.data.product;
      dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: product });
    } catch (error) {
      dispatch({ type: "GET_SINGLE_PRODUCT_ERROR" });
    }
  };

  const updateSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch({
      type: "UPDATE_SORT",
      payload: value as
        | "price-lowest"
        | "price-highest"
        | "date-latest"
        | "date-oldest",
    });
  };

  const updateFilters = (name: string, value: string | boolean) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const createProduct = async (input: {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    featured: boolean;
  }) => {
    dispatch({ type: "CREATE_PRODUCT_BEGIN" });
    try {
      await axios.post(`/api/v1/products`, input);
      dispatch({ type: "CREATE_PRODUCT_SUCCESS" });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "CREATE_PRODUCT_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "CREATE_PRODUCT_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  const updateProduct = async (
    id: string,
    input: {
      name: string;
      price: number;
      description: string;
      image: string;
      category: string;
      featured: boolean;
    }
  ) => {
    dispatch({ type: "UPDATE_PRODUCT_BEGIN" });
    try {
      await axios.patch(`/api/v1/products/${id}`, input);
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "UPDATE_PRODUCT_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "UPDATE_PRODUCT_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    dispatch({ type: "DELETE_PRODUCT_BEGIN" });
    try {
      await axios.delete(`/api/v1/products/${id}`);
      dispatch({ type: "DELETE_PRODUCT_SUCCESS" });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "DELETE_PRODUCT_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "DELETE_PRODUCT_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [
    state.sort,
    state.filters,
    state.create_product_loading,
    state.update_product_loading,
    state.delete_product_loading,
  ]);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getProducts,
        getSingleProduct,
        updateSort,
        updateFilters,
        clearFilters,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
