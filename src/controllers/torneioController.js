const { Torneio, Equipe, Jogador, Partida, sequelize } = require('../models');

// Função auxiliar para embaralhar o array de equipes.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {
  async create(req, res) {
    try {
      const torneio = await Torneio.create(req.body);
      res.status(201).json(torneio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const torneios = await Torneio.findAll();
      res.json(torneios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const torneio = await Torneio.findByPk(id, {
        include: [{
          model: Equipe,
          as: 'equipes',
          through: { attributes: ['status_inscricao'] }, 
          include: [{
            model: Jogador,
            as: 'jogadores'
          }]
        }]
      });

      if (!torneio) {
        return res.status(404).json({ error: 'Não encontrado' });
      }
      res.json(torneio);
    } catch (err) {
      console.error("Erro detalhado no getById do torneio:", err);
      res.status(500).json({ error: 'Erro ao buscar torneio' });
    }
  },

  async gerarChaveamento(req, res) {
    try {
        const { id: torneio_id } = req.params;

        const partidasExistentes = await Partida.count({ where: { torneio_id } });
        if (partidasExistentes > 0) {
            return res.status(400).json({ error: 'O chaveamento para este torneio já foi gerado.' });
        }

        const torneio = await Torneio.findByPk(torneio_id, {
            include: [{
                model: Equipe,
                as: 'equipes',
                attributes: ['id'],
                through: { attributes: ['status_inscricao'] }
            }]
        });
        
        if (!torneio) return res.status(404).json({ error: 'Torneio não encontrado.' });

        const equipesPagas = torneio.equipes.filter(
            (equipe) => equipe.torneio_equipes.status_inscricao === 'pago'
        );

        if (!equipesPagas || equipesPagas.length < 2) {
            return res.status(400).json({ error: 'Não há equipes com pagamento confirmado suficientes para gerar o chaveamento.' });
        }
        if (equipesPagas.length % 2 !== 0) {
            return res.status(400).json({ error: 'O número de equipes com pagamento confirmado deve ser par.' });
        }

        let equipesParaChaveamento = shuffleArray(equipesPagas);

        const partidasParaCriar = [];
        for (let i = 0; i < equipesParaChaveamento.length; i += 2) {
            partidasParaCriar.push({
                torneio_id: torneio_id,
                equipe_a_id: equipesParaChaveamento[i].id,
                equipe_b_id: equipesParaChaveamento[i + 1].id,
                status: 'Agendada',
            });
        }

        const novasPartidas = await Partida.bulkCreate(partidasParaCriar);

        return res.status(201).json({ 
            message: `Chaveamento gerado com sucesso para ${equipesParaChaveamento.length} equipes.`,
            partidas: novasPartidas
        });

    } catch (err) {
        console.error("Erro ao gerar chaveamento:", err);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao gerar o chaveamento.' });
    }
  },

  async atualizarStatusInscricao(req, res) {
    try {
        const { torneioId, equipeId } = req.params;
        const { status_inscricao } = req.body;

        const TorneioEquipes = sequelize.model('torneio_equipes');

        const [updatedRows] = await TorneioEquipes.update(
            { status_inscricao: status_inscricao },
            { where: { torneio_id: torneioId, equipe_id: equipeId } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Inscrição de equipe não encontrada neste torneio.' });
        }
        
        return res.status(200).json({ message: 'Status da inscrição atualizado com sucesso.' });
    } catch (err) {
        console.error("Erro ao atualizar status da inscrição:", err);
        return res.status(500).json({ error: 'Erro ao atualizar status da inscrição.' });
    }
  },

  // --- ADIÇÃO DA NOVA FUNÇÃO PARA INSCREVER UMA EQUIPE ---
  async inscreverEquipe(req, res) {
    try {
        const { id: torneio_id } = req.params;
        const { equipe_id } = req.body;

        if (!equipe_id) {
            return res.status(400).json({ error: 'O ID da equipe é obrigatório.' });
        }

        const torneio = await Torneio.findByPk(torneio_id);
        if (!torneio) {
            return res.status(404).json({ error: 'Torneio não encontrado.' });
        }

        const equipe = await Equipe.findByPk(equipe_id);
        if (!equipe) {
            return res.status(404).json({ error: 'Equipe não encontrada.' });
        }
        
        // O método 'addEquipe' vem da associação Many-to-Many definida nos modelos.
        await torneio.addEquipe(equipe);

        return res.status(201).json({ message: 'Equipe inscrita com sucesso no torneio!' });

    } catch (err) {
        // Trata erros, como uma equipe que já está inscrita.
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Esta equipe já está inscrita neste torneio.' });
        }
        console.error("Erro ao inscrever equipe:", err);
        return res.status(500).json({ error: 'Ocorreu um erro ao inscrever a equipe.' });
    }
  },
};