import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const AddItem = () => {
  const imageHostingToken = import.meta.env.VITE_IMGBB_API_KEY;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const { user } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const photoUrl = imgResponse.data.display_url;
          const { name, price, seats: available_seats } = data;
          const newClass = {
            image: photoUrl,
            name,
            instructor: user?.displayName,
            instructor_email: user?.email,
            available_seats,
            enrolled_students: 0,
            price: parseFloat(price),
            status: "Pending",
            admin_feedback: "",
          };
          axiosSecure.post("/add-class", newClass).then((postData) => {
            // console.log("After Posting: ", { postData });
            if (postData.data.insertedId) {
              reset();
              toast.success("Item Added Successfully!", {
                position: "top-center",
                theme: "light",
              });
            }
          });
        }
      });
  };

  return (
    <div className="container mx-auto p-5 2xl:p-0">
      <Helmet>
        <title>Soul Sync | Add Class</title>
      </Helmet>
      <div className="w-full md:max-w-3xl mx-auto dark:bg-gray-900 bg-gray-200 p-5 md:p-20 rounded-xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2  font-medium text-gray-900 dark:text-white"
            >
              Class Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Class Name"
              required
            />
          </div>

          <div className="mb-6 w-full">
            <label
              htmlFor="price"
              className="block mb-2  font-medium text-gray-900 dark:text-white"
            >
              Price*
            </label>
            <input
              type="text"
              id="price"
              name="price"
              {...register("price")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Price"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="seats"
              className="block mb-2  font-medium text-gray-900 dark:text-white"
            >
              Available Seats*
            </label>
            <input
              type="text"
              id="seats"
              name="seats"
              {...register("seats")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Seats"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <input
              type="file"
              className="file-input w-full max-w-xs dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
              {...register("image")}
            />
          </div>
          <div className="text-center md:text-left">
            <button
              type="submit"
              className="flex mx-auto md:mx-0 items-center gap-2 bg-gray-800 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-10 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Classes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
