const express = require('express');
const router = express.Router();
const jogadorController = require('../controllers/jogadorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota POST para criar um perfil de jogador.
// passamos o authMiddleware antes do controller.
// Isso garante que apenas usuários logados possam acessar esta rota.
router.post('/', authMiddleware, jogadorController.create);


// Rota GET para listar jogadores sem equipe (faremos no futuro)
// router.get('/sem-equipe', jogadorController.listFreeAgents);

module.exports = router;