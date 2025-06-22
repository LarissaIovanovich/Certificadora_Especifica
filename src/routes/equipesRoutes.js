const express = require('express');
const router = express.Router();

// 1. Importando o controller
const equipesController = require('../controllers/equipesController');


const { authMiddleware } = require('../middlewares/authMiddleware');


// --- Rota PROTEGIDA ---
// Apenas usuários logados podem criar uma equipe
router.post('/', authMiddleware, equipesController.create);


// --- Rotas PÚBLICAS ---
// Qualquer um pode ver a lista de equipes
router.get('/', equipesController.list);

// Qualquer um pode ver o perfil de uma equipe específica
router.get('/:id', equipesController.getById);


module.exports = router;