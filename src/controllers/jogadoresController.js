const Jogador = require('../models/Jogador');
const Usuario = require('../models/Usuario');
const Equipe = require('../models/Equipe');

module.exports = {
  async create(req, res) {
    try {
      const { usuario_id, equipe_id, apelido, riot_id, tag_line, posicao } = req.body;

      // valida se usuário existe
      const usuario = await Usuario.findByPk(usuario_id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // valida se equipe existe
      const equipe = await Equipe.findByPk(equipe_id);
      if (!equipe) {
        return res.status(404).json({ error: 'Equipe não encontrada' });
      }

      // verifica se já existe um jogador com este usuario_id
      const jogadorExistente = await Jogador.findOne({ 
        where: { usuario_id } 
      });
      
      if (jogadorExistente) {
        return res.status(400).json({
          error: 'Este usuário já está registrado como jogador. Você pode atualizar os dados do jogador existente.',
          jogador: jogadorExistente
        });
      }

      const novoJogador = await Jogador.create({
        usuario_id,
        equipe_id,
        apelido,
        riot_id,
        tag_line,
        posicao
      });

      return res.status(201).json({ message: 'Jogador criado com sucesso', jogador: novoJogador });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
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