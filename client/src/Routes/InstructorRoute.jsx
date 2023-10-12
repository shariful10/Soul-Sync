import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import useInstructor from "../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return <Loader />;
  }

  if (user?.email && isInstructor) {
    return children;
  }

  return <Navigate to="/error" state={{ from: location }} replace />;
};

export default InstructorRoute;
