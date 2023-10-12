import { AiOutlineCheckSquare } from "react-icons/ai";

const WorkOut = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-[#1D0E15] dark:bg-white">
      <div className=" container mx-auto px-4 max-w-7xl">
        <div className="md:flex md:items-center md:justify-between gap-5">
          {/* Text */}
          <div className="mb-8 md:mb-0 md:w-2/6 relative">
            <img
              className="mb-5 animate-spin-slow"
              src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/circle_image.png"
              alt=""
            />
            <p className="font-bold mb-4 uppercase text-orange-600 text-lg">
              Back to the gym
            </p>
            <h1 className="text-2xl md:text-5xl font-semibold dark:text-black text-white">
              Join With SoulSync Upgrade Your Life
            </h1>
            <p className="text-lg text-gray-400 dark:text-gray-500 my-6">
              By highlighting the benefits of daily workouts and staying active,
              such as improved fitness, increased energy levels, enhanced mood,
              and overall well-being
            </p>
            <div className="text-lg text-gray-200 dark:text-gray-500 my-6 space-y-4">
              <p className="flex items-center gap-4">
                <AiOutlineCheckSquare className="text-orange-500" size={25} />{" "}
                How to Support your Immume System
              </p>
              <p className="flex items-center gap-4">
                <AiOutlineCheckSquare className="text-orange-500" size={25} /> A
                30 Day Fitness & Workout Challenges
              </p>
              <p className="flex items-center gap-4">
                <AiOutlineCheckSquare className="text-orange-500" size={25} />{" "}
                Guide To Ease Your Back In The Gym
              </p>
              <p className="flex items-center gap-4">
                <AiOutlineCheckSquare className="text-orange-500" size={25} />{" "}
                The Mental Health Benefits of Exercise
              </p>
            </div>
            {/* <img
              src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/squre_image_2.png"
              alt=""
              className="absolute right-0 animate-spin-slow"
            /> */}
          </div>
          {/* <img
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/squre_image_2.png"
                    alt=""
                  /> */}

          {/* Image */}
          <div className="relative hidden md:block md:w-4/6">
            <img
              src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/squre_image.png"
              alt=""
              className="absolute left-[45%] animate-spin-slow dark:filter dark:invert"
            />
            <img
              className="mx-auto h-64 sm:h-full w-auto z-10 object-contain"
              src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2021/04/join-us-image.png"
              alt="Workout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOut;
