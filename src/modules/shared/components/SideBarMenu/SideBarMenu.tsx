import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./SideBarMenu.module.css";
import { ProjectsIcon, TasksIcon, ToggleArrowIcon } from "../SvgIcons/SvgIcons";

const saveSideBarState = (state: { collapsed: boolean }) => {
  localStorage.setItem("sideBarState", JSON.stringify(state));
};
const getSideBarState = () => {
  const state = localStorage.getItem("sideBarState");
  return state ? JSON.parse(state) : { collapsed: true };
};

const SideBarMenu = () => {
  // const { loginData, removeLoginData } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    getSideBarState().collapsed
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    saveSideBarState({ collapsed: isCollapsed });
  }, [isCollapsed]);

  return (
    <div
      className={`sidebar-container position-fixed d-flex ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            icon={
              <div className={styles["arrow-menu-item-wrapper"]}>
                <div className={styles["arrow-menu-item"]}>
                  <ToggleArrowIcon />
                </div>
              </div>
            }
            className={`${styles["collapsed-arrow"]} transation-all duration-300 ease-in-out`}
          ></MenuItem>
          <MenuItem
            icon={
              <i className="fa fa-home " aria-hidden="true" aria-label="home" />
            }
            component={<NavLink end to="/dashboard" />}
          >
            Home
          </MenuItem>
          {/* {loginData?.userGroup !== "SystemUser" && ( */}
          <MenuItem
            icon={
              <i
                className="fa fa-users"
                aria-hidden="true"
                aria-label="users"
              />
            }
            component={<NavLink to="users?page=1" />}
          >
            Users
          </MenuItem>
          {/* )} */}

          <MenuItem
            icon={
              <ProjectsIcon
                color={
                  !isCollapsed && pathname === "/projects" ? "#ef9b28" : "#fff"
                }
              />
            }
            component={<NavLink to="projects" />}
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={
              <TasksIcon
                color={
                  !isCollapsed && pathname === "/tasks" ? "#ef9b28" : "#fff"
                }
              />
            }
            component={<NavLink to="tasks" />}
          >
            Tasks
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBarMenu;
