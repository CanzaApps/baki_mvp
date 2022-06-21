import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

export default function RequireAuth() {
  const location = useLocation();
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
