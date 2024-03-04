import axios from 'axios';
import { refreshToken } from '@/store/userSlice';
import store from '@/store';

const apiURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');

// Instance d'axios avec juste la base url
const axiosBase = axios.create({
  baseURL: apiURL,
});

// Instance d'axios avec authorization
const axiosSecu = axios.create({
    baseURL: apiURL,
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});

// Intercepteur de réponse axios qui lance le refresh token si celui ci est expiré
axiosSecu.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('token expiré, lancement du post refresh !!')
      originalRequest._retry = true;
      await store.dispatch(refreshToken());

      const newToken = localStorage.getItem('token');
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      return axiosBase(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosBase;
export { axiosSecu };