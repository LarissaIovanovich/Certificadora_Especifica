// Este arquivo exporta funções utilitárias que podem ser usadas em diferentes partes do projeto, como validações e formatações de dados.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const handleLogoUpload = (base64String, tag) => {
    const logoStoragePath = path.join(__dirname, '../public/img/equipe-logo');

    // cria diretório caso não exista
    if (!fs.existsSync(logoStoragePath)) {
        fs.mkdirSync(logoStoragePath, { recursive: true });
    }
    
    const matches = base64String.match(/^data:(image\/(png|jpeg|jpg));base64,(.+)$/);
    if (!matches) {
        throw new Error('Formato de imagem inválido. Esperado base64 com header data:image/*');
    }

    const mimeType = matches[1]; // Ex: image/png ou image/jpeg
    const ext = mimeType.split('/')[1];
    const base64Data = matches[3];

    const logoFileName = `${Date.now()}-${tag}.${ext}`;
    const logoFilePath = path.join(logoStoragePath, logoFileName);
    fs.writeFileSync(logoFilePath, base64Data, 'base64');

    return logoFileName;
}