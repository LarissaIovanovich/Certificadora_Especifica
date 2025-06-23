import React, { useState } from "react";
import "./../assets/admin-styles.css";

const initialChampionships = [
  "Campeonato Fúria 2025",
  "Desafio UTFPR Games",
  "Copa Atlética FPS",
  "Liga de Verão 2025"
];

const initialEquipesPorCampeonato = {
  "Campeonato Fúria 2025": [
    { nome: "Sentinels", email: "contact@sentinels.gg", pago: true },
    { nome: "100 Thieves", email: "info@100thieves.com", pago: false },
    { nome: "Team Liquid", email: "support@teamliquid.com", pago: true },
    { nome: "Fnatic", email: "esports@fnatic.com", pago: false },
    { nome: "G2 Esports", email: "contact@g2esports.com", pago: true }
  ],
  "Desafio UTFPR Games": [
    { nome: "Cloud9", email: "hello@cloud9.gg", pago: true },
    { nome: "DRX", email: "contact@drxesports.com", pago: true },
    { nome: "Natus Vincere", email: "info@navination.com", pago: false },
    { nome: "T1", email: "contact@t1.gg", pago: true },
    { nome: "FaZe Clan", email: "support@fazeclan.com", pago: false }
  ],
  "Copa Atlética FPS": [
    { nome: "Sentinels", email: "contact@sentinels.gg", pago: true },
    { nome: "100 Thieves", email: "info@100thieves.com", pago: true },
    { nome: "Team Liquid", email: "support@teamliquid.com", pago: false },
    { nome: "Fnatic", email: "esports@fnatic.com", pago: false },
    { nome: "G2 Esports", email: "contact@g2esports.com", pago: true }
  ],
  "Liga de Verão 2025": [
    { nome: "Cloud9", email: "hello@cloud9.gg", pago: true },
    { nome: "DRX", email: "contact@drxesports.com", pago: true },
    { nome: "Natus Vincere", email: "info@navination.com", pago: false },
    { nome: "T1", email: "contact@t1.gg", pago: true },
    { nome: "FaZe Clan", email: "support@fazeclan.com", pago: false }
  ]
};

export default function AdminPage() {
  const [championships, setChampionships] = useState(initialChampionships);
  const [equipesPorCampeonato, setEquipesPorCampeonato] = useState(initialEquipesPorCampeonato);
  const [relatoriosPorCampeonato, setRelatoriosPorCampeonato] = useState({});
  const [campeonatoSelecionado, setCampeonatoSelecionado] = useState(null);
  const [modalGerenciamentoOpen, setModalGerenciamentoOpen] = useState(false);
  const [modalRelatoriosOpen, setModalRelatoriosOpen] = useState(false);

  const [tituloRelatorio, setTituloRelatorio] = useState("");
  const [resumoRelatorio, setResumoRelatorio] = useState("");

  // Funções para botões da lista

  function gerarConfrontos(nome) {
    alert(`Confrontos gerados para "${nome}"!`);
  }

  function suspenderCampeonato(nome) {
    alert(`Campeonato "${nome}" suspenso.`);
  }

  function cancelarCampeonato(nome, index) {
    if (window.confirm(`Tem certeza que deseja cancelar "${nome}"?`)) {
      alert(`Campeonato "${nome}" cancelado.`);
      setChampionships((prev) => {
        const novos = [...prev];
        novos[index] = "CANCELADO";
        return novos;
      });
    }
  }

  // Modal Gerenciamento

  function abrirGerenciamento(nome) {
    setCampeonatoSelecionado(nome);
    setModalGerenciamentoOpen(true);
  }

  function fecharModalGerenciamento() {
    setModalGerenciamentoOpen(false);
  }

  function togglePagamento(index) {
    setEquipesPorCampeonato((prev) => {
      const equipes = [...prev[campeonatoSelecionado]];
      equipes[index] = { ...equipes[index], pago: !equipes[index].pago };
      return { ...prev, [campeonatoSelecionado]: equipes };
    });
  }

  function removerEquipe(index) {
    if (window.confirm(`Remover equipe ${equipesPorCampeonato[campeonatoSelecionado][index].nome}?`)) {
      setEquipesPorCampeonato((prev) => {
        const equipes = [...prev[campeonatoSelecionado]];
        equipes.splice(index, 1);
        return { ...prev, [campeonatoSelecionado]: equipes };
      });
    }
  }

  // Modal Relatórios

  function abrirModalRelatorios(nome) {
    setCampeonatoSelecionado(nome);
    setModalRelatoriosOpen(true);
    const relatorio = relatoriosPorCampeonato[nome];
    setTituloRelatorio(relatorio?.titulo || "");
    setResumoRelatorio(relatorio?.resumo || "");
  }

  function fecharModalRelatorios() {
    setModalRelatoriosOpen(false);
  }

  function salvarRelatorio() {
    if (!tituloRelatorio.trim() || !resumoRelatorio.trim()) {
      alert("Preencha título e resumo antes de salvar.");
      return;
    }
    setRelatoriosPorCampeonato((prev) => ({
      ...prev,
      [campeonatoSelecionado]: { titulo: tituloRelatorio, resumo: resumoRelatorio }
    }));
    alert("Relatório salvo com sucesso!");
    fecharModalRelatorios();
  }

  return (
    <>
      <div className="background-overlay"></div>

      <div className="main-container">
        <div className="manager-container">
          <h1 className="title">ATLÉTICA FÚRIA UTFPR</h1>
          <p className="subtitle">TELA DE ADMINISTRAÇÃO</p>

          <ul className="championship-list">
            {championships.map((name, i) => (
              <li key={i} className={name === "CANCELADO" ? "cancelado" : ""}>
                <span>{name}</span>
                <div className="button-group">
                  <button onClick={() => gerarConfrontos(name)}>Gerar Confrontos</button>
                  <button onClick={() => suspenderCampeonato(name)}>Suspender</button>
                  <button onClick={() => cancelarCampeonato(name, i)}>Cancelar</button>
                  <button onClick={() => abrirGerenciamento(name)}>Controle de Pagamentos</button>
                  <button className="relatorios" onClick={() => abrirModalRelatorios(name)}>Relatórios</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="image-container">
          <img src="IMG.jpg" alt="Arte da Atlética" />
        </div>
      </div>

      {/* Modal Gerenciamento */}
      {modalGerenciamentoOpen && (
        <div
          className="modal"
          onClick={fecharModalGerenciamento}
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
              color: "#f5c400",
              fontFamily: "'Bebas Neue', sans-serif",
              textTransform: "uppercase",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <span
              className="close"
              onClick={fecharModalGerenciamento}
              style={{
                cursor: "pointer",
                fontSize: "28px",
                fontWeight: "700",
                color: "#f5c400",
                float: "right",
                marginBottom: "10px",
              }}
            >
              &times;
            </span>

            <h2>Gerenciar Campeonato</h2>
            <p className="modal-title">Campeonato: {campeonatoSelecionado}</p>

            <table className="tabela-jogadores" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Status Pagamento</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {(equipesPorCampeonato[campeonatoSelecionado] || []).length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ color: "#f5c400", fontWeight: "700", textAlign: "center" }}>
                      Nenhuma equipe cadastrada.
                    </td>
                  </tr>
                ) : (
                  (equipesPorCampeonato[campeonatoSelecionado] || []).map((equipe, idx) => (
                    <tr key={idx}>
                      <td>{equipe.nome}</td>
                      <td><span className="email">&lt;{equipe.email}&gt;</span></td>
                      <td>
                        <button
                          className={`status ${equipe.pago ? "pago" : "nao-pago"}`}
                          onClick={() => togglePagamento(idx)}
                        >
                          {equipe.pago ? "Pago" : "Não Pago"}
                        </button>
                      </td>
                      <td>
                        <button className="remover" onClick={() => removerEquipe(idx)}>Remover</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Relatórios */}
      {modalRelatoriosOpen && (
        <div
          className="modal"
          onClick={fecharModalRelatorios}
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
              color: "#f5c400",
              fontFamily: "'Bebas Neue', sans-serif",
              textTransform: "uppercase",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <span
              className="close"
              onClick={fecharModalRelatorios}
              style={{
                cursor: "pointer",
                fontSize: "28px",
                fontWeight: "700",
                color: "#f5c400",
                float: "right",
                marginBottom: "10px",
              }}
            >
              &times;
            </span>

            <h2>Relatório do Campeonato</h2>
            <p><strong>{campeonatoSelecionado}</strong></p>

            <label htmlFor="tituloRelatorio">Título:</label>
            <input
              type="text"
              id="tituloRelatorio"
              placeholder="Digite o título"
              value={tituloRelatorio}
              onChange={(e) => setTituloRelatorio(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #f5c400",
                backgroundColor: "#121212",
                color: "#f5c400",
                fontFamily: "'Bebas Neue', sans-serif",
                textTransform: "uppercase"
              }}
            />

            <label htmlFor="resumoRelatorio">Resumo:</label>
            <textarea
              id="resumoRelatorio"
              placeholder="Digite o resumo"
              rows="6"
              value={resumoRelatorio}
              onChange={(e) => setResumoRelatorio(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #f5c400",
                backgroundColor: "#121212",
                color: "#f5c400",
                fontFamily: "'Bebas Neue', sans-serif",
                textTransform: "uppercase"
              }}
            />

            <button
              onClick={salvarRelatorio}
              style={{
                marginTop: "15px",
                backgroundColor: "#f5c400",
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: "pointer",
                padding: "10px 15px",
                width: "100%"
              }}
            >
              Salvar Relatório
            </button>
          </div>
        </div>
      )}
    </>
  );
}


