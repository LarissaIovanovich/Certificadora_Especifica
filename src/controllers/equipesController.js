const Equipe = require('../models/equipe');

module.exports = {
  async create(req, res) {
    try {
        const { nome, tag, url_logo } = req.body;
        
        const equipe = await Equipe.create({
            nome,
            tag,
            url_logo,
            criado_por: req.user.id
        });

        res.status(201).json(equipe);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
  },
  async list(req, res) {
    try {
      const equipes = await Equipe.findAll();
      res.json(equipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getById(req, res) {
    try {
      const equipe = await Equipe.findByPk(req.params.id);
      if (!equipe) return res.status(404).json({ error: 'Não encontrado' });
      res.json(equipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};