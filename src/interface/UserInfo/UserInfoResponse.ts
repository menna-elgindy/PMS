import { ReactNode } from "react";

export interface LoginData {
  userName: string;
  userEmail: string;
  userGroup: string;
}

export interface AuthContextType {
  loginData: LoginData | null;
  saveLoginData: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}