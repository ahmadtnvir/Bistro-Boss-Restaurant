import {
  FaAd,
  FaCalendar,
  FaHamburger,
  FaHome,
  FaList,
  FaListAlt,
  FaShoppingBag,
  FaShoppingCart,
  FaStar,
  FaUser,
  FaUtensilSpoon,
  FaWallet,
} from "react-icons/fa";
import { FaBook, FaMessage } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Sidebar = () => {
  const [cart] = useCart();
  // TODO: get isAdmin value from the database
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  return (
    <div className="w-[20%] min-h-screen bg-orange-300">
      <ul className="menu">
        {isAdmin ? (
          <>
            <li>
              <NavLink to={"/dashboard/adminHome"}>
                <FaHome></FaHome>
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/addItems"}>
                <FaUtensilSpoon></FaUtensilSpoon>
                Add Items
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/manageItems"}>
                <FaListAlt></FaListAlt>
                Manage Items
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/manageBookings"}>
                <FaBook></FaBook>
                Manage Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/allUsers"}>
                <FaUser></FaUser>
                All Users
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/dashboard/userHome"}>
                <FaHome></FaHome>
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/reservation"}>
                <FaCalendar></FaCalendar>
                Reservation
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/payment"}>
                <FaWallet></FaWallet>
                Make Payment
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/cart"}>
                <FaShoppingCart></FaShoppingCart>
                My Cart ({cart.length})
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/review"}>
                <FaStar></FaStar>
                Add a Review
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/bookings"}>
                <FaList></FaList>
                My Bookings
              </NavLink>
            </li>
          </>
        )}
        {/* Shared NavLinks */}
        <div className="divider"></div>
        <li>
          <NavLink to={"/"}>
            <FaHome></FaHome>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/menu"}>
            <FaHamburger></FaHamburger>
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to={"/order/salad"}>
            <FaShoppingBag></FaShoppingBag>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to={"/"}>
            <FaMessage></FaMessage>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
