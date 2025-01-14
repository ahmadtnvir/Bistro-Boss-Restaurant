import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../pages/components/shared/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
