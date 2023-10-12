import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyClassCard from "./MyClassCard";
import Loader from "../../../../components/Loader";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/my-classes?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(enrolledClasses);

  return (
    <>
      <Helmet>
        <title>Soul Sync | My Enrolled Classes</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 p-5">
        {isLoading && <Loader />}
        {enrolledClasses
          .filter((course) => course.status === "Approved")
          .map((course) => (
            <MyClassCard key={course._id} course={course} />
          ))}
      </div>
    </>
  );
};

export default MyClasses;
