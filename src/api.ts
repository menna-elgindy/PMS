// axios instance
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';

 const axiosInstance:AxiosInstance = axios.create({
  baseURL: BASE_URL,
  
});

// headers
export const HEADERS = {
  headers: { Authorization: localStorage.getItem('token') },
};

// axios interceptors
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//* USER AUTHENTICATION
export const AUTH_URLS = {
  login: `Users/Login`,
  register: `Users/Register`,
  verify: `Users/Verify`,
  forgetPassword:`Users/Reset/Request`,
  resetPassword: `Users/Reset`,
  changePassword: `Users/ChangePassword`,
};

// tasks_enpoints
const TASKS_URLS = {
  COUNT_TASKS:'Task/count',
}

// users_enpoints
const USERS_URLS={
    COUNT_USERS:'Users/count'
}
export{
  TASKS_URLS,
  USERS_URLS,
  axiosInstance
}

//projects endpoint 
export const PROJECTS_URL ={
  ADD_PROJECT:`/Project`,
  GET_PROJECT:(id:number)=>`/Project/${id}`,
  EDIT_PROJECT:(id:number)=>`/Project/${id}`
}
