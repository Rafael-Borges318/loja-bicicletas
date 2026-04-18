import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/common/Loading";

export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
