import { MdChair } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const MyClassCard = ({ course }) => {
  const { image, name, available_seats, enrolled_students, price, instructor } =
    course;

  return (
    <>
      {course.length === 0 && (
        <h1 className="text-4xl font-bold text-white">
          You didn`t Pay for any classes{" "}
        </h1>
      )}
      <div
        className={`card border border-gray-700 dark:border-gray-200 shadow-xl  text-white dark:text-black group ${
          available_seats === 0 && "bg-red-600"
        } `}
      >
        <figure>
          <img
            src={image}
            alt="Shoes"
            className="group-hover:scale-125 duration-700 relative"
          />
          <p className="absolute top-5 right-5 font-medium px-5 rounded py-1 bg-orange-600 text-white">
            ${price}
          </p>
        </figure>
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div
              className={`flex items-center gap-3 ${
                available_seats === 0 ? "text-white" : "text-orange-600"
              }`}
            >
              <MdChair size={22} />
              <p>{available_seats} Available Seats</p>
            </div>
            <div
              className={`flex items-center gap-3 ${
                available_seats === 0 ? "text-white" : "text-orange-600"
              }`}
            >
              <FaUserFriends size={22} />
              <p>{enrolled_students} Students</p>
            </div>
          </div>
          <h2 className={`card-title ${available_seats === 0 && "text-white"}`}>
            {name.length > 35 ? name.slice(0, 32) + "..." : name}
          </h2>

          <div className="mt-5 flex items-center gap-3">
            <label tabIndex={0} className="avatar">
              <div className="w-6 h-6 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <p className={`${available_seats === 0 && "text-white"}`}>
              <span className="font-semibold">{instructor}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClassCard;
