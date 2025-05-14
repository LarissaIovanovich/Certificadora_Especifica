const Partida = require('../models/Partida');

module.exports = {
  async create(req, res) {
    try {
      const partida = await Partida.create(req.body);
      res.status(201).json(partida);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async list(req, res) {
    try {
      const partidas = await Partida.findAll();
      res.json(partidas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getById(req, res) {
    try {
      const partida = await Partida.findByPk(req.params.id);
      if (!partida) return res.status(404).json({ error: 'Não encontrado' });
      res.json(partida);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};