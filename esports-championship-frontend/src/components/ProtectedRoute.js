import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Se ainda estiver verificando a autenticação, mostramos uma mensagem
  if (loading) {
    return <div>Carregando...</div>; 
  }

  // Se não estiver autenticado, redireciona o usuário para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver autenticado, mostra a página que ele tentou acessar
  return children;
};

export default ProtectedRoute;