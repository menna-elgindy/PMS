import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

const MasterLayout = () => {
  return (
    //col
    <div className="d-flex flex-column master-content  ">
      <Navbar />
      {/* <div className=" mt-5  w-100"> */}
      <SideBarMenu />
      <div className="main-content d-flex w-auto ps-3 mt-5">
        <Outlet />
      </div>
      {/* </div> */}
    </div>
  );
};

export default MasterLayout;
