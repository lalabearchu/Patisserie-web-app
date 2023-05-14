import {
  ReactNode,
  useReducer,
  useContext,
  createContext,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";
import { auth_reducer } from "./auth-reducer";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface InitialState {
  user: UserData | null;
  login_loading: boolean;
  login_error: string | null;
  register_loading: boolean;
  register_error: string | null;
  get_current_user_loading: boolean;
  update_user_loading: boolean;
  update_user_error: string | null;
  update_password_loading: boolean;
  update_password_error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContext extends InitialState {
  login: (input: { email: string; password: string }) => void;
  register: (input: { name: string; email: string; password: string }) => void;
  logout: () => void;
  updateUser: (input: { name: string; email: string }) => void;
  updatePassword: (input: { oldPassword: string; newPassword: string }) => void;
}

const initialState: InitialState = {
  user: null,
  login_loading: false,
  login_error: null,
  register_loading: false,
  register_error: null,
  get_current_user_loading: false,
  update_user_loading: false,
  update_user_error: null,
  update_password_loading: false,
  update_password_error: null,
};

export const AuthContext = createContext({} as AuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);

  const login = async (input: { email: string; password: string }) => {
    dispatch({ type: "LOGIN_BEGIN" });
    try {
      const res = await axios.post("/api/v1/auth/login", input);
      const user = res.data.user;
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "LOGIN_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "LOGIN_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  const register = async (input: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch({ type: "REGISTER_BEGIN" });
    try {
      const res = await axios.post("/api/v1/auth/register", input);
      const user = res.data.user;
      dispatch({ type: "REGISTER_SUCCESS", payload: user });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "REGISTER_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "REGISTER_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  const logout = async () => {
    await axios.get("/api/v1/auth/logout");
    dispatch({ type: "LOGOUT" });
  };

  const getCurrentUser = async () => {
    dispatch({ type: "GET_CURRENT_USER_BEGIN" });
    try {
      const res = await axios.get("/api/v1/users/userinfo");
      const user = res.data.user;
      dispatch({ type: "GET_CURRENT_USER_SUCCESS", payload: user });
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) return;
      logout();
    }
  };

  const updateUser = async (input: { name: string; email: string }) => {
    dispatch({ type: "UPDATE_USER_BEGIN" });
    try {
      const res = await axios.patch("/api/v1/users/updateuser", input);
      const user = res.data.user;
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: user });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "UPDATE_USER_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "UPDATE_USER_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  const updatePassword = async (input: {
    oldPassword: string;
    newPassword: string;
  }) => {
    dispatch({ type: "UPDATE_PASSWORD_BEGIN" });
    try {
      await axios.patch("/api/v1/users/updatepassword", input);
      dispatch({ type: "UPDATE_PASSWORD_SUCCESS" });
    } catch (error) {
      if (error instanceof AxiosError) {
        let msg = error.response?.data.msg;
        dispatch({ type: "UPDATE_PASSWORD_ERROR", payload: msg });
        throw new Error(msg);
      } else {
        let msg = "Something went wrong";
        dispatch({ type: "UPDATE_PASSWORD_ERROR", payload: msg });
        throw new Error(msg);
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateUser,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
