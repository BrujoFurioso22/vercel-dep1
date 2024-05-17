import axios from 'axios';
import url from './config/Url';

const axiosInstance = axios.create({
  baseURL: url, // Base URL que ya tienes configurada
  maxContentLength: 50 * 1024 * 1024, // 50MB
  maxBodyLength: 50 * 1024 * 1024, // 50MB
});

export default axiosInstance;