import { useNavigate } from "react-router-dom";
import AuthShared from "../AuthShared/AuthShared";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AxiosErrorResponse, ForgetPasswordFormData } from "../../../../interface/AuthResponse/AuthResponse";
import { AUTH_URLS } from "../../../../api";
import { emailValidation } from "../../../../validations";

function ForgetPassword() {
	const navigate = useNavigate();
	const {
	  register,
	  handleSubmit,
	  formState: { errors, isSubmitting },
	} = useForm<ForgetPasswordFormData>({ defaultValues: { email: "" } });
  
	//Function to handle form submission: Sends a POST request to the forgotPassword endpoint with form data
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
	  <>
		{/* Title component with a welcome message and page title */}
		<AuthShared
		  welcomeText={"welcome to PMS"}
		  title={"orget Password"}
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
	  </>
	);
  }

export default ForgetPassword;
