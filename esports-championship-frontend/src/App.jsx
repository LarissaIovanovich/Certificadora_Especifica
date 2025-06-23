import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroEquipePage from './components/CadastroEquipe';
import CampeonatosPage from './components/CampeonatosPage';
import InscricaoPage from './components/InscricaoPage';
import LoginPage from './components/LoginPage';
import SignInPage from './components/SignInPage';
import PartidasPage from './components/PartidasPage';
import PlacarPage from './components/Placar';
import AdminPage from './components/AdminPage';
import CriarCampeonato from './components/CriarCampeonato';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroEquipePage />} />
        <Route path="/campeonatos" element={<CampeonatosPage />} />
        <Route path="/inscricao" element={<InscricaoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/partidas" element={<PartidasPage />} />
        <Route path="/placar" element={<PlacarPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/criar" element={<CriarCampeonato />} />
      </Routes>
    </Router>
  );
}

export default App;
