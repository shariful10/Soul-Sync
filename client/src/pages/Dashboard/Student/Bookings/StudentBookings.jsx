import { AiFillCreditCard } from "react-icons/ai";
import { Link } from "react-router-dom";
import useBookings from "../../../../hooks/useBookings";
import { Helmet } from "react-helmet-async";
import BookingItem from "./BookingItem";
import Loader from "../../../../components/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const StudentBookings = () => {
  const [bookings, refetch, isLoading] = useBookings();

  const totalPrice = bookings.reduce(
    (sum, item) => parseInt(item.price) + sum,
    0
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/delete-booking/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetch();
              toast.success(`Class has been Removed.`, {
                position: "top-center",
                theme: "dark",
              });
            }
          });
      }
    });
  };

  return (
    <div className="p-5">
      <Helmet>
        <title>Soul Sync | My Selected Class</title>
      </Helmet>
      <div className="bg-[#f7f7f7] dark:bg-white dark:shadow-md max-w-6xl mx-auto p-10 rounded-md">
        {isLoading && <Loader />}

        <div className="flex justify-between items-center text-xl font-semibold bg-gray-800 py-5 px-8 rounded-lg text-white dark:bg-gray-200 dark:text-black">
          <h4>Total Items: {bookings.length}</h4>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
        <div className="overflow-x-auto my-10">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th className="text-right">Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item, index) => (
                <BookingItem
                  key={item._id}
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        {bookings.length !== 0 && (
          <Link to="/dashboard/payment">
            <button className="bg-amber-500 py-3 px-10 rounded-md text-white font-semibold uppercase flex gap-3 items-center mx-auto">
              <AiFillCreditCard /> Proceed to Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudentBookings;
