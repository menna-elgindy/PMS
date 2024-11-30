import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { ArrowIcon } from "../SvgIcons/SvgIcons";
const DropdownMenu = () => {
  return (
    <Nav className="">
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={<ArrowIcon />}
        menuVariant="light"
        className=""
      >
        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </Nav>
  );
};

export default DropdownMenu;
