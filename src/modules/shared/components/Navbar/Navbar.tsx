import styles from "./Navbar.module.css";
import logo from "../../../../assets/images/logo_pms.png";
import profileImg from "../../../../assets/images/no-profile-picture.jpg";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { loginData } = authContext;
  return (
    <div
      className={`${styles["navbar"]} bg-white shadow-sm  position-fixed d-flex 
        justify-content-between  `}
    >
      <div className={`${styles["logo-container"]} d-flex py-2`}>
        <img
          className={`${styles["logo"]} w-auto px-3`}
          src={logo}
          alt="logo"
        />
      </div>
      <div className="d-flex align-items-center gap-3">
        <i className={`fa fa-bell ${styles["bell"]}  `} />
        <div
          className={`${styles["profile-container"]} d-flex ps-3  w-25
       align-items-center  border border-end-0  border-top-0 border-bottom-0`}
        >
          <img src={profileImg} className=" rounded-circle pe-1 " alt="" />

          <div className="d-flex flex-column">
            <h5 className="m-0 fs-6">
              {loginData?.userName && loginData.userName}
            </h5>
            <span className={`text-muted ${styles["email"]}  `}>
              {loginData?.userEmail && loginData.userEmail}
            </span>
          </div>
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
