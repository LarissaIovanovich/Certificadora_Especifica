import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FuriaNav from '../components/FuriaNav'; 
import styles from './PerfilEquipePage.module.css';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function PerfilEquipePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [equipe, setEquipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [convites, setConvites] = useState([]);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');
  const [partidas, setPartidas] = useState([]);
  const [loadingPartidas, setLoadingPartidas] = useState(true);

  // Busca dados da equipe
  useEffect(() => {
    async function fetchEquipeData() {
      setLoading(true);
      try {
        const response = await api.get(`/equipes/${id}`);
        setEquipe(response.data);
      } catch (error) {
        setEquipe(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEquipeData();
  }, [id]);

  // Busca convites se for organizador
  useEffect(() => {
    if (!loading && equipe && user && equipe.criado_por === user.id) {
      fetchConvites();
    }
  }, [equipe, user]);

  async function fetchConvites() {
    try {
      const res = await api.get('/equipes/invite-link');
      setConvites(res.data);
    } catch (err) {
      setConvites([]);
    }
  }

  // Cria novo convite
  async function handleCreateInvite() {
    setInviteLoading(true);
    setInviteUrl('');
    try {
      const res = await api.post('/equipes/invite-link');
      setInviteUrl(`${window.location.origin}${res.data.url}`);
      fetchConvites();
    } catch (err) {
      alert('Erro ao gerar convite');
    } finally {
      setInviteLoading(false);
    }
  }

  // Deleta convite
  async function handleDeleteInvite(conviteId) {
    if (!window.confirm('Remover este convite?')) return;
    try {
      await api.delete('/equipes/invite-link', { data: { conviteId } });
      fetchConvites();
    } catch (err) {
      alert('Erro ao remover convite');
    }
  }

  useEffect(() => {
    async function fetchPartidas() {
      if (!equipe) return;
      setLoadingPartidas(true);
      try {
        const res = await api.get('/partidas', { params: { equipe_id: equipe.id } });
        setPartidas(res.data);
      } catch (err) {
        setPartidas([]);
      } finally {
        setLoadingPartidas(false);
      }
    }
    if (equipe) fetchPartidas();
  }, [equipe]);

  if (loading) {
    return <div className={styles.loading}>Carregando perfil da equipe...</div>;
  }

  if (!equipe) {
    return <div className={styles.loading}>Equipe não encontrada.</div>;
  }
  
  const isOrganizador = user && equipe.criado_por === user.id;

  return (
    <>
      <FuriaNav />
      <div className={styles.pageContainer}>
        <header className={styles.profileHeader}>
          <img src={equipe.url_logo} alt={`Logo ${equipe.nome}`} className={styles.profileLogo} />
          <div className={styles.headerInfo}>
            <h1 className={styles.teamName}>{equipe.nome}</h1>
            <span className={styles.teamTag}>({equipe.tag})</span>
          </div>
        </header>

        <main className={styles.playersSection}>
          <h2 className={styles.sectionTitle}>Elenco Principal</h2>
          <div className={styles.playersGrid}>
            {equipe.jogadores && equipe.jogadores.length > 0 ? (
              equipe.jogadores.map(jogador => (
                <div key={jogador.id} className={styles.playerCard}>
                  <p className={styles.playerNickname}>{jogador.apelido}</p>
                  <p className={styles.playerPosition}>{jogador.posicao}</p>
                </div>
              ))
            ) : (
              <p>Nenhum jogador cadastrado para esta equipe.</p>
            )}
          </div>
        </main>

        <section className={styles.partidasSection}>
          <h2 className={styles.sectionTitle}>Partidas da Equipe</h2>
          {loadingPartidas ? (
            <p>Carregando partidas...</p>
          ) : partidas.length === 0 ? (
            <p>Nenhuma partida encontrada para esta equipe.</p>
          ) : (
            <ul className={styles.partidasList}>
              {partidas.map(partida => (
                <li key={partida.id} className={styles.partidaItem}>
                  <div className={styles.partidaEquipes}>
                    {/* Equipe A */}
                    <div className={styles.partidaEquipe}>
                      <img src={partida.equipeA?.url_logo} alt={partida.equipeA?.nome} className={styles.partidaLogo} />
                      <span className={styles.partidaNome}>{partida.equipeA?.nome} <span className={styles.partidaTag}>({partida.equipeA?.tag})</span></span>
                    </div>
                    <span className={styles.partidaVs}>vs</span>
                    {/* Equipe B */}
                    <div className={styles.partidaEquipe}>
                      <img src={partida.equipeB?.url_logo} alt={partida.equipeB?.nome} className={styles.partidaLogo} />
                      <span className={styles.partidaNome}>{partida.equipeB?.nome} <span className={styles.partidaTag}>({partida.equipeB?.tag})</span></span>
                    </div>
                  </div>
                  <div className={styles.partidaStatus}>
                    <span>Status: {partida.status || 'Pendente'}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* apenas para organizadores */}
        {isOrganizador && (
          <section className={styles.invitesSection}>
            <h2 className={styles.sectionTitle}>Convites</h2>
            <button
              className={styles.inviteButton}
              onClick={handleCreateInvite}
              disabled={inviteLoading}
            >
              {inviteLoading ? 'Gerando convite...' : 'Gerar convite'}
            </button>
            {inviteUrl && (
              <div className={styles.inviteUrl}>
                <strong>Link de convite gerado:</strong>
                <input
                  type="text"
                  value={inviteUrl}
                  readOnly
                  style={{ width: '100%' }}
                  onFocus={e => e.target.select()}
                />
              </div>
            )}
            <h3 className={styles.sectionSubtitle}>Pendentes</h3>
            {convites.length === 0 ? (
              <p>Nenhum convite pendente.</p>
            ) : (
              <ul className={styles.inviteList}>
                {convites.map(convite => (
                  <li key={convite.id} className={styles.inviteItem}>
                    <span>{`${window.location.origin}/invite/${convite.token}`}</span>
                    <button
                      className={styles.removeInviteButton}
                      onClick={() => handleDeleteInvite(convite.id)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </>
  );
}