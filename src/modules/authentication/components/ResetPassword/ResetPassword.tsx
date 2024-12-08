import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosErrorResponse, ResetPasswordFormData } from "../../../../interface/AuthResponse/AuthResponse";
import { AxiosError } from "axios";
import { AUTH_URLS, axiosInstance } from "../../../../api";
import { toast } from "react-toastify";
import AuthShared from "../AuthShared/AuthShared";
import { emailValidation, PasswordValidation, RequiredField } from "../../../../validations";
import logo from "../../../../assets/images/Auth-logo.png";
import bgImage from "../../../../assets/images/bg1.png"
import PasswordInput from "../../../shared/components/PasswordInput/PasswordInput";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

 

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: { email: "", password: "", confirmPassword: "", seed: "" },
  });



  // Function to handle form submission
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await axiosInstance.post(AUTH_URLS.resetPassword, data);
      toast.success(
        response.data.message ||
          "Password reset successful. Please check your email for further instructions."
      );
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Something went wrong. We couldn't reset your password. Please try again."
      );
    }
  };

  const isRegisterRoute = location.pathname === "/register";

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container-fluid h-100">
        <div
          className={`row justify-content-center align-items-center ${
            isRegisterRoute ? "h-100" : "vh-100"
          }`}
          style={{ minHeight: "100vh" }}
        >
          <div className={`col-md-5 ${isRegisterRoute ? "w-100 mt-md-5" : ""}`}>
            {!isRegisterRoute && (
              <>
                <div className="img-logo text-center my-3">
                  <img src={logo} alt="Auth-logo" />
                </div>
                <div className="auth-item rounded rounded-4 p-5 pt-3">
                  <AuthShared
                    welcomeText={"welcome to PMS"}
                    title={"eset Password"}
                    firstLetter={"R"}
                  />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email field */}
                    <div className="my-2 my-md-3">
                      <label className="main-colr my-1">E-mail</label>
                      <div className="input-group">
                        <input
                         id="Info-Input"
                          type="text"
                          className="Inputs form-control"
                          placeholder="Enter your E-mail"
                          {...register("email", emailValidation)}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-danger">
                          {String(errors.email.message)}
                        </span>
                      )}
                    </div>

                    {/* OTP Verification */}
                    <div className="my-4">
                      <label className="main-colr my-1">OTP Verification</label>
                      <div className="input-group">
                        <input
                          id="Info-Input"
                          type="text"
                          className="Inputs form-control"
                          placeholder="Enter Verification"
                          {...register("seed", RequiredField("OTP"))}
                        />
                      </div>
                      {errors.seed && (
                        <span className="text-danger">
                          {String(errors.seed.message)}
                        </span>
                      )}
                    </div>

                    {/* New Password */}
                    <PasswordInput
                      label="New Password"
                      placeholder="Enter your New Password"
                      registerInput={register("password", PasswordValidation)}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {String(errors.password.message)}
                      </span>
                    )}

                    {/* Confirm Password */}
                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Confirm New Password"
                      registerInput={register("confirmPassword", {
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <span className="text-danger">
                        {String(errors.confirmPassword.message)}
                      </span>
                    )}

                    {/* Submit Button */}
                    <div className="main-bg rounded-pill mt-5">
                      <button
                        className="btn text-white border-0 w-100 py-2 py-md-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>
                            please wait...{" "}
                            <i className="fa-solid fa-spinner fa-spin mx-1"></i>
                          </span>
                        ) : (
                          "Save"
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

export default ResetPassword;
