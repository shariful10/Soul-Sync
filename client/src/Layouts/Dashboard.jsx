import { Link, NavLink, Outlet } from "react-router-dom";
import { FiCalendar, FiHome } from "react-icons/fi";
import { HiOutlineBars4 } from "react-icons/hi2";
import { BsWallet2 } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaBars, FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();

  return (
    <div className="bg-[#1D0E15] dark:bg-[#f7f7f7]">
      <Helmet>
        <title>Soul Sync | Dashboard Home</title>
      </Helmet>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content md:py-10 py-5">
          {/* Page content here */}
          <div className="px-5 pt-24">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <HiOutlineBars4 />
            </label>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side pt-[103px]">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu dark:text-white dark:bg-gray-800 p-4 w-80 h-full bg-[#1D0E15] border-r text-white md:py-10">
            <div className="uppercase px-4 py-0 mb-14">
              <Link to="/">
                <h4 className="text-2xl font-bold">Soul Sync</h4>
                <p className="tracking-[.38em]">Empower your soul</p>
              </Link>
            </div>
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/manage-classes">
                    <SiGoogleclassroom />
                    Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users">
                    {" "}
                    <FaUsers /> All Users
                  </NavLink>
                </li>
              </>
            ) : isInstructor ? (
              <>
                <li>
                  <NavLink to="/dashboard/add-classes">
                    {" "}
                    <SiGoogleclassroom /> Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/instructor-classes">
                    <FiCalendar /> My Classes
                  </NavLink>
                </li>
              </>
            ) : (
              isStudent && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-bookings">
                      <FiCalendar /> My Selected Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-payments">
                      {" "}
                      <BsWallet2 /> Payment History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-classes">
                      <SiGoogleclassroom /> My Enrolled Classes
                    </NavLink>
                  </li>
                </>
              )
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FiHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes">
                <FaBars /> Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/instructors">
                <SiGoogleclassroom /> Instructor
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <MdOutlineContactSupport /> Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
