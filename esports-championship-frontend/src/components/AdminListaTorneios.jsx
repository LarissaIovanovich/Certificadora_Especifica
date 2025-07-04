import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import FuriaNav from './FuriaNav'; 
import styles from './AdminPages.module.css';

export default function AdminListaTorneios() {
    const [torneios, setTorneios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTorneios = async () => {
            try {
                setLoading(true);
                const response = await api.get('/torneios');
                setTorneios(response.data);
            } catch (err) {
                setError('Falha ao carregar a lista de torneios.');
            } finally {
                setLoading(false);
            }
        };
        fetchTorneios();
    }, []);

    if (loading) return (
        <>
            <FuriaNav />
            <div className={styles.adminContainer}>A carregar torneios...</div>
        </>
    );

    if (error) return (
        <>
            <FuriaNav />
            <div className={`${styles.adminContainer} ${styles.error}`}>{error}</div>
        </>
    );

    return (
        <>
            <FuriaNav />
            <div className={styles.adminContainer}>
                <div className={styles.header}>
                    <h1>Painel de Gerenciamento de Torneios</h1>
                    <Link to="/admin/criar-torneio" className={styles.createButton}>
                        Criar Torneio
                    </Link>
                </div>

                {torneios.length === 0 ? (
                    <p>Nenhum torneio cadastrado no momento.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome do Torneio</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {torneios.map((torneio) => (
                                <tr key={torneio.id}>
                                    <td>{torneio.id}</td>
                                    <td>{torneio.nome}</td>
                                    <td>{torneio.status}</td>
                                    <td>
                                        <Link to={`/admin/torneio/${torneio.id}`} className={styles.actionButton}>
                                            Gerenciar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
