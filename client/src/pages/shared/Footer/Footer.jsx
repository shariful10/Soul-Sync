import { Link } from "react-router-dom";
import newLogo from "../../../assets/newLogo.png";

const Footer = () => {
  return (
    <div className="bg-[#1D0E15] border-t dark:border-t-gray-400 border-t-gray-600 text-white dark:bg-base-200 dark:text-black">
      <footer className="footer p-10 lg:px-0 md:py-20 border-b border-b-gray-400 max-w-7xl container mx-auto">
        <div>
          <Link to={"/"}>
            <img
              src={newLogo}
              alt="LOGO"
              className="h-40 w-40 dark:invert-0 filter invert"
            />
          </Link>
          <p>
            SoulSync PVT. LTD.
            <br />
            Providing reliable health services since 2023
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      {/* <hr /> */}
      <div className="flex justify-center items-center py-10">
        &copy;copyright Wixden 2023
      </div>
    </div>
  );
};

export default Footer;
