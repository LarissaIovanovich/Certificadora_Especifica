const express = require('express');
const router = express.Router();
const torneioController = require('../controllers/torneioController');

router.post('/', torneioController.create);
router.get('/', torneioController.list);
router.get('/:id', torneioController.getById);

module.exports = router;