import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth-context";

export const LoginRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
