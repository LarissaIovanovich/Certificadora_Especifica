import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import styles from './RelatorioPartidaPage.module.css'; // O CSS é importado aqui
import FuriaNav from './FuriaNav';

export default function RelatorioPartidaPage() {
  const { id } = useParams();
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRelatorio() {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/partidas/${id}/relatorio`);
        setRelatorio(response.data);
      } catch (err) {
        setError("Não foi possível carregar o relatório da partida.");
        console.error("Erro na API:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatorio();
  }, [id]);

  const getMvp = (data) => {
    if (!data) return null;
    const todosJogadores = [...(data.equipeA?.jogadores || []), ...(data.equipeB?.jogadores || [])];
    return todosJogadores.find(j => j.mvp) || null;
  };

  const getTotalStats = (data) => {
    if (!data) return { abates: 0, mortes: 0, assistencias: 0 };
    const todosJogadores = [...(data.equipeA?.jogadores || []), ...(data.equipeB?.jogadores || [])];
    return todosJogadores.reduce((acc, jogador) => {
        acc.abates += jogador.abates;
        acc.mortes += jogador.mortes;
        acc.assistencias += jogador.assistencias;
        return acc;
    }, { abates: 0, mortes: 0, assistencias: 0 });
  };
  
  const renderTeamTable = (equipe) => {
    if (!equipe || !equipe.jogadores || equipe.jogadores.length === 0) {
      return <p>Dados dos jogadores não disponíveis.</p>;
    }

    return (
      <section className={styles.teamSection}>
        <div className={styles.teamHeader}>
            <img src={equipe.url_logo} alt={`Logo ${equipe.nome}`} className={styles.teamLogo} />
            <h2 className={styles.sectionTitle}>{equipe.nome}</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.playersTable}>
            <thead>
              <tr>
                <th>Jogador</th>
                <th>Agente</th>
                <th>K / D / A</th>
              </tr>
            </thead>
            <tbody>
              {equipe.jogadores.map(jogador => (
                <tr key={jogador.jogador_id} className={jogador.mvp ? styles.mvpRow : ''}>
                  <td>{jogador.nome}</td>
                  <td>{jogador.agente}</td>
                  <td>{`${jogador.abates} / ${jogador.mortes} / ${jogador.assistencias}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <>
        <FuriaNav />
        <div className={styles.loadingContainer}>A carregar Relatório...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <FuriaNav />
        <div className={styles.loadingContainer}>{error}</div>
      </>
    );
  }

  if (!relatorio) {
    return (
      <>
        <FuriaNav />
        <div className={styles.loadingContainer}>Nenhum dado encontrado para esta partida.</div>
      </>
    );
  }

  const mvp = getMvp(relatorio);
  const totalStats = getTotalStats(relatorio);

  return (
    <>
      <FuriaNav /> 
      <div className={styles.pageContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Relatório da Partida: {relatorio.equipeA?.nome || 'Time A'} vs {relatorio.equipeB?.nome || 'Time B'}
          </h1>
          <p className={styles.subtitle}>Mapa: {relatorio.mapa || 'Não definido'}</p>

          <section className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h2>MVP da Partida</h2>
              <p className={styles.mvpName}>{mvp ? mvp.nome : 'N/A'}</p>
            </div>
            <div className={styles.summaryCard}>
              <h2>Estatísticas Totais</h2>
              <p>Abates: {totalStats.abates}</p>
              <p>Mortes: {totalStats.mortes}</p>
              <p>Assistências: {totalStats.assistencias}</p>
            </div>
          </section>

          <div className={styles.tablesContainer}>
            {renderTeamTable(relatorio.equipeA)}
            {renderTeamTable(relatorio.equipeB)}
          </div>
        </div>
      </div>
    </>
  );
}
