import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
const DropdownMenu = () => {
  return (
    <Nav className="">
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={
          <svg
            width="34"
            height="10"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00004 7.75004C6.8402 7.75004 6.6802 7.68895 6.55816 7.56691L0.308164 1.31691C0.0639453 1.0727 0.0639453 0.677227 0.308164 0.433164C0.552383 0.189102 0.947851 0.188945 1.19191 0.433164L7.00004 6.24129L12.8082 0.433164C13.0524 0.188945 13.4479 0.188945 13.6919 0.433164C13.936 0.677383 13.9361 1.07285 13.6919 1.31691L7.44191 7.56691C7.31988 7.68895 7.15988 7.75004 7.00004 7.75004Z"
              fill="#A7A7A7"
            />
          </svg>
        }
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
