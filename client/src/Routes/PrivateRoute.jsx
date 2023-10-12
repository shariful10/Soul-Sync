import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user?.email) {
    return children;
  }

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    toast.warning("Login Required", {
      position: "top-center",
      theme: "light",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
