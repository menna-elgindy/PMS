import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

const MasterLayout = () => {
  return (
    <div className="master-content">
      <Navbar />
      <SideBarMenu />
      <div className="main-content d-flex  mt-5 w-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default MasterLayout;
