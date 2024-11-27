import { useEffect, useState } from "react";
import logo from "../../../../assets/images/PMS-logo.png";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../../../validations";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance, HEADERS } from "../../../../api";

import { useNavigate } from "react-router-dom";

function ChangePassword() {
  interface formDataInputs {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }

  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<formDataInputs>({ mode: "onChange" });

  let navigate = useNavigate();

  let [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: formDataInputs): Promise<void> => {
    console.log(data);
    try {
      let response = await axiosInstance.put<string>(
        AUTH_URLS.changePassword,
        data,
        HEADERS
      );
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  let password = watch("newPassword");
  let confirmPassword = watch("confirmNewPassword");
  useEffect(() => {
    if (confirmPassword) trigger("confirmNewPassword");
  }, [password, confirmPassword, trigger]);

  return (
    <>
      <div className="container-fluid change-pass-bg">
        <div className="row justify-content-center align-items-center change-pass-container">
          <div className="col-md-6 text-center">
            <img
              src={logo}
              alt="logo"
              style={{ width: "312px", height: "91px" }}
            />
            <div className="change-pass-form-wrapper">
              <p className="form-welcome">welcome to PMS</p>
              <h3 className="form-title">
                <span style={{ textDecorationLine: "underline" }}>C</span>hange
                password
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className=" text-start">
                {/*old password */}
                <div>
                  <label className="input-label">Old password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-from"
                      placeholder="Enter your Old Password"
                      aria-label="old password"
                      aria-describedby="basic-addon1"
                      {...register("oldPassword", {
                        required: "Old password is required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault();
                      }}
                      className="toggle-password-btn"
                    >
                      <span className="sr-only">
                        {showPassword ? "hide password" : "show password"}
                      </span>
                      <i
                        className={`fa-regular ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
                {errors.oldPassword && (
                  <span className="text-danger ">
                    {errors.oldPassword.message}
                  </span>
                )}
                {/*new password */}
                <div>
                  <label className="input-label">New password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-from"
                      placeholder="Enter your New Password"
                      aria-label="new password"
                      aria-describedby="basic-addon1"
                      {...register("newPassword", PasswordValidation)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault();
                      }}
                      className="toggle-password-btn"
                    >
                      <span className="sr-only">
                        {showPassword ? "hide password" : "show password"}
                      </span>
                      <i
                        className={`fa-regular ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
                {errors.newPassword && (
                  <span className="text-danger ">
                    {errors.newPassword.message}
                  </span>
                )}
                {/*Confirm new password */}
                <div>
                  <label className="input-label">Confirm new password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-from"
                      autoFocus={false}
                      placeholder="Confirm New Password"
                      aria-label="confirm new password"
                      aria-describedby="basic-addon1"
                      {...register("confirmNewPassword", {
                        required: "Confirm new password is required",
                        validate: (confirmNewPassword) => {
                          return confirmNewPassword == password
                            ? true
                            : "Passwords do not match";
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault();
                      }}
                      className="toggle-password-btn"
                    >
                      <span className="sr-only">
                        {showPassword ? "hide password" : "show password"}
                      </span>
                      <i
                        className={`fa-regular ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        } `}
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
                {errors.confirmNewPassword && (
                  <span className="text-danger ">
                    {errors.confirmNewPassword.message}
                  </span>
                )}
                <button className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "...Loading" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
