import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth-context";

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
