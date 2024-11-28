
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../../../assets/images/Auth-logo.png";

export default function AuthLayout() {
  const location = useLocation();

  const isRegisrerRoute = location.pathname === "/register";

  return (
    <div className="auth-container">
      <div className="container-fluid h-100">
        <div
          className={`row justify-content-center align-items-center ${isRegisrerRoute ? "h-100" : "vh-100"}`}
          style={{ minHeight: "100vh" }} 
        >
          <div className={`col-md-5  ${isRegisrerRoute ? "w-100 mt-md-5" : ""}`}>
            {isRegisrerRoute ? (
              <Outlet />
            ) : (
              <>
                <div className="img-logo text-center my-3">
                  <img src={logo} alt="Auth-logo" />
                </div>
                <div className="auth-item rounded rounded-4 p-5 pt-3">
                  <Outlet />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

