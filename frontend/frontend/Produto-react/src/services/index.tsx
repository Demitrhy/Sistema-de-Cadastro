import axios from 'axios';
import { getToken } from '../utils/AuthService';

export const api = axios.create({
     timeout: 20000
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if(token){
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;    
