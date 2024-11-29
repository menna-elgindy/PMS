import styles from './verify.module.css'
import logo from '../../../../assets/images/PMS 3.svg'
import { useForm } from 'react-hook-form'
import { VerifyFormFields } from '../../../../types/types'

export default function Verification() {

  const{ 
    formState:{errors,isSubmitting },
    register  ,
    handleSubmit,
    
  }=	useForm<VerifyFormFields> ({ mode:'onChange'})
  const onSubmit = (data:VerifyFormFields)=>{
console.log(data);

  }

  return (
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

	
	


		
		<form onSubmit={handleSubmit(onSubmit)}>




		<div className="container">


		<div className={`${styles.rowInputs} ` }>
	
				<div>
				<div className="input">
				<label className={styles.formLabel} htmlFor="email">E-mail</label>
				<input id='email' type="email" className={`${styles.formInputs} form-control`} placeholder='Enter your E-mail'
				
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
					required : 'confirm password cannot be empty',
					
						 
						 
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
	</div>
	
</div>


</div>

</div>
  )
}
