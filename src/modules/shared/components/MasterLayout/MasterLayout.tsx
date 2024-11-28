import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

const MasterLayout = () => {
  return (
    <div className="d-flex flex-column w-100 ">
      <Navbar />
      <div className="master-content d-flex mt-5 ">
        <SideBarMenu />
        <div className="main-content d-flex ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
