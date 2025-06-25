import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import imgArte from '../assets/IMG.jpg';
import FuriaNav from "./FuriaNav";
import api from "../services/api";


export default function CriarCampeonato() {
  const [champName, setChampName] = useState("");
  const [champDescription, setChampDescription] = useState("");
  const [champType, setChampType] = useState("");
  const [champPrize, setChampPrize] = useState(0);
  const [champStart, setChampStart] = useState("");
  const [champEnd, setChampEnd] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#fff");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate(); 
  const [registerMessage, setRegisterMessage] = useState("");


  function animateMessage() {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = champName.trim();

    if (trimmedName.length < 3) {
      setMessageColor("#e74c3c");
      setMessage("O nome do campeonato deve ter pelo menos 3 caracteres.");
      animateMessage();
      return;
    }
    try {
      const torneioData = {
        nome: champName,
        descricao: champDescription,
        premiacao: champPrize,
        data_inicio: champStart,
        data_fim: champEnd, 
      };
    
      await api.post('/torneios', torneioData);

      setMessageColor("limegreen");
      setMessage(`✅ Campeonato "${trimmedName}" criado com sucesso!`);
      animateMessage();
      setChampName("");
      
      setTimeout(() => {
        
        navigate('/admin/torneios');
      }, 1000);

    } catch (error) {
      alert("Erro ao cadastrar torneio. Verifique os dados e tente novamente.");
      console.error("Erro no cadastro:", error);
    }
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
      <FuriaNav />
    <div className="login-page-wrapper">
      <div className="background-overlay" />
      <div className="main-container">
        <div className="login-container">
          <h1 className="title">CRIAR CAMPEONATO</h1>
          <form onSubmit={handleSubmit}>

            <label htmlFor="nomeCampeonato">NOME</label>
            <input
              type="text"
              id="nomeCampeonato"
              placeholder="Insira o nome do campeonato"
              value={champName}
              onChange={(e) => setChampName(e.target.value)}
              required
            />

            <label htmlFor="descricao">DESCRIÇÃO</label>
            <input
              type="text"
              id="descricao"
              placeholder="Insira a descrição"
              value={champDescription}
              onChange={(e) => setChampDescription(e.target.value)}
            />

            <label htmlFor="descricao">FORMATO</label>
            <input
              type="text"
              id="formato"
              placeholder="Insira a descrição"
              value={champType}
              onChange={(e) => setChampType(e.target.value)}
            />

          <label htmlFor="premio">PREMIAÇÃO (EM DINHEIRO)</label>
            <input
              type="number"
              id="premiacao"    
              placeholder="Insira a premiação (apenas números)"
              value={champPrize}
              onChange={(e) => setChampPrize(e.target.value)}
            />
          <label htmlFor="inicio">DATA (Início)</label>
            <input
              type="date"
              id="inicio"    
              value={champStart}
              onChange={(e) => setChampStart(e.target.value)}
            />

          <label htmlFor="inicio">DATA (Fim)</label>
            <input
              type="date"
              id="fim"    
              value={champEnd}
              onChange={(e) => setChampEnd(e.target.value)}
            />
            <button type="submit" className="btn-submit">
              CADASTRAR TORNEIO <i className="fas fa-chevron-right"></i>
            </button>

          </form>
          {/* Mensagem de feedback */}
          <p className="login-message-feedback" style={{ color: registerMessage.includes("sucesso") ? "limegreen" : "#e74c3c" }}>
            {registerMessage}
          </p>
        
        </div>
        <div className="image-container">
          <img src={imgArte} alt="Arte da Atlética" />
        </div>
      </div>
    </div>
    </>
  );
}
