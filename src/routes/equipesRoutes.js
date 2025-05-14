const express = require('express');
const router = express.Router();
const equipesController = require('../controllers/equipesController');

router.post('/', equipesController.create);
router.get('/', equipesController.list);
router.get('/:id', equipesController.getById);

module.exports = router;