const Jogador = require('../models/Jogador');
const Usuario = require('../models/Usuario');
const Equipe = require('../models/Equipe');
const Convite = require('../models/Convite');

module.exports = {
  async create(req, res) {
    try {
      const usuario_id = req.user.id;
      const { apelido, riot_id, tag_line, posicao } = req.body;

      // valida se usuário existe
      const usuario = await Usuario.findByPk(usuario_id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
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
        apelido,
        riot_id,
        tag_line,
        posicao
      });

      // Caso necessário, atualiza usuario.papel para 'jogador' (necessário para redirecionamento correto no frontend)
      if (usuario.papel !== 'jogador') {
        await usuario.update({ papel: 'jogador' });
      }

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
  },

  async edit(req, res) {
    try {
      const { id } = req.params;
      const { equipe_id, apelido, riot_id, tag_line, posicao } = req.body;

      let jogador = await Jogador.findByPk(id);
      if (!jogador) {
        return res.status(404).json({ error: 'Jogador não encontrado' });
      }

      if (equipe_id) {
        const equipe = await Equipe.findByPk(equipe_id);
        if (!equipe) {
          return res.status(404).json({ error: 'Equipe não encontrada' });
        }
      }

      jogador = await jogador.update({
        equipe_id: equipe_id || jogador.equipe_id,
        apelido: apelido || jogador.apelido,
        riot_id: riot_id || jogador.riot_id,
        tag_line: tag_line || jogador.tag_line,
        posicao: posicao || jogador.posicao
      });

      return res.json({ message: 'Jogador atualizado com sucesso', jogador });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  },

  async acceptInviteLink(req, res) {
    try {
      const { token } = req.params;

      const convite = await Convite.findOne({ where: { token, status: 'pendente' } });
      if (!convite) {
        return res.status(400).json({ error: 'Convite inválido ou já utilizado.' });
      }

      // Valida se equipe já tem 5 jogadores
      const jogadoresCount = await Jogador.count({ where: { equipe_id: convite.equipe_id } });
      if (jogadoresCount >= 5) {
        return res.status(400).json({ error: 'Equipe já possui 5 jogadores.' });
      }

      const usuarioId = req.user.id;
      let jogador = await Jogador.findOne({ where: { usuario_id: usuarioId } });
      if (!jogador) {
        return res.status(404).json({ error: 'Perfil de jogador não encontrado.' });
      }

      // atualiza equipe do jogador com o ID da equipe do convite
      jogador.equipe_id = convite.equipe_id;
      await jogador.save();

      // setta convite como aceito
      convite.status = 'aceito';
      await convite.save();

      // busca o perfil_jogador atualizado
      jogador = await Jogador.findOne({ where: { usuario_id: usuarioId } });

      return res.json({
        message: 'Convite aceito com sucesso!',
        equipe_id: convite.equipe_id,
        perfil_jogador: jogador.toJSON()
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao aceitar convite.' });
    }
  }
};