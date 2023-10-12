import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import User from "./User";
import Loader from "../../../../components/Loader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/manage-users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.name} an Admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((postData) => {
          console.log("After Posting: ", { postData });
          if (postData.data.modifiedCount) {
            refetch(),
              toast.success("Updated Successfully!", {
                position: "top-center",
                theme: "light",
              });
          }
        });
      }
    });
  };

  const handleMakeInstructor = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.name} an Instructor`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/instructor/${user._id}`).then((postData) => {
          console.log("After Posting: ", { postData });
          if (postData.data.modifiedCount) {
            refetch(),
              toast.success("Updated Successfully!", {
                position: "top-center",
                theme: "light",
              });
          }
        });
      }
    });
  };

  const handleMakeStudent = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.name} a Student`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/student/${user._id}`).then((postData) => {
          console.log("After Posting: ", { postData });
          if (postData.data.modifiedCount) {
            refetch(),
              toast.success("Updated Successfully!", {
                position: "top-center",
                theme: "light",
              });
          }
        });
      }
    });
  };

  return (
    <div className="p-5">
      <Helmet>
        <title>Soul Sync | Manage Users</title>
      </Helmet>
      <div className="container bg-white w-full mx-auto p-5 md:p-10 rounded-md">
        <div className=" text-xl font-semibold">
          <h4>Total Users: {users.length}</h4>
        </div>

        <div className="overflow-x-auto my-10">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <Loader />}
              {users.map((user, index) => (
                <User
                  key={user._id}
                  user={user}
                  index={index}
                  handleMakeAdmin={handleMakeAdmin}
                  handleMakeInstructor={handleMakeInstructor}
                  handleMakeStudent={handleMakeStudent}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
