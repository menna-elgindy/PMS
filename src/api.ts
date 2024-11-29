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
  login: ``,
  register: `Users/Register`,
  verify: ``,
  forgetPassword:`Users/Reset/Request`,
  resetPassword: `Users/Reset`,
  changePassword: `Users/ChangePassword`,
};