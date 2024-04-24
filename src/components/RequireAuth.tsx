import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: { allowedRoles: Array<number> }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role: number) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.usuario ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
