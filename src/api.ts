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
const BASE_AUTH = `${BASE_URL}/Users`;
export const AUTH_URLS = {
  login: `${BASE_AUTH}/Login`,
  register: ``,
  verify: ``,
  forgetPassword: ``,
  resetPassword: ``,
  changePassword: ``,
};