import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@redux/store';
import { REACT_APP_API_URL } from '@config/index';

const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/ecommerce/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    if (config.headers) {
      if (!config.headers.Authorization) {
        const token = store.getState().auth.login.currentUser?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosConfig;
