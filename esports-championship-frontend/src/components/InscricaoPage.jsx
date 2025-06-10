import React, { useState } from "react";
import styles from "./Inscricao.module.css";

const InscricaoPage = () => {
  const [regulamentoAceito, setRegulamentoAceito] = useState(false);
  const [dadosConfirmados, setDadosConfirmados] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regulamentoAceito && dadosConfirmados) {
      alert("Inscrição confirmada com sucesso!");
      // Aqui entraria a lógica de envio para a API
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Confirmação de Inscrição</h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados do Torneio</legend>
              <ul>
                <li>Nome: Torneio Quebrados</li>
                <li>Data do primeiro dia: 20/08/2025 às 20:00</li>
                <li>Total de Times: 16</li>
                <li>Vagas disponíveis: 2</li>
                <li>Data de inscrição: até 18/08/2025</li>
                <li>Jogo: Valorant</li>
                <li>Descrição: Série de partidas jogadas em diferentes mapas por diferentes times</li>
              </ul>
            </fieldset>

            <fieldset>
              <legend>Equipe</legend>
              <p>Nome da Equipe: Os Vingadores</p>
            </fieldset>

            <fieldset>
              <legend>Integrantes</legend>
              <ul>
                <li>Tony Stark — IronMan</li>
                <li>Steve Rogers — Capitão</li>
                <li>Natasha Romanoff — BlackWidow</li>
                <li>Bruce Banner — HulkSmash</li>
              </ul>
            </fieldset>

            <fieldset>
              <legend>Confirmações</legend>
              <label>
                <input
                  type="checkbox"
                  checked={regulamentoAceito}
                  onChange={() => setRegulamentoAceito(!regulamentoAceito)}
                  required
                />
                Li e aceito o regulamento do torneio.
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={dadosConfirmados}
                  onChange={() => setDadosConfirmados(!dadosConfirmados)}
                  required
                />
                Confirmo que os dados da equipe estão corretos.
              </label>
            </fieldset>

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={!regulamentoAceito || !dadosConfirmados}
            >
              Inscrever Equipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscricaoPage;
