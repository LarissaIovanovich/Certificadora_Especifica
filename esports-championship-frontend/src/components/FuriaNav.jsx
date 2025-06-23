import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './FuriaNav.module.css';
import furiaLogo from '../assets/furia-logo.png'; 

export default function FuriaNav() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className={styles.topNav}>
      <Link to="/" className={styles.logoLink}>
        <img src={furiaLogo} alt="Logo Fúria" className={styles.logoImage} />
      </Link>
      
      <div className={styles.navLinks}>
        <NavLink to="/campeonatos" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Campeonatos
        </NavLink>
        <NavLink to="/equipes" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Equipes
        </NavLink>

        {/* Link Condicional "Minha Equipe" */}
        {isAuthenticated && (
          <NavLink to="/minha-equipe" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            Minha Equipe
          </NavLink>
        )}

        {/* --- LINK CONDICIONAL PARA ADMIN --- */}
        {/* Este link só aparece se o usuário estiver logado E tiver o papel de 'admin' */}
        {isAuthenticated && user?.papel === 'admin' && (
          <NavLink to="/admin/torneios" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            Painel Admin
          </NavLink>
        )}
      </div>

      <div className={styles.authSection}>
        {isAuthenticated ? (
          <>
            <span className={styles.welcomeMessage}>Olá, {user?.nome_usuario}</span>
            <button onClick={logout} className={styles.authLink}>
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/sobre" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
              Sobre
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLink : styles.authLink}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}