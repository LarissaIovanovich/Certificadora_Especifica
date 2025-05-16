const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usuarioController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

router.post('/', usersController.create);
router.post('/auth', usersController.login);
router.get('/', authMiddleware, requireRole(['admin', 'organizador']), usersController.list);
router.get('/:id', authMiddleware, requireRole(['admin', 'organizador']), usersController.getById);

module.exports = router;