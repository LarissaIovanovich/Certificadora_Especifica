import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import FuriaNav from '../components/FuriaNav';
import styles from './CriarPerfilJogadorPage.module.css'; 

export default function CriarPerfilJogadorPage() {
  const [apelido, setApelido] = useState('');
  const [riotId, setRiotId] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [posicao, setPosicao] = useState('Flex'); // Valor padrão
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const profileData = {
      apelido,
      riot_id: riotId, 
      tag_line: tagLine,
      posicao,
    };

    try {
      await api.post('/jogadores', profileData);

      setMessage('Perfil de jogador criado com sucesso! Redirecionando...');
      setTimeout(() => {
        // Envia o usuário para a página "Minha Equipe"
        navigate('/minha-equipe');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Ocorreu um erro desconhecido.";
      setError(errorMessage);
    }
  };


  return (
    <>
      <FuriaNav />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Complete seu Perfil de Jogador</h1>
          <p className={styles.subtitle}>Insira suas informações de jogo para poder entrar em uma equipe.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Seu Apelido (Nickname)"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              required
              className={styles.input}
            />
            <div className={styles.riotIdContainer}>
              <input
                type="text"
                placeholder="Riot ID"
                value={riotId}
                onChange={(e) => setRiotId(e.target.value)}
                required
                className={styles.input}
              />
              <span>#</span>
              <input
                type="text"
                placeholder="Tagline"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                required
                className={styles.inputTag}
              />
            </div>
            <select
              value={posicao}
              onChange={(e) => setPosicao(e.target.value)}
              required
              className={styles.input}
            >
              <option value="Flex">Flex</option>
              <option value="Controlador">Controlador</option>
              <option value="Duelista">Duelista</option>
              <option value="Iniciador">Iniciador</option>
              <option value="Sentinela">Sentinela</option>
            </select>
            <button type="submit" className={styles.submitButton}>Salvar Perfil</button>
          </form>
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    </>
  );
}