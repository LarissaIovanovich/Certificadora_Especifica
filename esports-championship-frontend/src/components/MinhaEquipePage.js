import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MinhaEquipePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return; 
    }

    // Se o usuário logado não tem um perfil de jogador criado...
    if (user && !user.perfil_jogador) {
      // Redireciona para a página de criação de perfil.
      navigate('/criar-perfil-jogador');
    }
    // Se o usuário é um jogador e já tem uma equipe...
    else if (user && user.perfil_jogador && user.perfil_jogador.equipe_id) {
      // Redireciona para a página de perfil da sua equipe.
      navigate(`/equipe/${user.perfil_jogador.equipe_id}`);
    }
    // Se for um jogador, mas estiver sem equipe...
    else if (user && user.perfil_jogador) {
      // Manda ele para a lista de equipes para procurar uma.
      navigate('/equipes');
    }

  }, [user, loading, navigate]);

  return <div>Verificando seu perfil...</div>;
}