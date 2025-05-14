
const ResultadoPartida = require('../models/ResultadoPartida');

module.exports = {
  
  async create(req, res) {
    try {
     
      const resultado = await ResultadoPartida.create(req.body);
      
      res.status(201).json(resultado);
    } catch (err) {
      
      res.status(400).json({ error: err.message });
    }
  },


  async list(req, res) {
    try {
     
      const resultados = await ResultadoPartida.findAll();
      
      res.json(resultados);
    } catch (err) {
      
      res.status(500).json({ error: err.message });
    }
  },

 
  async getById(req, res) {
    try {
      
      const resultado = await ResultadoPartida.findByPk(req.params.id);
      
      if (!resultado) return res.status(404).json({ error: 'Não encontrado' });
      
      res.json(resultado);
    } catch (err) {
      
      res.status(500).json({ error: err.message });
    }
  }
};