import styles from './verify.module.css'
import { useForm } from 'react-hook-form'
import { VerifyRegister } from '../../../../interface/AuthResponse/AuthResponse'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTH_URLS, axiosInstance, BASE_AUTH } from '../../../../api'
import { toast } from 'react-toastify'

export default function Verification() {


	const location = useLocation()
	const myLocation = location.state
	const navigate = useNavigate()
	
  const{ 
    formState:{errors,isSubmitting },
    register  ,
    handleSubmit,
	
    
  }=	useForm<VerifyRegister> ({defaultValues : {email : myLocation} , mode:'onChange'})
  const  onSubmit = async(data:VerifyRegister)=>{
	await axiosInstance.put(BASE_AUTH +AUTH_URLS.verify , data).then((response)=>{
		console.log(response);
		toast.success(response?.data?.message || 'account verified successfully')
		navigate('/login',{state:data?.email})
	}).catch((error)=>{console.log(error);
		toast.error(error?.response?.data?.message||'something went wrong please try again')
	})


  }

  return (
<>
<div className={styles.verifyWrapper}>
<div className={styles.title}>
			<span className='text-white'>welcome to PMS</span>
			<h2 className={`${styles.textWrapper} position-relative`}>Verify Account</h2>
		</div>

		<form onSubmit={handleSubmit(onSubmit)}>




<div>


<div className={`${styles.rowInputs} ` }>

		<div >
		<div className="input">
		<label className={styles.formLabel} htmlFor="email">E-mail</label>
		<input disabled id='email' type="email" className={`${styles.formInputs} w-100`} placeholder='Enter your E-mail'
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
			required : 'please enter otp sent to your registered email',
			
				 
				 
		   })}
		/>


			</div>



		</div>
		{errors.code && <span className='text-danger'>{errors?.code?.message}</span>}

		</div>
	</div>

	<div className={`${styles.saveBtn} text-center`}>
	<button disabled={isSubmitting} >{isSubmitting ?  <><i className="fa-solid fa-spinner fa-spin"></i> </>: 'Save'}</button>
	</div>
</div>

</form>
</div>

</>
  )
}
