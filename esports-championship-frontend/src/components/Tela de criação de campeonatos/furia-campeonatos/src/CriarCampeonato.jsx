import React, { useState } from "react";

export default function CriarCampeonato() {
  const [champName, setChampName] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#fff");
  const [animate, setAnimate] = useState(false);

  function animateMessage() {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = champName.trim();

    if (trimmedName.length < 3) {
      setMessageColor("#e74c3c");
      setMessage("O nome do campeonato deve ter pelo menos 3 caracteres.");
      animateMessage();
      return;
    }

    setMessageColor("limegreen");
    setMessage(`✅ Campeonato "${trimmedName}" criado com sucesso!`);
    animateMessage();
    setChampName("");
  }

  function handleCancel() {
    const trimmedName = champName.trim();

    if (trimmedName.length >= 3) {
      setMessage(`❌ Campeonato "${trimmedName}" foi cancelado.`);
    } else {
      setMessage("Criação cancelada.");
    }

    setMessageColor("#e74c3c");
    animateMessage();
    setChampName("");
  }

  return (
    <>
      <div className="background-overlay"></div>

      <div className="main-container">
        <div className="login-container">
          <h1 className="title">ATLÉTICA FÚRIA UTFPR</h1>
          <p className="subtitle">CRIAR CAMPEONATO</p>

          <form id="createChampionshipForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-flag"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 22V2m0 0h15l-4 6 4 6H4" />
              </svg>

              <input
                type="text"
                placeholder="Nome do Campeonato"
                id="champName"
                value={champName}
                onChange={(e) => setChampName(e.target.value)}
                required
              />
            </div>

            <button type="submit">CRIAR</button>
            <button
              type="button"
              id="cancelButton"
              className="cancel-btn"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
          </form>

          <p
            id="createMessage"
            style={{
              color: messageColor,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(-5px)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            {message}
          </p>
        </div>

        <div className="image-container">
          <img src="/IMG.jpg" alt="Arte da Atlética" loading="lazy" />
        </div>
      </div>
    </>
  );
}
