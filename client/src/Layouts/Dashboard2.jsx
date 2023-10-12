import { Link, NavLink, Outlet } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { HiOutlineBars4 } from "react-icons/hi2";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaBars, FaUser } from "react-icons/fa";

const Dashboard2 = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content md:py-10 py-5">
          {/* Page content here */}
          <div className="px-5">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <HiOutlineBars4 />
            </label>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu text-black p-4 w-80 h-full bg-[#D1A054]">
            <div className="uppercase px-4 py-0 mb-14">
              <Link>Soul Sync</Link>
            </div>
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
              <NavLink to="/instructor">
                <FaUser /> Instructor
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

export default Dashboard2;
