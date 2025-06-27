import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FuriaNav from './FuriaNav';
import styles from './ListaEquipesPage.module.css';
import api from '../services/api';

export default function ListaEquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllEquipes() {
      try {
        setLoading(true);
        const response = await api.get('/equipes');
        setEquipes(response.data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllEquipes();
  }, []); 

  if (loading) {
    return <div className={styles.message}>Carregando equipes...</div>;
  }

  return (
    <>
      <FuriaNav />
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Equipes Cadastradas</h1>
        
        <div className={styles.equipesGrid} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', 
         maxHeight: '500px', 
         overflowY: 'auto',  
          }}>
          {equipes.length > 0 ? (
            equipes.map(equipe => (
              <Link to={`/equipe/${equipe.id}`} key={equipe.id} className={styles.equipeCard} style={{width: 180}}>
                <img src={equipe.url_logo} alt={`Logo ${equipe.nome}`} className={styles.equipeLogo} />
                <h2 className={styles.equipeName}>{equipe.nome}</h2>
                <span className={styles.equipeTag}>({equipe.tag})</span>
              </Link>
            ))
          ) : (
            <p className={styles.message}>Nenhuma equipe encontrada.</p>
          )}
        </div>
      </div>
    </>
  );
}