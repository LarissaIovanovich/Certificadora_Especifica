const express = require('express');
const router = express.Router();
const resultadosController = require('../controllers/resultadosController');

router.post('/', resultadosController.create);
router.get('/', resultadosController.list);
router.get('/:id', resultadosController.getById);

module.exports = router;