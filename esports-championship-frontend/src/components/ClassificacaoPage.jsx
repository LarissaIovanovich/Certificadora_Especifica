import React from 'react';
import styles from './Partidas.module.css';

export default function PartidasPage() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>FÚRIA E-SPORTS</div>
        <ul className={styles.menu}>
          <li><a href="campeonatos.html">JOGOS</a></li>
        </ul>
      </nav>

      <main className={styles.mainContainer}>
        <section className={styles.formContainer}>
          <div className={styles.campeonatosContainer}>
            <aside className={styles.sidebar}>
              <h1>NOME DO CAMPEONATO</h1>
              <hr />
              <h3>Em andamento</h3>
            </aside>

            <main className={styles.mainContent}>
              <h2>Partidas</h2>

              <div className={styles.embreve}>
                <h1 className={styles.sectionTitle}>Em breve</h1>
                <div className={styles.grid}>
                  <a href="#" className={styles.card}>
                    <div className={styles.cardContent}>
                      <p className={styles.partida}>Eliminatória 01</p>
                      <h2>Time 01 VS Time 02</h2>
                      <p>01/02/2025 - 20:00</p>
                    </div>
                    <div className={styles.hoverLabel}>ASSISTIR</div>
                  </a>
                </div>
              </div>

              <div className={styles.finalizados}>
                <h1 className={styles.sectionTitle}>Finalizados</h1>
                <div className={styles.grid}>
                  <a href="Placar.html" className={styles.card}>
                    <div className={styles.cardContent}>
                      <p className={styles.partida}>Eliminatória 02</p>
                      <h2>Time 01 VS Time 02</h2>
                      <p>01/02/2025 - 20:00</p>
                      <p>winner: Equipe Furia</p>
                    </div>
                    <div className={styles.hoverLabel}>VER PLACAR</div>
                  </a>
                </div>
              </div>

            </main>
          </div>
        </section>
      </main>
    </>
  );
}
