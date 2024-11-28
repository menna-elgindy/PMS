export interface AxiosErrorResponse {
    data: {
      message: string;
    };
    [key: string]: any;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface RegisterFormData extends LoginFormData {
    userName: string;
    country: string;
    phoneNumber: string;
    confirmPassword: string;
    profileImage: File | null; // توضيح نوع الصورة بدلاً من استخدام `any`.
  }
  
  export interface ForgetPasswordFormData {
    email: string;
  }
  
  export interface ResetPasswordFormData
    extends LoginFormData,
      Pick<RegisterFormData, "confirmPassword"> {
    seed: string; 
  }
   
  export interface AuthTitleProps {
    welcomeText: string;
    title: string;
    firstLetter: string; 
  }
  