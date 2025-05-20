const express = require('express');
const router = express.Router();
const equipesController = require('../controllers/equipesController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, equipesController.create);
router.get('/', authMiddleware, equipesController.list);
router.get('/:id', authMiddleware, equipesController.getById);

module.exports = router;