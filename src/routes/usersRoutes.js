const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usuarioController');
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

// --- Rota de Cadastro Pública ---
// Caminho mais explícito. Chamará o método 'register' que criamos.
router.post('/register', usersController.register);

// --- Rota de Login Pública ---
// Caminho mais convencional. Chamará o método 'login' que faremos a seguir.
router.post('/login', usersController.login);

// --- Rotas Protegidas (sem alterações) ---
// Estas rotas para listar e buscar usuários continuam protegidas
router.get('/', authMiddleware, requireRole(['admin', 'organizador']), usersController.list);
router.get('/:id', authMiddleware, requireRole(['admin', 'organizador']), usersController.getById);
router.post('/profile', authMiddleware, usersController.createProfile);
router.put('/', authMiddleware, usersController.edit);

module.exports = router;