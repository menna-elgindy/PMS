import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { ArrowIcon } from "../SvgIcons/SvgIcons";
import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.css";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";
const DropdownMenu = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setLoginData } = authContext;

  return (
    <Nav className={styles["nav-dropdown-menu"]}>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={<ArrowIcon />}
        menuVariant="light"
      >
        <NavDropdown.Item
          as={Link}
          to="/change-password"
          className={styles["dropdown-item"]}
        >
          Change Password
        </NavDropdown.Item>
        <NavDropdown.Item
          className={styles["dropdown-item"]}
          onClick={() => {
            localStorage.clear();
            setLoginData(null);
          }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default DropdownMenu;
