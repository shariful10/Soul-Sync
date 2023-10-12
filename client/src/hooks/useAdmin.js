import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    error,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);
        // console.log("isAdmin Res:", res);
        return res.data.admin;
      } catch (error) {
        throw new Error(error.response?.data?.message || "UnAuthorized access");
      }
    },
  });
  return [isAdmin, isAdminLoading, error];
};

export default useAdmin;
