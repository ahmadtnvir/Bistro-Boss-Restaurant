import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/components/shared/Footer";
import Navbar from "../pages/components/shared/Navbar";

const Root = () => {
  const location = useLocation();
  // console.log(location.pathname);
  const path = location.pathname === "/login";
  const path2 = location.pathname === "/register";
  // console.log(path);
  return (
    <div>
      {path || path2 || <Navbar></Navbar>}
      <Outlet></Outlet>
      {path || path2 || <Footer></Footer>}
    </div>
  );
};

export default Root;
