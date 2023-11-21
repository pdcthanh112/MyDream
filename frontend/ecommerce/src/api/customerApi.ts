import axiosConfig from '@config/axiosConfig';
import { SignupForm } from '@models/CustomerModel';
import axios from 'axios';

export const login = async (email: string, password: string) => {
  return await axios
    .post('http://localhost:8000/ecommerce/auth/login', { email: email, password: password })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const logout = async (email: string) => {
  return await axios
    .post('http://localhost:8000/ecommerce/auth/logout', { email: email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const signup = async (data: SignupForm) => {
  return await axios.post('http://localhost:8000/ecommerce/auth/signup', {
    email: data.email,
    name: data.name,
    password: data.password,
    address: data.address,
    phone: data.phone,
    gender: data.gender,
  });
};