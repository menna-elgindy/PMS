import styles from './register.module.css'
import logo from '../../../../assets/images/PMS 3.svg'
import profileImg from '../../../../assets/images/profile.svg'
import {useForm ,SubmitHandler }  from 'react-hook-form'
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Registration() {

	const [isVisible, setVisible] = useState<boolean>(false);  
	const [isRePasswordVisible, setIsRePasswordVisible] = useState<boolean>(false);  
	const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
	const [isRePasswordShown, setIsRePasswordShown] = useState<boolean>(false)

	const toggleHideShowPassword = ():void => {
		setVisible(!isVisible);
		
		setIsPasswordShown(!isPasswordShown)
		
	  };
	const toggleHideShowRePassword = ():void => {
		setIsRePasswordVisible(!isRePasswordVisible);
		
		setIsRePasswordShown(!isRePasswordShown)
		
	  };
	
const navigate = useNavigate()
type FormFields = {
	userName : string , 
	email: string,
	phoneNumber : number ,
	password: number | string,
	confirmPassword : number | string,
	country : string , 
	profileImage : string | File | HTMLImageElement
}

const{ 
	formState:{errors,isSubmitting },
	register  ,
	handleSubmit,watch
}=	useForm <FormFields>({ mode:'onChange'})



const onSubmit : SubmitHandler<FormFields> = async (data)=> {

	await axios.post(`https://upskilling-egypt.com:3003/api/v1/Users/Register` , data).then((resp)=>{
		console.log(resp)
		toast.success(resp?.data?.message || 'account created successfully')
		navigate('/verify-user')

	}).catch((error)=>{
		console.log(error)
			toast.error(error.response.data.message || 'something wrong went please try again')
	})
	console.log(data)
	
}
	

return <>
<div className={`${styles.registerWrapper} `}>

<div className={`${styles.registerLayer}`}>


<div className={`${styles.formWrapper} `}>
	
		<div className="logo text-center">
		<img src={logo} alt="project management logo "  />
		</div>
	<div className=" d-flex justify-content-center">
	<div className={`${styles.formContainer}`}>
		<div className={styles.title}>
			<span className='text-white'>welcome to PMS</span>
			<h2 className={`${styles.textWrapper} position-relative`}>Create New Account</h2>
		</div>

		<div className={`${styles.logo} profileImage text-center`}>
			<img src={profileImg} alt="form profile image" />
		</div>

		<form onSubmit={handleSubmit(onSubmit)}>
		<div className="container">
		<div className={`${styles.rowInputs} row` }>
				<div className="col-md-6">
				<div className="input">
				<label className={styles.formLabel} htmlFor="userName">User Name</label>
				<input   id='userName' type="text" className={`${styles.formInputs} form-control`} placeholder='Enter your Name' 
				{...register ( 'userName', {required :'name cannot be empty' , pattern : {
					value : /^\S+\d$/,
				  
					message : 'The user name must end with numbers without spaces'
				  } ,  maxLength : {
					value : 8,
					message : 'maximum 8 characters'
				  }} ) }
				/>

		{errors.userName && <span className='text-danger'>{errors?.userName?.message}</span>}
</div>
				</div>
				<div className="col-md-6">
				<div className="input">
				<label className={styles.formLabel} htmlFor="email">E-mail</label>
				<input id='email' type="email" className={`${styles.formInputs} form-control`} placeholder='Enter your E-mail'
				
				{...register('email',{
					required : 'email cannot be empty',
					pattern : {
					  value : /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
					  message : 'please enter a valid email'
					}
				  })}
				/>
						{errors.email && <span className='text-danger'>{errors?.email?.message}</span>}

				</div>
				</div>
				<div className="col-md-6">
				<div className="input">
				<label className={styles.formLabel} htmlFor="country">Country</label>
				<input id='country' type="text" className={`${styles.formInputs} form-control`} placeholder='Enter your country' 
				{...register('country' , {required : "please enter a country name"})}
/>
				</div>
				{errors.country && <span className='text-danger'>{errors?.country?.message}</span>}

				</div>
				<div className="col-md-6">
				<div className="input">
				<label className={styles.formLabel} htmlFor="phone">Phone Number</label>
				<input id='phone' type="tel" className={`${styles.formInputs} form-control`} placeholder='Enter your phone number' 
				{...register('phoneNumber' , {required : 'please enter your phone number' , pattern : {
					value:/^01[0125][0-9]{8}$/,
					message : 'please enter valid egyptian number'
				  }})}/>
				</div>
				{errors.phoneNumber && <span className='text-danger'>{errors?.phoneNumber?.message}</span>}

				</div>
				<div className="col-md-6">
				<div className="input position-relative">
				  <div className="position-relative">
				  <label className={styles.formLabel} htmlFor="password">Password</label>

				  <input    id='password' type={!isVisible ? "password" : "text"} className={`${styles.formInputs} form-control`} placeholder='Enter your password ' 
				
				{...register('password' , {
					required : 'password cannot be empty',
					pattern : { value : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
					  message : "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
				  
				  
					}
				   })}
				/>

	<button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleHideShowPassword} className={styles.iconsBtn}>
<i  aria-label="password-toggle"   className={isPasswordShown ?"fa-regular fa-eye-slash text-white position-absolute end-0 top-50 translate-middle confirm" : "text-white fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
<span className='sr-only'>{isPasswordShown ? 'hide  password' : 'show  password'}</span>

</button>


				  </div>
										{errors.password && <span className='text-danger'>{errors?.password?.message}</span>}



				</div>
				</div>
				<div className="col-md-6">
				<div className="input position-relative">
				   	<div className="position-relative">
					   <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password</label>
				<input  id='confirmPassword'  type={!isRePasswordVisible ? "password" : "text"} className={`${styles.formInputs} form-control`} placeholder='Confirm New Password'
				 {...register('confirmPassword' , {
					required : 'confirm password cannot be empty',
						 validate: (value:'password') => value === watch("password") || 'passwords not matches'
						 
						 
				   })}
				/>
					<button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleHideShowRePassword} className={styles.iconsBtn}>
<i  aria-label="password-toggle"   className={isRePasswordShown ?"fa-regular fa-eye-slash text-white position-absolute end-0 top-50 translate-middle confirm" : "text-white fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
<span className='sr-only'>{isRePasswordShown ? 'hide  password' : 'show  password'}</span>

</button>

					</div>



				</div>
				{errors.confirmPassword && <span className='text-danger'>{errors?.confirmPassword?.message}</span>}

				</div>
			</div>

			<div className={`${styles.saveBtn} text-center`}>
			<button disabled={isSubmitting} >{isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Save'}</button>
			</div>
		</div>

		</form>
		</div>
	</div>
	
</div>


</div>

</div>


</>
}
