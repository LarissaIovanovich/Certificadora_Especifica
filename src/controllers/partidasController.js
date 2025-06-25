const { Partida, ResultadoPartida, Jogador, Equipe, Torneio, sequelize } = require('../models');
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
      let include = [];

      if (equipe_id) {
        // Retorna partidas onde a equipe é 'A' OU 'B'
        where[Op.or] = [
          { equipe_a_id: equipe_id },
          { equipe_b_id: equipe_id }
        ];
        // Inclui dados das duas equipes
        include.push(
          { model: Equipe, as: 'equipeA', attributes: ['id', 'nome', 'tag', 'url_logo'] },
          { model: Equipe, as: 'equipeB', attributes: ['id', 'nome', 'tag', 'url_logo'] }
        );
      }

      if (torneio_id) {
        where.torneio_id = torneio_id;
        include.push(
          { model: Torneio, as: 'torneio', attributes: ['id', 'nome', 'data_inicio', 'data_fim', 'status'] }
        );
      }

      const partidas = await Partida.findAll({ where, include });
      return res.json(partidas);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getRelatorioPartida(req, res) {
    try {
      const { id } = req.params;

      // busca resultados da partida e inclui os jogadores
      const resultados = await ResultadoPartida.findAll({
        where: { partida_id: id },
        include: [{ model: Jogador, as: 'jogador', attributes: ['id', 'apelido', 'usuario_id'] }]
      });

      if (!resultados.length) {
        return res.status(404).json({ error: 'Nenhum resultado encontrado para esta partida.' });
      }

      // Calcula totais e MVP
      let totalAbates = 0, totalMortes = 0, totalAssistencias = 0;
      let mvp = null, maiorAbates = -1;
      const destaques = resultados.map(r => {
        totalAbates += r.abates;
        totalMortes += r.mortes;
        totalAssistencias += r.assistencias;
        if (r.mvp) mvp = r.jogador;
        if (r.abates > maiorAbates) maiorAbates = r.abates;
        return {
          jogador: r.jogador,
          abates: r.abates,
          mortes: r.mortes,
          assistencias: r.assistencias,
          agente_usado: r.agente_usado,
          mvp: r.mvp
        };
      });

      // Jogadores com mais abates (caso não tenha MVP marcado)
      const topFraggers = destaques.filter(d => d.abates === maiorAbates);

      res.json({
        partida_id: id,
        totalAbates,
        totalMortes,
        totalAssistencias,
        mvp: mvp || (topFraggers.length === 1 ? topFraggers[0].jogador : null),
        destaques,
        topFraggers: topFraggers.map(d => d.jogador)
      });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao gerar relatório da partida.' });
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