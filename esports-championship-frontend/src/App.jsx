import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CadastroEquipePage from './components/CadastroEquipe';
import CampeonatosPage from './components/CampeonatosPage';
import InscricaoPage from './components/InscricaoPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PartidasPage from './components/PartidasPage';
import PlacarPage from './components/Placar';
import CriarCampeonato from './components/CriarCampeonato';
import ChaveamentoPage from './components/ChaveamentoPage';
import PerfilEquipePage from './components/PerfilEquipePage';
import ListaEquipesPage from './components/ListaEquipesPage';
import CriarPerfilJogadorPage from './components/CriarPerfilJogadorPage';
import MinhaEquipePage from './components/MinhaEquipePage';
import AdminTorneioDetalhesPage from './components/AdminTorneioDetalhesPage';
import AdminListaTorneios from './components/AdminListaTorneios';
import AceitarConvitePage from './components/AceitarConvitePage';
import RelatorioPartidaPage from './components/RelatorioPartidaPage'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/" element={<Navigate replace to="/campeonatos" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/campeonatos" element={<CampeonatosPage />} />
          <Route path="/equipes" element={<ListaEquipesPage />} />
          <Route path="/criar-equipe" element={<CadastroEquipePage />} />
          <Route path="/equipe/:id" element={<PerfilEquipePage />} />
          <Route path="/chaveamento/:id" element={<ChaveamentoPage />} />
          <Route path="/chaveamento" element={<ChaveamentoPage />} />
          <Route path="/partidas" element={<PartidasPage />} />
          <Route path="/placar" element={<PlacarPage />} />
          <Route path="/partidas/:id/relatorio" element={<RelatorioPartidaPage />} />
          <Route path="/admin/criar-torneio" element={<CriarCampeonato />} />
          <Route
            path="/admin/torneio/:id"
            element={
              <ProtectedRoute>
                <AdminTorneioDetalhesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/torneios"
            element={
              <ProtectedRoute>
                <AdminListaTorneios />
              </ProtectedRoute>
            }
          />

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
          <Route path="/invite/:token" element={<ProtectedRoute><AceitarConvitePage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;