import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import styles from "./Chaveamento.module.css";
import CampeonatoHeader from "./CampeonatoHeader";
import FuriaNav from "./FuriaNav";
import api from "../services/api";

function generateBracket(teams) {
  if (!teams || teams.length === 0) return [];
  const rounds = [];
  let currentRound = teams.map((team, idx) => ({
    teamA: team,
    teamB: teams[idx + 1] || { nome: "BYE", isPlaceholder: true },
  })).filter((_, idx) => idx % 2 === 0);
  rounds.push(currentRound);
  while (currentRound.length > 1) {
    const nextRound = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      nextRound.push({
        teamA: { nome: `Vencedor Jogo ${rounds.length}-${Math.floor(i / 2) + 1}`, isPlaceholder: true },
        teamB: currentRound[i + 1] 
          ? { nome: `Vencedor Jogo ${rounds.length}-${Math.floor(i / 2) + 2}`, isPlaceholder: true } 
          : { nome: "BYE", isPlaceholder: true },
      });
    }
    rounds.push(nextRound);
    currentRound = nextRound;
  }
  return rounds;
}

const renderTeamName = (team) => {
  if (typeof team === 'string') return team;
  return team?.nome || "A definir";
};

const findMatchForTeams = (teamA, teamB, allMatches) => {
  if (!teamA || !teamB || teamA.isPlaceholder || teamB.isPlaceholder || !allMatches) {
    return null;
  }
  return allMatches.find(
    (match) =>
      (match.equipe_a_id === teamA.id && match.equipe_b_id === teamB.id) ||
      (match.equipe_a_id === teamB.id && match.equipe_b_id === teamA.id)
  );
};

const renderMatch = (match, key, partidasDoTorneio, styles) => {
    const partidaReal = findMatchForTeams(match.teamA, match.teamB, partidasDoTorneio);
    
    const matchContent = (
      <div className={styles.matchBox}>
        <span className={styles.teamInline}>{renderTeamName(match.teamA)}</span>
        <span className={styles.teamInline}>{renderTeamName(match.teamB)}</span>
      </div>
    );

    if (partidaReal && partidaReal.id) {
      return (
        <Link 
          to={`/partidas/${partidaReal.id}/relatorio`} 
          key={key}
          className={styles.matchLink}
        >
          {matchContent}
        </Link>
      );
    }
    return <div key={key}>{matchContent}</div>;
};

export default function ChaveamentoPage() {
  const { id } = useParams();
  const [campeonato, setCampeonato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTeams, setShowTeams] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  const handleExpandTeam = (teamId) => {
    setExpandedTeamId(currentId => (currentId === teamId ? null : teamId));
  };

  useEffect(() => {
    async function fetchTournamentData() {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(`/torneios/${id}`);
        setCampeonato(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados do torneio:", err);
        setCampeonato(null);
      } finally {
        setLoading(false);
      }
    }
    fetchTournamentData();
  }, [id]);

  if (loading) return <div className={styles.title}>A carregar chaveamento...</div>;
  if (!campeonato) return <div className={styles.title}>Torneio não encontrado ou erro ao carregar.</div>;
  
  const equipesDoTorneio = campeonato.equipes || [];
  const partidasDoTorneio = campeonato.partidas || [];
  const totalTeams = 16;
  
  const filledTeams = [
    ...equipesDoTorneio,
    ...Array(Math.max(0, totalTeams - equipesDoTorneio.length)).fill({
      nome: 'Vaga Aberta',
      isPlaceholder: true,
    })
  ];

  const leftTeams = filledTeams.slice(0, 8);
  const rightTeams = filledTeams.slice(8, 16);
  const leftRounds = generateBracket(leftTeams);
  const rightRounds = generateBracket(rightTeams);

  return (
    <>
      <FuriaNav />
      <div style={{ height: '70px' }}></div>
      <div>
        <CampeonatoHeader campeonato={campeonato} />
        <main className={styles.mainContainer}>
          <section className={styles.bracketSection}>
            <h1 className={styles.title}>CHAVEAMENTO</h1>
            <div className={styles.doubleBracketTree}>
              <div className={styles.bracketTree}>
                {leftRounds.map((round, roundIdx) => (
                  <div className={styles.roundColumn} key={`left-round-${roundIdx}`}>
                    {round.map((match, matchIdx) => (
                      renderMatch(match, `left-match-${roundIdx}-${matchIdx}`, partidasDoTorneio, styles)
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles.finalColumn}>
                <div className={styles.finalMatchBox}>
                  <div className={styles.teamRow}><span>Vencedor Esquerda</span></div>
                  <div className={styles.teamRow}><span>Final</span></div>
                  <div className={styles.teamRow}><span>Vencedor Direita</span></div>
                </div>
              </div>
              <div className={styles.bracketTree}>
                {[...rightRounds].reverse().map((round, roundIdx) => (
                  <div className={styles.roundColumn} key={`right-round-${roundIdx}`}>
                    {round.map((match, matchIdx) => (
                       renderMatch(match, `right-match-${roundIdx}-${matchIdx}`, partidasDoTorneio, styles)
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
