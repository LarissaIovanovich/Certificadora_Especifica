import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'; // Juntei o Link aqui
import styles from "./Chaveamento.module.css";
import CampeonatoHeader from "./CampeonatoHeader";
import FuriaNav from "./FuriaNav";

// --- FUNÇÃO DE CHAVEAMENTO ---
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
        teamA: { nome: `Vencedor Jogo ${rounds.length}-${i / 2 + 1}`, isPlaceholder: true },
        teamB: currentRound[i + 1] 
          ? { nome: `Vencedor Jogo ${rounds.length}-${i / 2 + 2}`, isPlaceholder: true } 
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
        const response = await fetch(`/api/torneios/${id}`);
        if (!response.ok) {
          throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const data = await response.json();
        setCampeonato(data);
      } catch (err) {
        console.error("Erro ao buscar dados do torneio:", err);
        setCampeonato(null);
      } finally {
        setLoading(false);
      }
    }
    fetchTournamentData();
  }, [id]);

  if (loading) return <div className={styles.title}>Carregando chaveamento...</div>;

  if (!campeonato) return <div className={styles.title}>Torneio não encontrado ou erro ao carregar.</div>;
  
  const equipesDoTorneio = campeonato.equipes || [];
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
            {/* ... JSX do chaveamento ... */}
            <h1 className={styles.title}>CHAVEAMENTO</h1>
            <div className={styles.doubleBracketTree}>
              <div className={styles.bracketTree}>
                {leftRounds.map((round, roundIdx) => (
                  <div className={styles.roundColumn} key={`left-round-${roundIdx}`}>
                    {round.map((match, matchIdx) => (
                      <div className={styles.matchBox} key={`left-match-${matchIdx}`}>
                        <span className={styles.teamInline}>{renderTeamName(match.teamA)}</span>
                        <span className={styles.teamInline}>{renderTeamName(match.teamB)}</span>
                      </div>
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
                      <div className={styles.matchBox} key={`right-match-${matchIdx}`}>
                        <span className={styles.teamInline}>{renderTeamName(match.teamA)}</span>
                        <span className={styles.vs}></span>
                        <span className={styles.teamInline}>{renderTeamName(match.teamB)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <button
            className={styles.showTeamsButton}
            onClick={() => setShowTeams(!showTeams)}
          >
            {showTeams ? 'Ocultar equipes' : 'Ver equipes inscritas'}
          </button>

          {}
          {showTeams && (
            <div className={styles.teamListContainer}>
              {equipesDoTorneio.length > 0 ? (
                <ul className={styles.teamList}>
                  {equipesDoTorneio.map((equipe) => (
                    <li key={equipe.id} className={styles.teamListRow}>
                      <div className={styles.teamListItem}>
                        <img src={equipe.url_logo} alt={equipe.nome} className={styles.teamListLogo} />
                        <div className={styles.teamNameContainer}>
                          <Link to={`/equipe/${equipe.id}`} className={styles.teamListNameLink}>
                            {equipe.nome}
                          </Link>
                          <span className={styles.teamListTag}>({equipe.tag})</span>
                        </div>
                        <button 
                          className={styles.expandButton} 
                          onClick={() => handleExpandTeam(equipe.id)}
                        >
                          {expandedTeamId === equipe.id ? '▲' : '▼'}
                        </button>
                      </div>
                      
                      {expandedTeamId === equipe.id && (
                        <div className={styles.playerDropdown}>
                          <ul>
                            {equipe.jogadores && equipe.jogadores.length > 0 ? (
                                equipe.jogadores.map(jogador => (
                                    <li key={jogador.id}>
                                        <strong>{jogador.apelido}</strong> 
                                        <span> - ({jogador.posicao})</span>
                                    </li>
                                ))
                            ) : (
                                <li>Nenhum jogador cadastrado.</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma equipe inscrita neste torneio ainda.</p>
              )}
            </div>
          )}

          <div className={styles.twitchContainer}>
             <h2 className={styles.twitchTitle}>Transmissão Ao Vivo</h2>
            <div className={styles.twitchEmbedWrapper}>
               <iframe
                 src="https://player.twitch.tv/?channel=valorant_br&parent=localhost"
                 height="480"
                 width="1080"
                 allowFullScreen={true}
                 title="Transmissão Ao Vivo do canal xandfps"
              ></iframe>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}