import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import useStudent from "../hooks/useStudent";
import { toast } from "react-toastify";

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isStudent, isStudentLoading, error] = useStudent();
  const location = useLocation();

  if (loading || isStudentLoading) {
    return <Loader />;
  }

  if (user?.email && isStudent) {
    return children;
  }

  toast.warning(error, {
    position: "top-center",
    theme: "light",
  });

  return <Navigate to="/error" state={{ from: location }} replace />;
};

export default StudentRoute;
