import { useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { AuthContext } from "../../../context/AuthProvider";
import toast from "react-hot-toast";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  // const data = useCart();
  const [cart] = useCart();
  // console.log(data);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact Us</NavLink>
      </li>
      <li>
        <NavLink to={"#"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/menu"}>Our Menu</NavLink>
      </li>
      <li>
        <NavLink to={`/order/salad`}>Order</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to={"/login"}>Sign In</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Sign Up</NavLink>
          </li>
        </>
      )}
    </>
  );
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("User logged out successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="navbar bg-white/50 backdrop-blur-lg fixed top-0 left-0 right-0 w-full z-50 text-gray-900 shadow-md border-b border-gray-300 px-2 md:px-[34px] lg:px-[34px] xl:px-[34px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          BISTRO BOSS
          <br />
          RESTAURANT
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex justify-end items-center gap-5">
        {user && (
          <>
            <div className="dropdown dropdown-end">
              <NavLink to={"/dashboard/cart"} tabIndex={0} role="button">
                <div className="indicator">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {/* Cart Items Quantity */}
                  <span className="badge badge-sm indicator-item font-bold bg-gray-200">
                    {cart.length}
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="flex items-center gap-[15px]">
              <div
                className="flex items-center gap-[10px] cursor-pointer relative"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <div className="relative">
                  <img
                    src={
                      user
                        ? user?.photoURL
                        : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
                    }
                    alt={user?.displayName}
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                </div>

                <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
                  {user ? user.displayName : "Dhon Deo"}
                </h1>

                <div
                  className={`${
                    accountMenuOpen
                      ? "translate-y-0 opacity-100 z-[1]"
                      : "translate-y-[10px] opacity-0 z-[-1]"
                  } bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                >
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <FiUser />
                    View Profile
                  </p>
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <IoSettingsOutline />
                    Settings
                  </p>
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <FiUser />
                    View Profile
                  </p>

                  <div className="mt-3 border-t border-gray-200 pt-[5px]">
                    <p
                      onClick={handleLogout}
                      className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                    >
                      <TbLogout2 />
                      Logout
                    </p>
                  </div>
                </div>

                <IoIosArrowUp
                  className={`${
                    accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                  } transition-all duration-300 text-gray-600 sm:block hidden`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
