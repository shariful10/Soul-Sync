import { FaCalendarAlt, FaUser } from "react-icons/fa";

const BlogCard = ({ image }) => {
  return (
    <div
      className={`card border border-gray-700 dark:border-gray-200 shadow-xl  text-white dark:text-black group `}
    >
      <figure>
        <img
          src={image}
          alt="Shoes"
          className="group-hover:scale-125 duration-700"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className={`flex items-center gap-3`}>
            <p className="text-orange-600">GYM</p>
          </div>
        </div>
        <h2 className={`card-title `}>Gyms are often crowded places where</h2>

        <div className="mt-5 flex justify-between items-center w-full">
          <p className="flex gap-2 items-center">
            <FaUser className="text-orange-600" />
            <span className="font-semibold">admin</span>
          </p>
          <p className="flex gap-2 items-center">
            <FaCalendarAlt className="text-orange-600" />
            <span className="font-semibold">February 22, 2023</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
