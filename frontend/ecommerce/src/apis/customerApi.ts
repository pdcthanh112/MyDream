import axiosConfig from '@config/axiosConfig';
import axios from 'axios';

export const login = async (email: string, password: string) => {
  return await axios
    .post('http://localhost:8000/ecommerce/auth/login', { email: email, password: password })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const signup = async (data: any) => {
  return await axios.post('http://localhost:8000/ecommerce/auth/signup', {
    email: data.email,
    name: data.name,
    password: data.password,
    gender: data.gender,
    phone: data.phone,
  });
};
