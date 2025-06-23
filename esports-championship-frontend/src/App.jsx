import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import CadastroEquipePage from './components/CadastroEquipe';
import CampeonatosPage from './components/CampeonatosPage';
import InscricaoPage from './components/InscricaoPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PartidasPage from './components/PartidasPage';
import PlacarPage from './components/Placar';
import ChaveamentoPage from './components/ChaveamentoPage';
import PerfilEquipePage from './components/PerfilEquipePage';
import ListaEquipesPage from './components/ListaEquipesPage';
import CriarPerfilJogadorPage from './components/CriarPerfilJogadorPage';
import MinhaEquipePage from './components/MinhaEquipePage';

// Decide o redirecionamento da rota "/" baseado no estado de autenticação
function HomeRedirect() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated
    ? <Navigate to="/campeonatos" replace />
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/campeonatos" element={<CampeonatosPage />} />
          <Route path="/equipes" element={<ListaEquipesPage />} />
          <Route path="/equipe/:id" element={<PerfilEquipePage />} />
          <Route path="/chaveamento/:id" element={<ChaveamentoPage />} />
          <Route path="/chaveamento" element={<ChaveamentoPage />} />
          <Route path="/partidas" element={<PartidasPage />} />
          <Route path="/placar" element={<PlacarPage />} />

          {/* --- Rotas Protegidas (só para usuários logados) --- */}
          <Route
            path="/cadastro"
            element={<ProtectedRoute><CadastroEquipePage /></ProtectedRoute>}
          />
          <Route
            path="/minha-equipe"
            element={<ProtectedRoute><MinhaEquipePage /></ProtectedRoute>}
          />
          <Route
            path="/criar-perfil-jogador"
            element={<ProtectedRoute><CriarPerfilJogadorPage /></ProtectedRoute>}
          />
          <Route
            path="/inscricao"
            element={<ProtectedRoute><InscricaoPage /></ProtectedRoute>}
          />

          {/* Você pode adicionar uma rota "catch-all" para página não encontrada aqui no futuro */}
          {/* <Route path="*" element={<PaginaNaoEncontrada />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;