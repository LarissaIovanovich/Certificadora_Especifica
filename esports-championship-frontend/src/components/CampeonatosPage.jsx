import styles from './Campeonatos.module.css';

export default function Campeonatos() {
  return (
    <>


      <main className={styles['main-container']}>
        <section className={styles['form-container']}>
          <div className={styles['campeonatos-container']}>
            <aside className={styles.sidebar}>
              <h2>FILTRAR ▼</h2>
              <div className={styles['filter-section']}>
                <h3>POR JOGO</h3>
                <ul>
                  <li><input type="checkbox" /> Valorant</li>
                  <li><input type="checkbox" /> League of Legends</li>
                  <li><input type="checkbox" /> Free Fire</li>
                  <li><input type="checkbox" /> Rocket League</li>
                </ul>
              </div>
              <div className={styles['filter-section']}>
                <h3>POR STATUS</h3>
                <ul>
                  <li><input type="checkbox" /> Inscrições Abertas</li>
                  <li><input type="checkbox" /> Em Andamento</li>
                  <li><input type="checkbox" /> Finalizados</li>
                </ul>
              </div>
            </aside>

            <main className={styles['main-content']}>
              <h1>CAMPEONATOS</h1>

              <div className={styles.inscricoesabertas}>
                <h1 className={styles['section-title']}>Inscrições Abertas</h1>
                <div className={styles.grid}>
                  {[...Array(4)].map((_, i) => (
                    <a key={i} href="Partidas" className={styles.card}>
                      <div className={styles['image-placeholder']}>
                        <img src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/aeddf86348891bd4bc12509db175d0cccb8b8c02-837x469.jpg" alt="LOL" />
                      </div>
                      <div className={styles['card-content']}>
                        <p className={styles.game}>League of Legends</p>
                        <h2>Nome do Campeonato</h2>
                        <p>01/02/2025 - 20:00</p>
                        <p>XX vagas restantes</p>
                      </div>
                      <div className={styles['hover-label']}>Informações</div>
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.emandamento}>
                <h1 className={styles['section-title']}>Em andamento</h1>
                <div className={styles.grid}>
                  <a href="Partidas" className={styles.card}>
                    <div className={styles['image-placeholder']}>
                      <img src="https://play-lh.googleusercontent.com/6llpraFcTI0rEUuRpWEG9NWWblvm106y5JXcDzu60ACuaUYDD3i70a-p9_QM65NsGDE" alt="FF" />
                    </div>
                    <div className={styles['card-content']}>
                      <p className={styles.game}>FreeFire</p>
                      <h2>Nome do Campeonato</h2>
                      <p>01/02/2025 - 20:00</p>
                    </div>
                    <div className={styles['hover-label']}>Informações</div>
                  </a>
                </div>
              </div>

              <div className={styles.finalizados}>
                <h1 className={styles['section-title']}>Finalizados</h1>
                <div className={styles.grid}>
                  {[...Array(3)].map((_, i) => (
                    <a key={i} href="Partidas" className={styles.card}>
                      <div className={styles['image-placeholder']}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9O8QM_WM3dUU_BpmlZccqc5fryAktZa9irwszRkVco7-jMXgplWbcZ-cjcI3F8__xj0&usqp=CAU" alt="VALORANT" />
                      </div>
                      <div className={styles['card-content']}>
                        <p className={styles.game}>Valorant</p>
                        <h2>Nome do Campeonato</h2>
                        <p>01/02/2025 - 20:00</p>
                        <p>winner: Equipe Furia</p>
                      </div>
                      <div className={styles['hover-label']}>Informações</div>
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
