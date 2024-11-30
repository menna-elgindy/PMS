import { useContext, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./SideBarMenu.module.css";
import {
  ArrowRightIcon,
  ProjectsIcon,
  TasksIcon,
  ToggleArrowIcon,
} from "../SvgIcons/SvgIcons";
import { AuthContext } from "../../../../context/AuthContext";

const saveSideBarState = (state: { collapsed: boolean }) => {
  localStorage.setItem("sideBarState", JSON.stringify(state));
};
const getSideBarState = () => {
  const state = localStorage.getItem("sideBarState");
  return state ? JSON.parse(state) : { collapsed: true };
};

const SideBarMenu = () => {
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
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { loginData } = authContext;

  return (
    <div
      className={`sidebar-container position-fixed d-flex pt-5 z-index-1 ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            icon={
              <i className="fa fa-home " aria-hidden="true" aria-label="home" />
            }
            component={<NavLink end to="/dashboard" />}
          >
            Home
          </MenuItem>
          {loginData?.userGroup === "Manager" && (
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
          )}

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
      <div
        className={
          !isCollapsed
            ? styles["arrow-menu-item"]
            : styles["arrow-menu-item-collapsed"]
        }
        onClick={toggleCollapse}
        style={{ marginBottom: "200px" }}
      >
        {isCollapsed ? <ArrowRightIcon /> : <ToggleArrowIcon />}
      </div>
    </div>
  );
};

export default SideBarMenu;
