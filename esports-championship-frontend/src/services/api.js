import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

//usuarios
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

export const createUser = (data) => 
  api.post('/api/users/', data);

export const login = (data) => 
api.post('/api/users/auth/', data);
  
//equipes

export const createTeam = (data) => 
    api.post('/api/equipes/', data);
  