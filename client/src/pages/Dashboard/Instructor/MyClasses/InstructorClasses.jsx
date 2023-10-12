import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../../../components/Loader";
import InstructorClassesCard from "./InstructorClassesCard";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const InstructorClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: instructorClasses = [], isLoading } = useQuery({
    queryKey: ["instructorClasses"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/instructor-classes?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(instructorClasses);

  return (
    <div className="p-5">
      <Helmet>
        <title>Soul Sync | My Added Class</title>
      </Helmet>
      <div className="bg-[#f7f7f7] dark:bg-white dark:shadow-md max-w-6xl mx-auto p-10 rounded-md">
        {isLoading && <Loader />}
        <div className="overflow-x-auto my-10">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th className="text-center">Total Student</th>
                <th className="text-center">Available Seats</th>
                <th className="text-center">Admin Feedback</th>
                <th className="text-right">Price</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {instructorClasses.map((item, index) => (
                <InstructorClassesCard
                  key={item._id}
                  item={item}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorClasses;
