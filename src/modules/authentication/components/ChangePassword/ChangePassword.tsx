import { useEffect } from "react";
import logo from "../../../../assets/images/PMS-logo.png";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../../../validations";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance, HEADERS } from "../../../../api";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../../shared/components/PasswordInput/PasswordInput";
import { ChangePasswordPayload } from "../../../../interface/AuthResponse/AuthResponse";

function ChangePassword() {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<ChangePasswordPayload>({ mode: "onChange" });

  let navigate = useNavigate();

  const onSubmit = async (data: ChangePasswordPayload): Promise<void> => {
    console.log(data);
    try {
       await axiosInstance.put<string>(
        AUTH_URLS.changePassword,
        data,
        HEADERS
      );
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
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
                <PasswordInput
                  label={"Old password"}
                  placeholder={"Enter your Old Password"}
                  registerInput={register("oldPassword", {
                    required: "Old password is required",
                  })}
                />
                {errors.oldPassword && (
                  <span className="text-danger ">
                    {errors.oldPassword.message}
                  </span>
                )}

                {/*new password */}
                <PasswordInput
                  label={"New password"}
                  placeholder={"Enter your New Password"}
                  registerInput={register("newPassword", PasswordValidation)}
                />
                {errors.newPassword && (
                  <span className="text-danger ">
                    {errors.newPassword.message}
                  </span>
                )}

                {/*Confirm new password */}
                <PasswordInput
                  label={"Confirm new password"}
                  placeholder={"Confirm New Password"}
                  registerInput={register("confirmNewPassword", {
                    required: "Confirm new password is required",
                    validate: (confirmNewPassword) => {
                      return confirmNewPassword == password
                        ? true
                        : "Passwords do not match";
                    },
                  })}
                />
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
