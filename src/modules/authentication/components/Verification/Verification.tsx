import styles from './verify.module.css'
import logo from '../../../../assets/images/PMS 3.svg'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { VerifyRegister } from '../../../../interface/AuthResponse/AuthResponse'
import { AUTH_URLS, axiosInstance } from '../../../../api'
import { toast } from 'react-toastify'

export default function Verification() {

	const location = useLocation()
	const myLocation = location.state
	const navigate = useNavigate()
	
	const{ 
	  formState:{errors,isSubmitting },
	  register  ,
      setError,
	  handleSubmit,
	
	  
	}=	useForm<VerifyRegister> ({defaultValues : {email : myLocation} , mode:'onChange'})
	const  onSubmit = async(data:VerifyRegister)=>{
	await axiosInstance.put(AUTH_URLS.verify , data).then((response)=>{
	  console.log(response);
	  toast.success(response?.data?.message || 'account verified successfully')
	  navigate('/login',{state:data?.email})
	}).catch((error)=>{console.log(error);
	  toast.error(error?.response?.data?.message||'something went wrong please try again')
	  setError('code' , error)
	})
	
	
	}

  return (
 <div className={`${styles.registerWrapper} `}>

<div className={`${styles.registerLayer}`}>


<div className={`${styles.formWrapper} `}>
	
		<div className="logo text-center mb-3">
		<img src={logo} alt="project management logo "  />
		</div>
	<div className=" d-flex justify-content-center">
	<div className={`${styles.formContainer}`}>
		<div className={styles.title}>
			<span className='text-white'>welcome to PMS</span>
			<h2 className={`${styles.textWrapper} position-relative`}>Verify Account</h2>
		</div>

	
	


		
		<form onSubmit={handleSubmit(onSubmit)}>




		<div >


		<div className={`${styles.rowInputs} ` }>
	
				<div>
				<div className="input">
				<label className={styles.formLabel} htmlFor="email">E-mail</label>
				<input  id='email' type="email" className={`${styles.formInputs} w-100`} placeholder='Enter your E-mail'
				
				{...register('email')}
				/>

				</div>
				</div>
		
	
			
				<div className="">
				<div className="input position-relative">
				   	<div className="position-relative">
					   <label className={styles.formLabel} htmlFor="code">OTP Verification</label>
				<input  id='code'   className={`${styles.formInputs} form-control`} placeholder='Enter Verification'
				 {...register('code' , {
					required : 'please enter verify code that sent to your email',
					
						 
						 
				   })}
				/>


					</div>



				</div>
				{errors.code && <span className='text-danger'>{errors?.code?.message}</span>}

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
  )
}
