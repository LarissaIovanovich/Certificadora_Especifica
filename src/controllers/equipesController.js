const { Equipe, Jogador, Convite, sequelize } = require('../models');
const helpers = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { nome, tag, url_logo, jogadores } = req.body;

      // if (!jogadores || jogadores.length === 0) {
      //   throw new Error("A equipe precisa de pelo menos um jogador.");
      // }

      const logoFileName = helpers.handleLogoUpload(url_logo, tag);

      // Criação da equipe
      const novaEquipe = await Equipe.create({
        nome,
        tag,
        url_logo: `/img/equipe-logo/${logoFileName}`,
        criado_por: req.user ? req.user.id : null
      }, { transaction: t });

      // const jogadoresParaCriar = jogadores.map(jogador => ({
      //   ...jogador,
      //   equipe_id: novaEquipe.id,
      //   tag_line: novaEquipe.tag,
      //   riot_id: `${jogador.apelido}#${novaEquipe.tag}`
      // }));

      // await Jogador.bulkCreate(jogadoresParaCriar, { transaction: t });
      await t.commit();
      res.status(201).json(novaEquipe);
    } catch (err) {
      await t.rollback();
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
      const equipe = await Equipe.findByPk(req.params.id, {
        include: [{
          model: Jogador,
          as: 'jogadores'
        }]
      });

      if (!equipe) {
        return res.status(404).json({ error: 'Equipe não encontrada' });
      }
      res.json(equipe);

    } catch (err) {
      console.error(`Erro ao buscar equipe com ID ${req.params.id}:`, err);
      res.status(500).json({ error: err.message });
    }
  },

  async generateInviteLink(req, res) {
    try {
      // obtém equipe criada pelo usuário autenticado
      const equipe = await req.user.getEquipe_criada();

      if (!equipe) {
        return res.status(404).json({ error: 'Equipe não encontrada' });
      }

      // gera token único e cria convite
      const token = uuidv4();
      const convite = await Convite.create({
        equipe_id: equipe.dataValues.id,
        token,
        status: 'pendente'
      });

      const url = `/invite/${token}`;

      return res.json({ conviteId: convite.id, url });
    } catch (err) {
      console.error('Erro ao gerar convite:', err);
      return res.status(500).json({ error: 'Erro ao gerar convite' });
    }
  },

  async listInvites(req, res) {
    try {
      const equipe = await req.user.getEquipe_criada();

      if (!equipe) {
        return res.status(404).json({ error: 'Equipe não encontrada' });
      }

      const convites = await Convite.findAll({
        where: {
          equipe_id: equipe.id,
          status: 'pendente'
        }
      });

      return res.json(convites);
    } catch (err) {
      console.error('Erro ao listar convites:', err);
      return res.status(500).json({ error: 'Erro ao listar convites' });
    }
  },

  async deleteInviteLink(req, res) {
    try {
      const { conviteId } = req.body;

      if (!conviteId) {
        return res.status(400).json({ error: 'Convite ID é obrigatório' });
      }

      const equipe = await req.user.getEquipe_criada();

      if (!equipe) {
        return res.status(404).json({ error: 'Equipe não encontrada' });
      }

      const convite = await Convite.findByPk(conviteId);

      if (!convite) {
        return res.status(404).json({ error: 'Convite não encontrado' });
      }

      if (convite && convite.equipe_id !== equipe.id) {
        return res.status(403).json({ error: 'Você não tem permissão para deletar este convite' });
      }

      await convite.destroy();
      return res.json({ message: 'Convite deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar convite:', err);
      return res.status(500).json({ error: 'Erro ao deletar convite' });
    }
  }
};