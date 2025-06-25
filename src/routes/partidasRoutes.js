const express = require('express');
const router = express.Router();
const partidasController = require('../controllers/partidasController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// --- ROTAS PÚBLICAS ---
// Qualquer pessoa pode ver a lista de partidas e os detalhes de uma partida específica.
router.get('/', partidasController.list);
router.get('/:id/relatorio', partidasController.getRelatorioPartida);
router.get('/:id', partidasController.getById);

// Rota para o público ver o placar/resultado final de uma partida.
// (Adicionando agora para já deixar pronto para o frontend)
router.get('/:id/resultado', partidasController.getResultado);


// --- ROTAS PROTEGIDAS (ADMIN) ---
// Apenas administradores podem criar uma nova partida.
router.post(
    '/',
    authMiddleware,
    requireRole(['admin']),
    partidasController.create
);

// Apenas administradores podem registrar o resultado de uma partida existente.
router.post(
    '/:id/resultado',
    authMiddleware,
    requireRole(['admin']),
    partidasController.registrarResultado
);

module.exports = router;