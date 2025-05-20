const express = require('express');
const router = express.Router();
const jogadoresController = require('../controllers/jogadoresController');

router.post('/', jogadoresController.create);
router.get('/', jogadoresController.list);
router.put('/:id', jogadoresController.edit);
router.get('/:id', jogadoresController.getById);

module.exports = router;