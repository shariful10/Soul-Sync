import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { AuthContext } from "../../../providers/AuthProvider";
import newLogo from "../../../assets/newLogo.png";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import useStudent from "../../../hooks/useStudent";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const htmlTag = document.querySelector("html");
    htmlTag.classList.toggle("dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navMenuList = (
    <>
      <li className="">
        <Link to="/">Home</Link>
      </li>
      <li className="">
        <Link to={"/courses"}>Courses</Link>
      </li>
      <li className="">
        <Link to={"/instructors"}>Instructors</Link>
      </li>
      {user && (
        <li>
          <Link
            to={
              isAdmin
                ? "/dashboard/manage-classes"
                : isInstructor
                ? "/dashboard/instructor-classes"
                : isStudent && "/dashboard/my-bookings"
            }
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div
      className={`navbar fixed z-10 ${
        scrolling
          ? "bg-white text-black border-b border-b-gray-200"
          : "bg-black dark:bg-white bg-opacity-20 dark:text-black text-white"
      }`}
    >
      <div className="max-w-7xl container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-8 shadow bg-base-100 text-black rounded-box w-52"
            >
              {navMenuList}
            </ul>
          </div>
          <Link
            className={`btn btn-ghost normal-case text-xl dark:filter dark:invert  ${
              scrolling ? "" : "filter invert"
            }`}
            to={"/"}
          >
            <img
              src={newLogo}
              alt=""
              className="w-20 h-20 dark:filter dark:invert"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-lg">
            {navMenuList}
          </ul>
        </div>
        <div className="navbar-end flex justify-end ">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-white"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-8 shadow bg-base-100 text-black rounded-box w-52"
              >
                <p>
                  <small>Hello! </small>
                  <strong>{user?.displayName}</strong>
                </p>
                <li className="">
                  <Link to="/dashboard/my-bookings" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li className="">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="">
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"}>
              <button
                className={`py-3 px-8 rounded bg-orange-600 dark:bg-orange-500 dark:text-white font-semibold uppercase ${
                  scrolling && "text-white"
                }`}
              >
                Login
              </button>
            </Link>
          )}
          <div className={`flex items-center ms-5 ${darkMode ? "dark" : ""}`}>
            <button
              onClick={toggleDarkMode}
              className={`dark:text-black ${
                scrolling ? "text-black" : "text-white"
              }`}
            >
              {darkMode ? (
                <BsFillSunFill size={20} />
              ) : (
                <BsMoonStarsFill size={20} />
              )}
            </button>
            {/* Rest of your component */}
          </div>
          {/* <Link className="btn" to="/login">
              Login
            </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
