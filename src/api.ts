// axios instance
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';
const IMAGE_URL = 'https://upskilling-egypt.com:3003/';


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
  get_All : `Task/manager`,
  ADD_Task:`/Task`,
  GET_Task:(id:number)=>`/Task/${id}`,
  EDIT_TASK:(id:number)=>`/Task/${id}`,
  DELETE_TASK:(id:number)=>`/Task/${id}`,
  CHANGE_STATUS:(id:number)=>`/Task/${id}/change-status`,
  GET_ASSIGNED_TASKS:`/Task`
}

// users_enpoints
const USERS_URLS={
   COUNT_USERS:'Users/count',
   FILTER_USERS:'Users/',
   CreateAnManagerUrl : `Users/Create`,
   GetUserByIdUrl : (id: number) => `Users/${id}`,
   toggleUserUrl: (id: number) => `Users/${id}`,
   getUsersByManagerUrl: `Users/Manager/`,
   getAllUsersUrl: `Users/`,
   GetCurrentUserUrl: `Users/currentUser`,
}

// projects endpoints
export const PROJECTS_URLS = {
  LIST_MANAGER: 'Project/manager',
  LIST_EMPLOYEE: 'Project/employee',
  DELETE_PROJECT: (id:number) => `Project/${id}`,
  ADD_PROJECT:`/Project`,
  GET_PROJECT:(id:number)=>`Project/${id}`,
  EDIT_PROJECT:(id:number)=>`/Project/${id}`
}

export{
  TASKS_URLS,
  USERS_URLS,
  axiosInstance,
  IMAGE_URL
}


