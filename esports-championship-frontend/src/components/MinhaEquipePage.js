import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MinhaEquipePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  //console.log('user');
  //console.log(user);

  useEffect(() => {
    if (loading) return;

    // Se o usuário não tem um papel definido...
    if (!user.papel) {
      setShowModal(true);
    }
    // Se o usuário logado é um jogador e não tem um perfil de jogador criado...
    else if (user && user.papel == 'jogador' && !user.perfil_jogador) {
      navigate('/criar-perfil-jogador');
    }
    // Se o usuário é um jogador e já tem uma equipe...
    else if (user && user.perfil_jogador && user.perfil_jogador.equipe_id) {
      navigate(`/equipe/${user.perfil_jogador.equipe_id}`);
    }
    // Se for um jogador, mas estiver sem equipe...
    else if (user && user.perfil_jogador) {
      navigate('/equipes');
    }
  }, [user, loading, navigate]);

  const handleSelectRole = (selectedRole) => {
    setShowModal(false);
    if (selectedRole === 'jogador') {
      navigate('/criar-perfil-jogador');
    } else if (selectedRole === 'organizador') {
      // poderíamos enviar um PUT para settar usuario como 'organizador' no backend
      navigate('/cadastro');
    }
  };

  return (
    <div>
      Verificando seu perfil...
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#181818', padding: '2rem 2.5rem', borderRadius: 12, border: '1px solid #facc15', textAlign: 'center', minWidth: 320
          }}>
            <h2 style={{ color: '#facc15', marginBottom: 16 }}>Qual seu papel?</h2>
            <p style={{ color: '#fff', marginBottom: 24 }}>Selecione como você deseja participar da plataforma:</p>
            <button
              style={{
                background: '#facc15', color: '#181818', border: 'none', borderRadius: 6,
                padding: '0.8rem 2rem', fontSize: 18, marginRight: 16, cursor: 'pointer', fontWeight: 700
              }}
              onClick={() => handleSelectRole('jogador')}
            >
              Jogador
            </button>
            <button
              style={{
                background: '#23272f', color: '#facc15', border: '1.5px solid #facc15', borderRadius: 6,
                padding: '0.8rem 2rem', fontSize: 18, cursor: 'pointer', fontWeight: 700
              }}
              onClick={() => handleSelectRole('organizador')}
            >
              Organizador
            </button>
          </div>
        </div>
      )}
    </div>
  );
}