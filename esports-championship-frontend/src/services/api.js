import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });


// --- FUNÇÕES DE API CORRIGIDAS ---

// MUDANÇA AQUI: Renomeada de 'createUser' para 'register' e com a URL correta
export const register = (data) => 
  api.post('/api/users/register', data);


export const login = (data) => 
  api.post('/api/users/login', data);
  

export const createTeam = (data) => 
    api.post('/api/equipes', data);


export const createPlayerProfile = (data) => 
  api.post('/api/jogadores', data);