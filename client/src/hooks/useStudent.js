import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useStudent = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: { role } = {}, // Access the role property directly
    isLoading: isStudentLoading,
    error,
  } = useQuery(["isStudent", user?.email], {
    enabled: !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/student/${user?.email}`);
        // console.log("isStudent Res:", res);
        return res.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Unauthorized access");
      }
    },
  });

  const isStudent = role === "Student"; // Check if the role is "student"

  return [isStudent, isStudentLoading, error];
};

export default useStudent;
