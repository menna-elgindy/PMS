import { useNavigate, useLocation } from "react-router-dom";
import AuthShared from "../AuthShared/AuthShared";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AxiosErrorResponse, ForgetPasswordFormData } from "../../../../interface/AuthResponse/AuthResponse";
import { AUTH_URLS } from "../../../../api";
import { emailValidation } from "../../../../validations";
import logo from "../../../../assets/images/Auth-logo.png";
import bgImage from "../../../../assets/images/bg3.png"


function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>({ defaultValues: { email: "" } });

  // Check if the current route is the register route
  const isRegisterRoute = location.pathname === "/register";

  // Function to handle form submission
  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      const response = await axios.post(AUTH_URLS.forgetPassword, data);
      toast.success(
        response.data.message ||
          "Password reset successful. Please check your email for further instructions."
      );
      navigate("/reset-password");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError?.response?.data?.message ||
          "Something went wrong. We couldn't reset your password. Please try again."
      );
    }
  };

  return (
    <div className="auth-container" style={{
		backgroundImage: `url(${bgImage})`,}}>
      <div className="container-fluid h-100">
        <div
          className={`row justify-content-center align-items-center ${isRegisterRoute ? "h-100" : "vh-100"}`}
          style={{ minHeight: "100vh" }}
        >
          <div className={`col-md-5 ${isRegisterRoute ? "w-100 mt-md-5" : ""}`}>
            {isRegisterRoute ? (
              // If register route, you can add other content here
              <div className="text-center">Register Page Content</div>
            ) : (
              <>
                <div className="img-logo text-center my-3">
                  <img src={logo} alt="Auth-logo" />
                </div>
                <div className="auth-item rounded rounded-4 p-5 pt-3">
                  {/* Title component */}
                  <AuthShared
                    welcomeText={"welcome to PMS"}
                    title={"Forget Password"}
                    firstLetter={"F"}
                  />

                  {/* Form for requesting password reset */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Input field for email */}
                    <div className="my-2 my-md-3">
                      <label className="main-colr my-1">E-mail</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your E-mail"
                          aria-label="email"
                          {...register("email", emailValidation)}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-danger">{String(errors.email.message)}</span>
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="main-bg rounded-pill mt-5">
                      <button
                        className="btn text-white border-0  w-100 py-2 py-md-3 "
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>
                            please wait...{" "}
                            <i className="fa-solid fa-spinner fa-spin mx-1"></i>
                          </span>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
