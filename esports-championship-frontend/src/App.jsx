import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import CadastroEquipePage from './components/CadastroEquipe';
import CampeonatosPage from './components/CampeonatosPage';
import InscricaoPage from './components/InscricaoPage';
import LoginPage from './components/LoginPage';
import SignInPage from './components/SignInPage';
import PartidasPage from './components/PartidasPage';
import PlacarPage from './components/Placar';
import ChaveamentoPage from './components/ChaveamentoPage';
import PerfilEquipePage from './components/PerfilEquipePage';
import ListaEquipesPage from './components/ListaEquipesPage';
import CriarPerfilJogadorPage from './components/CriarPerfilJogadorPage';
import MinhaEquipePage from './components/MinhaEquipePage'; 

function App() {
  return (
  
    <Router>
      <AuthProvider>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/campeonatos" element={<CampeonatosPage />} />
          <Route path="/equipes" element={<ListaEquipesPage />} />
          <Route path="/equipe/:id" element={<PerfilEquipePage />} />
          <Route path="/chaveamento/:id" element={<ChaveamentoPage />} />
          <Route path="/chaveamento" element={<ChaveamentoPage />} />
          <Route path="/partidas" element={<PartidasPage />} />
          <Route path="/placar" element={<PlacarPage />} />


          {/* --- Rotas Protegidas (só para usuários logados) --- */}
          {/* CORREÇÃO 2: Adicionando as rotas que faltavam e protegendo-as */}
          <Route
            path="/cadastro" // Cadastro de Equipe
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