const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usuarioController');

router.post('/', usersController.create);
router.get('/', usersController.list);
router.get('/:id', usersController.getById);

module.exports = router;