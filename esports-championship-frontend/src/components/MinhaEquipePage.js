import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

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
    else if (user && user.papel === 'jogador' && !user.perfil_jogador) {
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
    // Se for um organizador...
    else if (user && user.papel === 'organizador') {
      navigate('/cadastro');
    }
  }, [user, loading, navigate]);

  const handleSelectRole = async (selectedRole) => {
    const confirmMsg = `Tem certeza que deseja ser ${selectedRole}?`;
    if (!window.confirm(confirmMsg)) return;

    setShowModal(false);

    try {
      const response = await api.put('/users', { papel: selectedRole });
      user.papel = response.data.usuario.papel;

      if (response.status !== 200) {
        alert('Erro ao atualizar papel do usuário.');
        return;
      }

      // Redireciona conforme o papel escolhido
      if (selectedRole === 'jogador') {
        navigate('/criar-perfil-jogador');
      } else if (selectedRole === 'organizador') {
        navigate('/cadastro');
      }
    } catch (err) {
      console.log(err);
      alert('Erro de conexão ao atualizar papel.');
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