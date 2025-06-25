const express = require('express');
const router = express.Router();
const equipesController = require('../controllers/equipesController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// --- Rotas PROTEGIDAS ---
router.post('/', authMiddleware, equipesController.create);
router.get('/invite-link', authMiddleware, requireRole(['organizador']), equipesController.listInvites);
router.post('/invite-link', authMiddleware, requireRole(['organizador']), equipesController.generateInviteLink);
router.delete('/invite-link', authMiddleware, requireRole(['organizador']), equipesController.deleteInviteLink);

// --- Rotas PÚBLICAS ---
router.get('/', equipesController.list);
router.get('/:id', equipesController.getById);

module.exports = router;