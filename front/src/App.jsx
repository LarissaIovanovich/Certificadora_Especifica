import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroEquipePage from './pages/CadastroEquipePage';
import CampeonatosPage from './pages/CampeonatosPage';
import ClassificacaoPage from './pages/ClassificacaoPage';
import InscricaoPage from './pages/InscricaoPage';
import LoginPage from './pages/LoginPage';
import PartidasPage from './pages/PartidasPage';
import PlacarPage from './pages/PlacarPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroEquipePage />} />
        <Route path="/campeonatos" element={<CampeonatosPage />} />
        <Route path="/classificacao" element={<ClassificacaoPage />} />
        <Route path="/inscricao" element={<InscricaoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/partidas" element={<PartidasPage />} />
        <Route path="/placar" element={<PlacarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
