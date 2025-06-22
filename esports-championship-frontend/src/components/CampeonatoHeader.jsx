import React from "react";
import styles from "./Chaveamento.module.css";

export default function CampeonatoHeader({ campeonato }) {
  const {
    nome = "",
    descricao = "",
    premiacao = "",
    url_imagem_banner,
    data_inicio,
    data_fim,
    status
  } = campeonato || {};

  return (
    <header className={styles.campeonatoHeaderHorizontal}>
      <div className={styles.headerImageBoxMinimal}>
        <img
          src={url_imagem_banner}
          alt={nome}
          className={styles.campeonatoImage}
        />
      </div>
      <div className={styles.headerInfoHorizontal}>
        <h1 className={styles.campeonatoNome}>{nome}</h1>
        <p className={styles.campeonatoDescricao}>{descricao}</p>
        <span className={styles.premiacaoTexto}>Premiação: {premiacao}</span>
        <div style={{ margin: "12px 0" }}>
          <span style={{ color: "#FFD700", fontWeight: "bold" }}>
            {data_inicio && data_fim
              ? `Período: ${new Date(data_inicio).toLocaleDateString()} - ${new Date(data_fim).toLocaleDateString()}`
              : null}
          </span>
          {status && (
            <span style={{ marginLeft: 16, color: "#fff" }}>
              Status: {status}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}