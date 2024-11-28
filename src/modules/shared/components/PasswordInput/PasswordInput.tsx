import React, { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form';

export default function PasswordInput({label,placeholder,registerInput}:{label:string,placeholder:string,registerInput:UseFormRegisterReturn<string>}) {
    let [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisibility = (): void => {
      setShowPassword((prevState) => !prevState);
    };

  return (
    <div>
                  <label className="input-label">{label}</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-from"
                      placeholder={placeholder}
                      aria-label={label}
                      aria-describedby="basic-addon1"
                      {...registerInput}
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
  )
}
