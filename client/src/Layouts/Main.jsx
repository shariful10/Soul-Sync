import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
