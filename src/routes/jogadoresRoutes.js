const express = require('express');
const router = express.Router();
const jogadoresController = require('../controllers/jogadoresController');

router.post('/', jogadoresController.create);
router.get('/', jogadoresController.list);
router.get('/:id', jogadoresController.getById);

module.exports = router;