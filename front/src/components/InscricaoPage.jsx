import React from "react";
import "./Inscricao.module.css";

const InscricaoPage = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">FÚRIA E-SPORTS</div>
        <ul className="menu">
          <li><a href="/campeonatos">JOGOS</a></li>
        </ul>
      </nav>

      <div className="main-container">
        <div className="form-container">
          <h1>Confirmação de Inscrição</h1>

          <form>
            <fieldset>
              <legend>Dados do Torneio</legend>
              <ul>
                <li>Nome: Torneio Quebrados</li>
                <li>Data: 20/08/2025</li>
                <li>Hora: 20:00</li>
                <li>Jogo: Valorant</li>
                <li>Vagas disponíveis: 2</li>
              </ul>
            </fieldset>

            <fieldset>
              <legend>Equipe</legend>
              <p>Nome da Equipe: Os Vingadores</p>
            </fieldset>

            <fieldset>
              <legend>Integrantes</legend>
              <ul id="resumoIntegrantes">
                <li>Tony Stark</li>
                <li>Steve Rogers</li>
                <li>Natasha Romanoff</li>
                <li>Bruce Banner</li>
              </ul>
            </fieldset>

            <fieldset>
              <legend>Regulamento</legend>
              <label>
                <input type="checkbox" id="aceite" required />
                Declaro que li e aceito o regulamento do torneio.
              </label>
            </fieldset>

            <button type="submit" className="btn-submit">Inscrever Equipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscricaoPage;
