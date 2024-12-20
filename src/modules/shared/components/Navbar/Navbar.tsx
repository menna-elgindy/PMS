import styles from "./Navbar.module.css";
import logo from "../../../../assets/images/logo_pms.png";
import profileImg from "../../../../assets/images/no-profile-picture.jpg";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useCallback } from "react";
import { axiosInstance, IMAGE_URL, USERS_URLS } from "../../../../api";
import { UsersListResponse } from "../../../../interface/users/ApiResponseForUser";
import useFetch from "../../../../hooks/useFetch";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const getCurrentUser = useCallback(async () => {
    const response = await axiosInstance.get<UsersListResponse>(
      USERS_URLS.GetCurrentUserUrl
    );
    return response?.data;
  }, []);
  const { data: user, loading: userLoading } =
    useFetch<UsersListResponse>(getCurrentUser);

  return (
    <>
      {!userLoading && (
        <div
          className={`${styles["navbar"]}  shadow-sm  position-fixed d-flex 
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
            {/* <i className={`fa fa-bell ${styles["bell"]}  `} /> */}
            <ThemeToggle />
            <div
              className={`${styles["profile-container"]} d-flex ps-3  w-25
       align-items-center  border border-end-0  border-top-0 border-bottom-0`}
            >
              <img
                src={user?.imagePath ? IMAGE_URL + user?.imagePath : profileImg}
                className=" rounded-circle pe-1 "
                alt="profile image"
              />

              <div className={`d-flex flex-column ${styles["profile"]}`}>
                <h5 className="m-0 fs-6">{user?.userName && user?.userName}</h5>
                <span className={` ${styles["email"]}  `}>
                  {user?.email && user?.email}
                </span>
              </div>
              <DropdownMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;