import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import FuriaNav from './FuriaNav';
import styles from './AceitarConvitePage.module.css';

export default function AceitarConvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAccept = async () => {
    setStatus('loading');
    setError('');
    try {
      const res = await api.post(`/jogadores/accept-invite/${token}`);
      setSuccessMsg(res.data.message);
      setStatus('success');
      setTimeout(() => {
        navigate(`/equipe/${res.data.equipe_id}`);
      }, 1800);
    } catch (err) {
      setStatus('error');
      setError(
        err.response?.data?.error ||
        'Erro ao aceitar convite. Verifique se você está logado como jogador.'
      );
    }
  };

  return (
    <>
      <FuriaNav />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Convite para Entrar na Equipe</h1>
          {status === 'idle' && (
            <>
              <p className={styles.text}>
                Você foi convidado para entrar em uma equipe.<br />
                Deseja aceitar o convite?
              </p>
              <button
                className={styles.acceptButton}
                onClick={handleAccept}
              >
                Aceitar Convite
              </button>
            </>
          )}
          {status === 'loading' && (
            <p className={styles.loading}>Aceitando convite...</p>
          )}
          {status === 'success' && (
            <p className={styles.success}>{successMsg} <br />Redirecionando...</p>
          )}
          {status === 'error' && (
            <p className={styles.error}>{error}</p>
          )}
        </div>
      </div>
    </>
  );
}