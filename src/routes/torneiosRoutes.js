const express = require('express');
const router = express.Router();
const torneioController = require('../controllers/torneioController');

const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// --- ROTAS PÚBLICAS ---
// Qualquer visitante pode ver a lista de torneios e os detalhes de um torneio
router.get('/', torneioController.list);
router.get('/:id', torneioController.getById);

// --- ROTAS DE USUÁRIO LOGADO ---
// ADIÇÃO: Nova rota para um usuário logado inscrever uma equipe em um torneio
router.post(
    '/:id/inscrever-equipe',
    authMiddleware, // Protegida, requer que o usuário esteja logado
    torneioController.inscreverEquipe // Nova função no controller
);

// --- ROTAS PROTEGIDAS (ADMIN) ---
// Apenas um admin logado pode criar um novo torneio
router.post(
    '/', 
    authMiddleware, 
    requireRole(['admin']), 
    torneioController.create
);

// Rota para gerar o chaveamento de um torneio específico
router.post(
    '/:id/gerar-chaveamento',
    authMiddleware,
    requireRole(['admin']),
    torneioController.gerarChaveamento
);

// Rota para o admin atualizar o status do pagamento de uma inscrição
router.patch(
    '/:torneioId/inscricoes/:equipeId',
    authMiddleware,
    requireRole(['admin']),
    torneioController.atualizarStatusInscricao
);

module.exports = router;