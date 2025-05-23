import React, { useState } from "react";
import "./placar.module.css";

export default function Classificacao() {
  const [menuAtivo, setMenuAtivo] = useState(false);

  function toggleMenu() {
    setMenuAtivo((ativo) => !ativo);
  }

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>

      {/* Menu Lateral */}
      <nav className={`side-menu ${menuAtivo ? "active" : ""}`} id="sideMenu">
        <ul>
          <li><a href="campeonatos.html">Jogos</a></li>
          <li><a href="partidas.html">Partidas</a></li>
          <li><a href="#">Estatísticas</a></li>
        </ul>
      </nav>

      {/* Layout principal */}
      <div className="layout">
        <header className="header">
          <h1 className="title">CLASSIFICAÇÃO</h1>
        </header>

        <main className="content">
          {/* Tabela de resultados */}
          <section className="match-results">
            <table>
              <thead>
                <tr>
                  <th>Mapa</th>
                  <th>Resultado</th>
                  <th>Placar</th>
                  <th>MVP</th>
                  <th>Duração</th>
                  <th>Pontuação</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>ASCENT</td><td>TIME A</td><td>13-11</td><td>CHAGINHO</td><td>34:19</td><td>+3</td></tr>
                <tr><td>BIND</td><td>TIME A</td><td>13-8</td><td>CHAGINHO</td><td>26:01</td><td>+3</td></tr>
                <tr><td>HAVEN</td><td>TIME B</td><td>9-13</td><td>FRAGA</td><td>31:40</td><td>+3</td></tr>
                <tr><td>ICEBOX</td><td>TIME B</td><td>13-10</td><td>CHAGINHO</td><td>37:05</td><td>+3</td></tr>
              </tbody>
            </table>
          </section>

          {/* Tabela de pontuação */}
          <section className="total-score">
            <h2 className="score-title">PONTUAÇÃO TOTAL</h2>
            <table>
              <thead>
                <tr><th>EQUIPE</th><th>J</th><th>V</th><th>E</th><th>D</th></tr>
              </thead>
              <tbody>
                <tr><td>TIME A</td><td>4</td><td>3</td><td>0</td><td>1</td></tr>
                <tr><td>TIME B</td><td>4</td><td>1</td><td>0</td><td>3</td></tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
