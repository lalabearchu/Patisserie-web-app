import { UserData, InitialState } from "./auth-context";
import { Reducer } from "react";

type AuthActions =
  | {
      type:
        | "LOGIN_BEGIN"
        | "REGISTER_BEGIN"
        | "LOGOUT"
        | "GET_CURRENT_USER_BEGIN"
        | "UPDATE_USER_BEGIN"
        | "UPDATE_PASSWORD_BEGIN"
        | "UPDATE_PASSWORD_SUCCESS";
    }
  | { type: "LOGIN_SUCCESS"; payload: UserData }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "REGISTER_SUCCESS"; payload: UserData }
  | { type: "REGISTER_ERROR"; payload: string }
  | { type: "GET_CURRENT_USER_SUCCESS"; payload: UserData }
  | { type: "UPDATE_USER_SUCCESS"; payload: UserData }
  | { type: "UPDATE_USER_ERROR"; payload: string }
  | { type: "UPDATE_PASSWORD_ERROR"; payload: string };

export const auth_reducer: Reducer<InitialState, AuthActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "LOGIN_BEGIN": {
      return { ...state, login_loading: true };
    }

    case "LOGIN_SUCCESS": {
      return { ...state, login_loading: false, user: action.payload };
    }

    case "LOGIN_ERROR": {
      return { ...state, login_loading: false, login_error: action.payload };
    }

    case "REGISTER_BEGIN": {
      return { ...state, register_loading: true };
    }

    case "REGISTER_SUCCESS": {
      return { ...state, register_loading: false, user: action.payload };
    }

    case "REGISTER_ERROR": {
      return {
        ...state,
        register_loading: false,
        register_error: action.payload,
      };
    }

    case "LOGOUT": {
      return { ...state, user: null };
    }

    case "GET_CURRENT_USER_BEGIN": {
      return { ...state, get_current_user_loading: true };
    }

    case "GET_CURRENT_USER_SUCCESS": {
      return {
        ...state,
        get_current_user_loading: false,
        user: action.payload,
      };
    }

    case "UPDATE_USER_BEGIN": {
      return { ...state, update_user_loading: true };
    }

    case "UPDATE_USER_SUCCESS": {
      return { ...state, update_user_loading: false, user: action.payload };
    }

    case "UPDATE_USER_ERROR": {
      return {
        ...state,
        update_user_loading: false,
        update_user_error: action.payload,
      };
    }

    case "UPDATE_PASSWORD_BEGIN": {
      return { ...state, update_password_loading: true };
    }

    case "UPDATE_PASSWORD_SUCCESS": {
      return { ...state, update_password_loading: false };
    }

    case "UPDATE_PASSWORD_ERROR": {
      return {
        ...state,
        update_password_loading: false,
        update_password_error: action.payload,
      };
    }
  }
};
