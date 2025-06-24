const { Equipe, Jogador, sequelize } = require('../models');

module.exports = {
 
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { nome, tag, url_logo, jogadores } = req.body;
      if (!jogadores || jogadores.length === 0) {
        throw new Error("A equipe precisa de pelo menos um jogador.");
      }
      const novaEquipe = await Equipe.create({
        nome,
        tag,
        url_logo,
        criado_por: req.user ? req.user.id : null
      }, { transaction: t });

      const jogadoresParaCriar = jogadores.map(jogador => ({
        ...jogador,
        equipe_id: novaEquipe.id,
        tag_line: novaEquipe.tag,
        riot_id: `${jogador.apelido}#${novaEquipe.tag}`
      }));
      
      await Jogador.bulkCreate(jogadoresParaCriar, { transaction: t });
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
  }
};