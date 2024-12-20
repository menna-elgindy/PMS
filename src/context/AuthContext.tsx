/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {
  AuthContextProviderProps,
  AuthContextType,
  LoginData,
} from "../interface/UserInfo/UserInfoResponse";

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  const saveLoginData = () => {
    const enCodedToken = JSON.stringify(localStorage.getItem("token"));
    const deCodedToken: LoginData = jwtDecode<LoginData>(enCodedToken);
    setLoginData(deCodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token") || loginData != null) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, setLoginData, saveLoginData }}>
      {children}
    </AuthContext.Provider>
  );
}
