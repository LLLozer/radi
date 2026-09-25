import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:3004/api',
  withCredentials: true // Le dice al navegador que envíe la cookie del JWT en cada petición
});

export default clienteAxios;