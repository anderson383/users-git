import axios from 'axios';


const axiosIntance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'es-CO',
    'Content-Language': 'es',
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

export default axiosIntance;
