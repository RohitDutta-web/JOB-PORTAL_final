
import axios from 'axios';
import { getToken } from './authUtils';
import { USER_API_END_POINT } from '@/utils/constant'

const api = axios.create({
  baseURL: USER_API_END_POINT,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;