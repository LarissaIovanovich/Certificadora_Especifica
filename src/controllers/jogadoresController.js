const Jogador = require('../models/Jogador');

module.exports = {
  async create(req, res) {
    try {
      const jogador = await Jogador.create(req.body);
      res.status(201).json(jogador);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async list(req, res) {
    try {
      const jogadores = await Jogador.findAll();
      res.json(jogadores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getById(req, res) {
    try {
      const jogador = await Jogador.findByPk(req.params.id);
      if (!jogador) return res.status(404).json({ error: 'Não encontrado' });
      res.json(jogador);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};