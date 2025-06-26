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
        where[Op.or] = [
          { equipe_a_id: equipe_id },
          { equipe_b_id: equipe_id }
        ];
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

  
      const partida = await Partida.findByPk(id, {
        include: [
          { model: Equipe, as: 'equipeA' },
          { model: Equipe, as: 'equipeB' },
          {
            model: ResultadoPartida,
            as: 'resultados',
            include: [{
              model: Jogador,
              as: 'jogador'
            }]
          }
        ]
      });

      if (!partida || !partida.resultados) {
        return res.status(404).json({ error: 'Nenhum dado encontrado para esta partida.' });
      }

      const jogadoresEquipeA = partida.resultados
        .filter(r => r.jogador && r.jogador.equipe_id === partida.equipe_a_id)
        .map(r => ({
          jogador_id: r.jogador.id,
          nome: r.jogador.apelido,
          abates: r.abates,
          mortes: r.mortes,
          assistencias: r.assistencias,
          agente: r.agente_usado,
          mvp: Boolean(r.mvp)
        }));

      const jogadoresEquipeB = partida.resultados
        .filter(r => r.jogador && r.jogador.equipe_id === partida.equipe_b_id)
        .map(r => ({
          jogador_id: r.jogador.id,
          nome: r.jogador.apelido,
          abates: r.abates,
          mortes: r.mortes,
          assistencias: r.assistencias,
          agente: r.agente_usado,
          mvp: Boolean(r.mvp)
        }));

      
      const relatorioFinal = {
        partida_id: partida.id,
        mapa: partida.mapa,
        status: partida.status,
        agendada_para: partida.agendada_para,
        equipeA: {
          id: partida.equipeA.id,
          nome: partida.equipeA.nome,
          tag: partida.equipeA.tag,
          url_logo: partida.equipeA.url_logo,
          pontuacao: partida.pontuacao_a,
          jogadores: jogadoresEquipeA
        },
        equipeB: {
          id: partida.equipeB.id,
          nome: partida.equipeB.nome,
          tag: partida.equipeB.tag,
          url_logo: partida.equipeB.url_logo,
          pontuacao: partida.pontuacao_b,
          jogadores: jogadoresEquipeB
        }
      };

      res.status(200).json(relatorioFinal);

    } catch (err) {
      console.error("Erro ao gerar relatório da partida:", err);
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
