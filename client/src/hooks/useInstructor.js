import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: isInstructor,
    isLoading: isInstructorLoading,
    error,
  } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
        // console.log("isInstructor Res:", res);
        return res.data.instructor;
      } catch (error) {
        throw new Error(error.response?.data?.message || "UnAuthorized access");
      }
    },
  });
  return [isInstructor, isInstructorLoading, error];
};

export default useInstructor;
