// axios instance
import axios from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// headers
export const HEADERS = {
  headers: { Authorization: localStorage.getItem('token') },
};

//* USER AUTHENTICATION
export const BASE_AUTH = `${BASE_URL}/Users`;
export const AUTH_URLS = {
  login: ``,
  register: `/Register`,
  verify: ``,
  forgetPassword:`${BASE_AUTH}/Reset/Request`,
  resetPassword: `${BASE_AUTH}/Reset`,
  changePassword: ``,
};