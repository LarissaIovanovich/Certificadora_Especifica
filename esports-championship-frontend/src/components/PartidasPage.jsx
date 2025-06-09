import React from 'react';
import styles from './Partidas.module.css';

export default function PartidasPage() {
  const campeonato = {
    nome: 'Campeonato Nacional',
    andamento: 'Inscrições abertas',
  };

  return (
    <>
      <main className={styles['main-container']}>
        <section className={styles['form-container']}>
          <div className={styles['campeonatos-container']}>

            <main className={styles['main-content']}>

              {/* Header com título e botão */}
              <div className={styles['header-campeonato']}>
                <div>
                  <h1>{campeonato.nome}</h1>
                  <h2 className={styles['subtitulo-andamento']}>{campeonato.andamento}</h2>
                </div>

                {campeonato.andamento === 'Inscrições abertas' && (
                  <button className={styles['inscrever-button']}>Inscrever-se</button>
                )}
              </div>

              {/* Informações */}
              <div className={styles['info-box']}>
                <h3>Informações:</h3>
                <p>
                  Este campeonato reúne equipes de todo o país em confrontos eliminatórios semanais.
                  Prepare-se para jogos emocionantes, transmissões ao vivo e muito mais!
                </p>
              </div>


              <div className={styles.partidasDivider}></div>
              <h1 className={styles.partidasTitle}>Partidas</h1>


              {/* Em breve */}
              <div className={styles.inscricoesabertas}>
                <h1 className={styles['section-title']}>Em breve</h1>
                <div className={styles.grid}>
                  {[...Array(1)].map((_, i) => (
                    <a key={i} href="#" className={styles.card}>
                      <div className={styles['card-content']}>
                        <p className={styles.game}>Eliminatória 5</p>
                        <h2>TIME x VS TIME x</h2>
                        <p>01/02/2025 - 20:00</p>
                      </div>
                      <div className={styles['hover-label']}>EM BREVE</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Em andamento */}
              <div className={styles.emandamento}>
                <h1 className={styles['section-title']}>Em andamento</h1>
                <div className={styles.grid}>
                  {[...Array(1)].map((_, i) => (
                    <a key={i} href="https://www.twitch.tv" className={styles.card}>
                      <div className={styles['card-content']}>
                        <p className={styles.game}>Eliminatória 3</p>
                        <h2>TIME 3 VS TIME 2</h2>
                        <p>01/02/2025 - 20:00</p>
                      </div>
                      <div className={styles['hover-label']}>ASSISTIR</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Finalizados */}
              <div className={styles.finalizados}>
                <h1 className={styles['section-title']}>Finalizados</h1>
                <div className={styles.grid}>
                  {[...Array(1)].map((_, i) => (
                    <a key={i} href="placar" className={styles.card}>
                      <div className={styles['card-content']}>
                        <p className={styles.game}>Eliminatória 1</p>
                        <h2>TIME 1 VS TIME 2</h2>
                        <p>01/02/2025 - 20:00</p>
                        <p>winner: Equipe 2</p>
                      </div>
                      <div className={styles['hover-label']}>VER PLACAR</div>
                    </a>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </section>
      </main>
    </>
  );
}
