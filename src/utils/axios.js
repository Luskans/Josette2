import axios from 'axios';

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

export default axiosBase;
export { axiosSecu };