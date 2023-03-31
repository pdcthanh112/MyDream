import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../redux/store";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if (config.headers) {
    //   if (!config.headers.Authorization) {
    //     const token = store.getState().auth.login.currentUser?.token;
    //     if (token) {
    //       config.headers['Authorization'] = `Bearer ${token}`;
    //     }
    //   }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosConfig;