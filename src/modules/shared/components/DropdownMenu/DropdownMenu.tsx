import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { ArrowIcon } from "../SvgIcons/SvgIcons";
import { Link } from "react-router-dom";
import style from "./DropdownMenu.module.css";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";
const DropdownMenu = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setLoginData } = authContext;

  return (
    <Nav className="">
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={<ArrowIcon />}
        menuVariant="light"
        className=""
      >
        <NavDropdown.Item>
          <Link to="/change-password" className={style["dropdown-link"]}>
            Change Password
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item
          className={style["dropdown-item "]}
          onClick={() => {
            setLoginData(null);
          }}
        >
          Logout
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </Nav>
  );
};

export default DropdownMenu;
