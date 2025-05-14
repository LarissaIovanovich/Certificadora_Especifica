const Usuario = require('../models/Usuario');

module.exports = {

  async create(req, res) {
    try {
     
      const usuario = await Usuario.create(req.body);
     
      res.status(201).json(usuario);
    } catch (err) {
     
      res.status(400).json({ error: err.message });
    }
  },


  async list(req, res) {
    try {
     
      const usuarios = await Usuario.findAll();
    
      res.json(usuarios);
    } catch (err) {
      
      res.status(500).json({ error: err.message });
    }
  },

  // Busca um usuário pelo ID
  async getById(req, res) {
    try {
      // Busca o usuário pelo ID passado como parâmetro na URL
      const usuario = await Usuario.findByPk(req.params.id);
      // Se não encontrar, retorna status 404 (Not Found)
      if (!usuario) return res.status(404).json({ error: 'Não encontrado' });
      // Retorna o usuário encontrado
      res.json(usuario);
    } catch (err) {
      // Em caso de erro, retorna status 500 (Internal Server Error) e a mensagem de erro
      res.status(500).json({ error: err.message });
    }
  }
};