// em src/pages/ListaEquipesPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FuriaNav from '../components/FuriaNav';
import styles from './ListaEquipesPage.module.css';

export default function ListaEquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllEquipes() {
      try {
        setLoading(true);
        // Usamos a rota da API que lista todas as equipes
        const response = await fetch('/api/equipes');
        if (!response.ok) {
          throw new Error('Falha ao buscar equipes');
        }
        const data = await response.json();
        setEquipes(data);
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
        
        <div className={styles.equipesGrid}>
          {equipes.length > 0 ? (
            equipes.map(equipe => (
              <Link to={`/equipe/${equipe.id}`} key={equipe.id} className={styles.equipeCard}>
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