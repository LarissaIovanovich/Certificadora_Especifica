import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa'; 
import styles from './Campeonatos.module.css';
import chaveamentoStyles from './Chaveamento.module.css';
import furiaLogo from '../assets/furia-logo.png';
import FuriaNav from './FuriaNav';

export default function Campeonatos() {
  const [torneios, setTorneios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/torneios')
      .then(res => res.json())
      .then(data => {
        setTorneios(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <FuriaNav />
      {/* Espaço para o nav fixo */}
      <div style={{ height: '70px' }}></div>

      <main className={styles['main-container']} style={{ display: 'flex', justifyContent: 'center' }}>
        <section
          className={styles['form-container']}
          style={{
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            background: 'rgba(0,0,0,0.7)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h1 style={{ color: '#fff', fontFamily: 'Bebas Neue', fontSize: 36, marginBottom: 24 }}>
            CAMPEONATOS DE VALORANT
          </h1>
          {loading && <p style={{ color: '#fff' }}>Carregando...</p>}
          <div className={styles.grid}>
            {torneios.map((t) => (
              <a key={t.id} href={`/chaveamento/${t.id}`} className={styles.card}>
                <div className={styles['image-placeholder']}>
                  <img
                    src={t.url_imagem_banner || 'https://via.placeholder.com/600x300'}
                    alt={t.nome}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'contain',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                </div>
                <div className={styles['card-content']}>
                  <h2>{t.nome}</h2>
                  <p>{t.data_inicio} - {t.data_fim}</p>
                  <p>{t.premiacao ? `Premiação: R$ ${t.premiacao}` : null}</p>
                </div>
                <div className={styles['hover-label']}>Informações</div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
