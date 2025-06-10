import React from 'react';
import './TournamentBracket.css';

const TournamentBracket = () => {
  const renderMatch = (team1, team2, roundClass) => (
    <div className={`match ${roundClass}`}>
      <div className="team">{team1}</div>
      <div className="team">{team2}</div>
    </div>
  );

  return (
    <div className="bracket-container">
      <div className="bracket">
        {/* Lado Esquerdo */}
        <div className="column align-end">
          {renderMatch('TEAM 1', 'TEAM 2', 'round-1 pink')}
          {renderMatch('TEAM 3', 'TEAM 4', 'round-1 pink')}
          {renderMatch('TEAM 5', 'TEAM 6', 'round-1 purple')}
          {renderMatch('TEAM 7', 'TEAM 8', 'round-1 purple')}
        </div>
        <div className="column align-end">
          {renderMatch('TEAM', 'TEAM', 'round-2 pink')}
          {renderMatch('TEAM', 'TEAM', 'round-2 purple')}
        </div>
        <div className="column align-center">
          {renderMatch('TEAM', 'TEAM', 'semi-final')}
        </div>

        {/* Final */}
        <div className="final-column">
          <div className="final-match">
            <span className="team pink">TEAM</span>
            <span className="vs">VS</span>
            <span className="team blue">TEAM</span>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="column align-center">
          {renderMatch('TEAM', 'TEAM', 'semi-final')}
        </div>
        <div className="column align-start">
          {renderMatch('TEAM', 'TEAM', 'round-2 blue')}
          {renderMatch('TEAM', 'TEAM', 'round-2 orange')}
        </div>
        <div className="column align-start">
          {renderMatch('TEAM 1', 'TEAM 2', 'round-1 blue')}
          {renderMatch('TEAM 3', 'TEAM 4', 'round-1 blue')}
          {renderMatch('TEAM 5', 'TEAM 6', 'round-1 orange')}
          {renderMatch('TEAM 7', 'TEAM 8', 'round-1 orange')}
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;
