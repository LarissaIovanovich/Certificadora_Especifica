const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  async create(req, res) {
    try {
      const { senha_hash, ...userdata } = req.body;

      if (senha_hash.length < 8) return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' });

      // gera hash
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha_hash, salt);
      const usuario = await Usuario.create({ ...userdata, senha_hash: senhaHash });

      res.status(201).json(usuario);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          error: 'Email ou nome de usuário já existe'
        });
      }
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
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

      const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);
      if (!isPasswordValid) return res.status(401).json({ error: 'Senha inválida' });

      // gera o token JWT
      const token = jwt.sign({ usuarioID: usuario }, process.env.JWT_SECRET, { expiresIn: "7d" });

      return res.json({ message: "Autenticado com sucesso", token });
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: err.message });
    }
  }
};