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
