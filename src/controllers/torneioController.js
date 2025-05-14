
const Torneio = require('../models/Torneio');

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
      
      const torneio = await Torneio.findByPk(req.params.id);
      
      if (!torneio) return res.status(404).json({ error: 'Não encontrado' });
      
      res.json(torneio);
    } catch (err) {
      
      res.status(500).json({ error: err.message });
    }
  }
};