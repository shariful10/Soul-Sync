import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useBookings = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    refetch,
    data: bookings = [],
    isLoading,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    // enabled: !loading,
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/my-bookings?email=${user?.email}`);
      // console.log("res from axios", res);
      return res.data;
    },
    // enabled: !!user && loading,
  });
  return [bookings, refetch, isLoading];
};

export default useBookings;
