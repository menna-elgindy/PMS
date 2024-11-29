import { UseFormRegisterReturn } from "react-hook-form";
import useToggle from "../../../../hooks/useToggle";
import styles from './passwordInput.module.css'
export default function PasswordInput({
  label,
  placeholder,
  registerInput,
}: {
  label: string;
  placeholder: string;
  registerInput: UseFormRegisterReturn<string>;
}) {

  const[value,toggleFunction]=useToggle(false)

  return (
    <div  className="position-relative">
      <label htmlFor="password" className="main-colr ">{label}</label>
      <div>
      <input  type={value ? "text" : "password"}
          placeholder={placeholder}
          aria-label={label}
          {...registerInput}   id='password'  className={`${styles.formInputs} form-control`} 
				
			
				/>
     


        <button
          type="button"
          onClick={toggleFunction}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          className={`${styles.iconsBtn} `}
        >
                    <i  aria-label="password-toggle"   className={value ?"fa-regular fa-eye-slash text-white position-absolute end-0 top-50 translate-middle confirm" : "text-white fa-solid fa-eye position-absolute end-0 top-50 translate-middle confirm"}></i>

          <span className="sr-only">
            {value ? "Hide password" : "Show password"}
          </span>
        </button>
      </div>
    </div>
  );
}
