import styles from "./register.module.css";
import logo from "../../../../assets/images/PMS 3.svg";
import profileImg from "../../../../assets/images/profile.svg";
import { toast } from "react-toastify";
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_URLS, axiosInstance} from '../../../../api';
import { emailValidation, PasswordValidation, userNameValidation } from '../../../../validations';
import { useForm ,SubmitHandler} from 'react-hook-form';
import { RegisterFormData } from '../../../../interface/AuthResponse/AuthResponse';
import PasswordInput from '../../../shared/components/PasswordInput/PasswordInput';
import useToggle from '../../../../hooks/useToggle';


export default function Registration() {

  const [value, toggleFunction] = useToggle(false);

	const [imageFile, setImageFile] = useState<MediaSource|Blob|null>();





const navigate = useNavigate()


const{ 
	formState:{errors,isSubmitting },
	register  ,
	handleSubmit,watch,
	setValue,trigger,
}=	useForm <RegisterFormData>({ mode:'onChange'})

useEffect(()=>{
	if(watch('confirmPassword')) {
	  trigger('confirmPassword')

	}
  },[watch('password')])

  const uploadImage = (selectorFiles:FileList|null) => {
    if (selectorFiles) {
		console.log(selectorFiles);
      setImageFile(selectorFiles[0]);
      setValue("profileImage", selectorFiles[0]);
    }
  };
  const discardProfileImage = ():void=> {
    setValue('profileImage',null)
    setImageFile(null)
	console.log(profileImg);
	
  }

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const formData = new FormData();
    formData.append("userName", data?.userName);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data?.profileImage);
    formData.append("email", data.email);

    await axiosInstance
      .post( AUTH_URLS.register, formData)
      .then((resp) => {
        console.log(resp);
        toast.success(resp?.data?.message || "account created successfully");
        navigate("/verify-user",{state:data.email});
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "something wrong went please try again"
        );
      });
    console.log(data?.profileImage);
  };



return <>
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
			<h2 className={`${styles.textWrapper} position-relative`}>Create New Account</h2>
		</div>

	
	


		
		<form onSubmit={handleSubmit(onSubmit)}>




		<div className="container">

		{imageFile ? <>{imageFile && (
  <div  className={`${styles.formImage} position-relative`}>
    <img className='w-75' src={URL.createObjectURL(imageFile) }  

    />
    <button className={`${styles.discardBtn} btn`}
  
    onClick={discardProfileImage}>
    <i className="fa-solid fa-xmark "></i>
    <span className='sr-only'>{imageFile? 'discard upload profile image' : 'upload profile image'}</span>

    </button>
  </div>
)}</> :  <div className="profileImageField mx-2  ">
<label htmlFor="file-upload" className={`${styles.customFileUpload}`}>
<div className={`${styles.cameraIcon} `}>
<img src={profileImg} alt="form profile image" />

</div>



               </label>
     <input  
   
     {...register('profileImage')}
     className={styles.fileUpload} id="file-upload" type="file" onChange={(e) => uploadImage(e.target.files)
     
   
   
   }
   
   
   />


</div>}

		<div className={`${styles.rowInputs} row` }>
				<div className="col-md-6">
				<div className={styles.input}>
				<label className={styles.formLabel} htmlFor="userName">User Name</label>
				<input   id='userName' type="text" className={`${styles.formInputs} form-control`} placeholder='Enter your Name' 
				{...register ( 'userName', userNameValidation) }
				/>

		{errors.userName && <span className='text-danger'>{errors?.userName?.message}</span>}
</div>
				</div>
				<div className="col-md-6">
				<div className={styles.input}>
				<label className={styles.formLabel} htmlFor="email">E-mail</label>
				<input id='email' type="email" className={`${styles.formInputs} form-control`} placeholder='Enter your E-mail'
				
				{...register('email',emailValidation)}
				/>
						{errors.email && <span className='text-danger'>{errors?.email?.message}</span>}

				</div>
				</div>
				<div className="col-md-6">
				<div className={styles.input}>
				<label className={styles.formLabel} htmlFor="country">Country</label>
				<input id='country' type="text" className={`${styles.formInputs} form-control `} placeholder='Enter your country' 
				{...register('country' , {required : "please enter a country name"})}
/>
				</div>
				{errors.country && <span className='text-danger'>{errors?.country?.message}</span>}

				</div>
				<div className="col-md-6">
				<div className={styles.input}>
				<label className={styles.formLabel} htmlFor="phone">Phone Number</label>
				<input id='phone' type="tel" className={`${styles.formInputs} form-control phone`} placeholder='Enter your phone number' 
				{...register('phoneNumber' , {required : 'please enter your phone number' , pattern : {
					value:/^01[0125][0-9]{8}$/,
					message : 'please enter valid egyptian number'
				  }})}/>
				</div>
				{errors.phoneNumber && <span className='text-danger'>{errors?.phoneNumber?.message}</span>}

				</div>
				<div className="col-md-6">
				<div className={styles.input}>
				  <div className={styles.password}>

					<PasswordInput  label='Password'  placeholder='Enter your password' registerInput={register('password',PasswordValidation)}/>



				  </div>
										{errors.password && <span className='text-danger'>{errors?.password?.message}</span>}



				</div>
				</div>


				<div className="col-md-6">
				<div className={styles.input}>
				   	<div className="position-relative">
					   <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password</label>
				<input  id='confirmPassword'  type={value ? "text" : "password"} className={`${styles.formInputs} form-control confirmPassword`} placeholder='Confirm New Password'
				 {...register('confirmPassword' , {
					required : 'confirm password cannot be empty',
					validate: (val: string) => {
						if (watch('password') != val) {
						  return "Your passwords do no match";
						}		}				 
						 
				   })}
				/>
					<button onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button' onClick={toggleFunction} className={styles.iconsBtn}>
<i  aria-label="password-toggle"   className={value ?"fa-regular fa-eye-slash text-white position-absolute end-0 top-50 translate-middle confirm" : "text-white fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>
<span className='sr-only'>{!value ? 'hide  password' : 'show  password'}</span>

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
