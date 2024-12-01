import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { emailValidation, PasswordValidation } from "../../../../validations";
import { AUTH_URLS, axiosInstance } from "../../../../api";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
import { LoginFormData } from "../../../../interface/AuthResponse/AuthResponse";

const Login = () => {
  const { saveLoginData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmitData = async (data: LoginFormData) => {
    try {
      const response = await axiosInstance.post(AUTH_URLS.login, data);
      console.log(response);
      if (response.status === 200) {
        navigate("/dashboard");
        toast.success("Login Successfully");
        localStorage.setItem("token", response?.data?.token);
        saveLoginData();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="Auth-container">
      <div className="container-fluid">
        <div className="parent-container d-flex vh-100 justify-content-center align-items-center">
          <div className="logo-container">
            <img src={logo} alt="logo" className="text-center" />
          </div>
          <div className="login-container rounded rounded-3 px-5 py-3">
            <div className="">
              <div className="titles my-5">
                <span>welcome to PMS</span>
                <h3>
                  <span className="text-underline">L</span>ogin
                </h3>
              </div>
              <form onSubmit={handleSubmit(onSubmitData)}>
                <label>E-mail</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control input-custom"
                    placeholder="Enter your E-mail"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    {...register("email", emailValidation)}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger">
                    {errors.email?.message?.toString()}
                  </span>
                )}

                <label className="mt-3">Password</label>
                <div className="input-group">
                  <input
                    type={isVisible ? "text" : "password"}
                    className="form-control input-custom"
                    placeholder="Enter your password"
                    aria-label="password "
                    {...register("password", PasswordValidation)}
                  />

                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    onClick={() => setIsVisible(!isVisible)}
                    className="input-group-text eye-btn"
                    id="basic-addon1"
                  >
                    {isVisible ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                </div>
                <h4 className="mt-2 sr-only">
                  {isVisible ? "Hide Password" : "Show Password"}
                </h4>
                {errors.password && (
                  <span className="text-danger">
                    {errors.password?.message?.toString()}
                  </span>
                )}

                <div className="links mt-3 d-flex justify-content-between">
                  <Link to="/register" className="text-decoration-none">
                    Register Now?
                  </Link>
                  <Link to="/forget-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
                <div className="login-btn">
                  <button className="btn my-4" disabled={isSubmitting}>
                    {isSubmitting ? "loading ..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
