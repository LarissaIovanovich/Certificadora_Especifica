import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../services/api'; 
import { jwtDecode } from 'jwt-decode'; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedUser = jwtDecode(token); 
         setUser({ id: decodedUser.id, papel: decodedUser.papel, nome_usuario: decodedUser.nome_usuario });
        } catch (error) {
          console.error("Token inválido:", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await apiLogin({ email, senha });
      const { token, usuario } = response.data;

      localStorage.setItem('token', token);
      setUser(usuario);
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: error.response?.data?.error || "Credenciais inválidas." };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};