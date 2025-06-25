const { Partida, ResultadoPartida, Jogador, Equipe, sequelize } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async create(req, res) {
    try {
      const partida = await Partida.create(req.body);
      res.status(201).json(partida);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const { equipe_id, torneio_id } = req.query;

      let where = {};
      if (equipe_id) {
        // Retorna partidas onde a equipe é 'A' OU 'B'
        where = {
          [Op.or]: [
            { equipe_a_id: equipe_id },
            { equipe_b_id: equipe_id }
          ]
        };
      }

      if (torneio_id) {
        where.torneio_id = torneio_id;
      }

      const partidas = await Partida.findAll({ where });
      return res.json(partidas);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const partida = await Partida.findByPk(req.params.id);
      if (!partida) return res.status(404).json({ error: 'Não encontrado' });
      res.json(partida);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Função para um admin registrar o resultado de uma partida
  async registrarResultado(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { pontuacao_a, pontuacao_b, equipe_vencedora_id, mapa, resultados_jogadores } = req.body;

      const partida = await Partida.findByPk(id, { transaction: t });
      if (!partida) {
        await t.rollback();
        return res.status(404).json({ error: 'Partida não encontrada.' });
      }

      partida.pontuacao_a = pontuacao_a;
      partida.pontuacao_b = pontuacao_b;
      partida.equipe_vencedora_id = equipe_vencedora_id;
      partida.mapa = mapa;
      partida.status = 'Finalizada';

      await partida.save({ transaction: t });

      await ResultadoPartida.destroy({ where: { partida_id: id }, transaction: t });

      const resultadosParaCriar = resultados_jogadores.map(resultado => ({
        ...resultado,
        partida_id: id
      }));

      await ResultadoPartida.bulkCreate(resultadosParaCriar, { transaction: t });

      await t.commit();
      res.status(200).json({ message: 'Resultado da partida registrado com sucesso.' });

    } catch (err) {
      await t.rollback();
      console.error("Erro ao registrar resultado:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao registrar o resultado da partida.' });
    }
  },

  // Função para buscar o resultado completo e público de uma partida
  async getResultado(req, res) {
    try {
      const { id } = req.params;
      const partida = await Partida.findByPk(id, {
        include: [
          { model: Equipe, as: 'equipeA' },
          { model: Equipe, as: 'equipeB' },
          {
            model: ResultadoPartida,
            as: 'resultados',
            include: [{ model: Jogador, as: 'jogador' }]
          }
        ]
      });

      if (!partida) {
        return res.status(404).json({ error: 'Resultado da partida não encontrado.' });
      }

      res.status(200).json(partida);

    } catch (err) {
      console.error("Erro ao buscar resultado:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o resultado da partida.' });
    }
  }
};