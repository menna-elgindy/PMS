import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export default function PasswordInput({
  label,
  placeholder,
  registerInput,
}: {
  label: string;
  placeholder: string;
  registerInput: UseFormRegisterReturn<string>;
}) {
  let [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="my-4">
      <label className="main-colr my-1">{label}</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder={placeholder}
          aria-label={label}
          {...registerInput}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          className="input-group-text bg-transparent border-0 border-bottom border-icon rounded-0"
        >
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
          <i
            className={`fa-solid ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } text-white`}
          ></i>
        </button>
      </div>
    </div>
  );
}
