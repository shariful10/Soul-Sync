import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import bannerImage from "../../../assets/images/banner.jpg";
import "swiper/swiper-bundle.min.css";

const Banner = () => {
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div
            className="relative bg-cover bg-center text-white py-32"
            style={{
              backgroundImage: `url(${bannerImage})`,
            }}
          >
            <div className=" container mx-auto px-4 max-w-7xl py-10">
              <div className="md:flex md:items-center md:justify-between gap-20">
                {/* Text */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <img
                    className="mb-5 animate-spin-slow"
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/circle_image.png"
                    alt=""
                  />
                  <p className="font-bold mb-4 uppercase text-orange-600 text-lg">
                    Back to the gym
                  </p>
                  <h1 className="text-3xl md:text-6xl font-bold">
                    Start Your Fitness Journey Today
                  </h1>
                  <p className="text-lg text-gray-300 my-6">
                    By highlighting the benefits of daily workouts and staying
                    active, such as improved fitness, increased energy levels,
                    enhanced mood, and overall well-being
                  </p>
                  <button className="px-16 py-3 text-lg text-white font-semibold bg-orange-600 dark:bg-white dark:text-gray-900 rounded shadow-md hover:bg-orange-500">
                    Get Started
                  </button>
                </div>
                {/* <img
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/squre_image_2.png"
                    alt=""
                  /> */}

                {/* Image */}
                <div className="relative hidden md:block">
                  <img
                    className="mx-auto h-64 sm:h-[683px] w-auto z-10"
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2021/04/img-layer.png"
                    alt="Workout"
                  />
                  <img
                    className="absolute top-4 right-4 z-20 animate-bounce-slow h-28"
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/s33.png"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative bg-cover bg-center text-white py-32"
            style={{
              backgroundImage: `url(${bannerImage})`,
            }}
          >
            <div className=" container mx-auto px-4 max-w-7xl py-10">
              <div className="md:flex md:items-center md:justify-between gap-20">
                {/* Text */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <img
                    className="mb-5 animate-spin-slow"
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/circle_image.png"
                    alt=""
                  />
                  <p className="font-bold mb-4 uppercase text-orange-600 text-lg">
                    Back to the gym
                  </p>
                  <h1 className="text-3xl md:text-6xl font-bold">
                    Daily Workout and Stay Active
                  </h1>
                  <p className="text-lg text-gray-300 my-6">
                    Amidst busy schedules and sedentary lifestyles, this text
                    encourages individuals to prioritize their physical
                    well-being by dedicating time to exercise and stay active.
                  </p>
                  <button className="px-16 py-3 text-lg text-white font-semibold bg-orange-600 dark:bg-white dark:text-gray-900 rounded shadow-md hover:bg-orange-500">
                    Get Started
                  </button>
                </div>
                {/* <img
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/squre_image_2.png"
                    alt=""
                  /> */}

                {/* Image */}
                <div className="relative hidden md:block">
                  <img
                    className="mx-auto h-64 sm:h-[683px] w-auto z-10"
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2021/04/about-left-image.png"
                    alt="Workout"
                  />
                  <img
                    className="absolute top-4 left-4 z-20 animate-bounce-slow h-28"
                    src="https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/s33.png"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
