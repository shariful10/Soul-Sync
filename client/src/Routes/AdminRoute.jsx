import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (user?.email && isAdmin) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
};

export default AdminRoute;
