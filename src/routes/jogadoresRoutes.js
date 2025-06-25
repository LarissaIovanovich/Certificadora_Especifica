const express = require('express');
const router = express.Router();
const jogadoresController = require('../controllers/jogadoresController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// A rota de criação precisa ser protegida
router.post('/', authMiddleware, jogadoresController.create);
router.get('/', jogadoresController.list);
router.put('/:id', jogadoresController.edit);
router.get('/:id', jogadoresController.getById);
router.post('/accept-invite/:token', authMiddleware, requireRole(['jogador']), jogadoresController.acceptInviteLink);

module.exports = router;