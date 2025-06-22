import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FuriaNav from '../components/FuriaNav'; 
import styles from './PerfilEquipePage.module.css';

export default function PerfilEquipePage() {
  const { id } = useParams();
  const [equipe, setEquipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEquipeData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/equipes/${id}`);
        if (!response.ok) {
          throw new Error('Equipe não encontrada');
        }
        const data = await response.json();
        setEquipe(data);
      } catch (error) {
        console.error("Erro ao buscar dados da equipe:", error);
        setEquipe(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipeData();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Carregando perfil da equipe...</div>;
  }

  if (!equipe) {
    return <div className={styles.loading}>Equipe não encontrada.</div>;
  }

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
      </div>
    </>
  );
}