import axios from "axios";
import { store } from "@redux/store";
import { REACT_APP_API_URL } from "@config/index";

const axiosConfig = axios.create({
  baseURL: 'localhost:5000/ecommerce/',
  // baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    if (config.headers) {
    //   if (!config.headers.Authorization) {
    //     const token = store.getState().auth.login.currentUser?.token;
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //   }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;