const express = require('express');
const router = express.Router();
const jogadoresController = require('../controllers/jogadoresController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // <-- 1. IMPORTE O MIDDLEWARE

// A rota de criação precisa ser protegida
router.post('/', authMiddleware, jogadoresController.create); // <-- 2. ADICIONE O MIDDLEWARE AQUI

router.get('/', jogadoresController.list);
router.put('/:id', jogadoresController.edit);
router.get('/:id', jogadoresController.getById);

module.exports = router;