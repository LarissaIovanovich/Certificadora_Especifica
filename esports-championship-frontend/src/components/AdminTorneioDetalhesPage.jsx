import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import FuriaNav from './FuriaNav';
import styles from './AdminPages.module.css';

export default function AdminTorneioDetalhesPage() {
    const { id: torneioId } = useParams();
    const [torneio, setTorneio] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchTorneio = useCallback(async () => {
        try {
        
            const response = await api.get(`/torneios/${torneioId}`); 
            setTorneio(response.data);
        } catch (err) {
            setError('Falha ao carregar os dados do torneio.');
            console.error(err);
        }
    }, [torneioId]); // A função será recriada se o torneioId mudar

    // 3. O useEffect agora apenas CHAMA a função fetchTorneio
    useEffect(() => {
        fetchTorneio();
    }, [fetchTorneio]); 

    const handleMarcarComoPago = async (equipeId) => {
        try {
            await api.patch(`/torneios/${torneio.id}/inscricoes/${equipeId}`, {
                status_inscricao: 'pago'
            });
            fetchTorneio(); 
        } catch (err) {
            alert('Falha ao atualizar status do pagamento.');
            console.error(err);
        }
    };
    
    const handleGerarChaveamento = async () => {
        const confirm = window.confirm('Você tem certeza que deseja gerar o chaveamento? Esta ação não pode ser desfeita.');
        if (!confirm) return;

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post(`/torneios/${torneioId}/gerar-chaveamento`);
            setSuccess(response.data.message || 'Chaveamento gerado com sucesso!');
            fetchTorneio(); // Também chama a função para recarregar os dados
        } catch (err) {
            setError(err.response?.data?.error || 'Ocorreu um erro.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!torneio) return (
        <>
            <FuriaNav />
            <div className={styles.adminContainer}>Carregando...</div>
        </>
    );

    const chaveamentoJaGerado = torneio.partidas && torneio.partidas.length > 0;

    return (
        <>
            <FuriaNav />
            <div className={styles.adminContainer}>
                <h1>Gerenciamento: {torneio.nome}</h1>
                
                <div className={styles.teamListSection}>
                    <h2>Equipes Inscritas ({torneio.equipes ? torneio.equipes.length : 0})</h2>
                    {torneio.equipes && torneio.equipes.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Equipe</th>
                                    <th>Status da Inscrição</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {torneio.equipes.map(equipe => (
                                    <tr key={equipe.id}>
                                        <td>{equipe.nome}</td>
                                        <td>
                                            <span style={{color: equipe.torneio_equipes?.status_inscricao === 'pago' ? 'limegreen' : 'orange'}}>
                                                {equipe.torneio_equipes?.status_inscricao || 'pendente'}
                                            </span>
                                        </td>
                                        <td>
                                            {equipe.torneio_equipes?.status_inscricao !== 'pago' && (
                                                <button onClick={() => {
                                                console.log('Dados da equipe no momento do clique:', equipe);
                                                console.log('ID que está sendo enviado:', equipe.id);
                                                handleMarcarComoPago(equipe.id);
                                            }}>
                                                Marcar como Pago
                                            </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>Nenhuma equipe inscrita neste torneio ainda.</p>}
                </div>

                <div className={styles.actionBox}>
                    <h3>Ações do Torneio</h3>
                    <button 
                        onClick={handleGerarChaveamento} 
                        disabled={isLoading || chaveamentoJaGerado}
                        className={styles.actionButton}
                    >
                        {isLoading ? 'Gerando...' : 'Gerar Chaveamento'}
                    </button>
                    
                    {chaveamentoJaGerado && <p className={`${styles.feedbackMessage} ${styles.success}`}>O chaveamento para este torneio já foi gerado.</p>}
                    {success && <p className={`${styles.feedbackMessage} ${styles.success}`}>{success}</p>}
                    {error && <p className={`${styles.feedbackMessage} ${styles.error}`}>Erro: {error}</p>}
                </div>
            </div>
        </>
    );
}