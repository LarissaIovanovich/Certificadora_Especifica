const express = require('express');
const router = express.Router();
const partidasController = require('../controllers/partidasController');

router.post('/', partidasController.create);
router.get('/', partidasController.list);
router.get('/:id', partidasController.getById);

module.exports = router;