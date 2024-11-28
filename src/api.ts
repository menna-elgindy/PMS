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
// const BASE_AUTH = `${BASE_URL}/Users`;
export const AUTH_URLS = {
  login: ``,
  register: ``,
  verify: ``,
  forgetPassword: ``,
  resetPassword: ``,
  changePassword: ``,
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
  USERS_URLS
}