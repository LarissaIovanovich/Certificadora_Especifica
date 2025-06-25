import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; 
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          if (decodedUser.exp * 1000 > Date.now()) {
            try {
              const response = await api.post('/users/refresh-token');
              setUser(response.data.usuario);
              if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
              }
            } catch (err) {
              // Token inválido ou usuário não existe mais
              localStorage.removeItem('authToken');
              setUser(null);
            }
          } else {
            localStorage.removeItem('authToken');
            setUser(null);
          }
        } catch (error) {
          console.error("Token inválido no storage:", error);
          localStorage.removeItem('authToken');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/users/login', { email, senha });
      const { token, usuario } = response.data;

    
      localStorage.setItem('authToken', token);
      
      setUser(usuario);
      return { success: true };

    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: error.response?.data?.error || "Credenciais inválidas." };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};