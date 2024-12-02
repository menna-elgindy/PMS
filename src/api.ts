// axios instance
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';

export const axiosInstance:AxiosInstance = axios.create({
  baseURL: BASE_URL,
  
});

// headers
export const HEADERS = {
  headers: { Authorization: localStorage.getItem('token') },
};

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
  ADD_Task:`/Task`,
  GET_Task:(id:number)=>`/Task/${id}`,
  EDIT_TASK:(id:number)=>`/Task/${id}`
}

// users_enpoints
const USERS_URLS={
    COUNT_USERS:'Users/count'
}
export{
  TASKS_URLS,
  USERS_URLS
}

//projects endpoint 
export const PROJECTS_URL ={
  ADD_PROJECT:`/Project`,
  GET_PROJECT:(id:number)=>`/Project/${id}`,
  EDIT_PROJECT:(id:number)=>`/Project/${id}`
}
