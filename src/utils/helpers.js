// Este arquivo exporta funções utilitárias que podem ser usadas em diferentes partes do projeto, como validações e formatações de dados.

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
};