const { Torneio, Equipe, Jogador } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const torneio = await Torneio.create(req.body);
      res.status(201).json(torneio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const torneios = await Torneio.findAll();
      res.json(torneios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;

    
      const torneio = await Torneio.findByPk(id, {
        include: [{
          model: Equipe,
          as: 'equipes',
          through: { attributes: [] }, 
          include: [{
            model: Jogador,
            as: 'jogadores'
          }]
        }]
      });

      if (!torneio) {
        return res.status(404).json({ error: 'Não encontrado' });
      }
      res.json(torneio);
    } catch (err) {
      console.error("Erro detalhado no getById do torneio:", err);
      res.status(500).json({ error: 'Erro ao buscar torneio' });
    }
  }
};