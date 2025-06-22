const { Jogador, Usuario } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const usuario_id = req.user.id;
      const { apelido, riot_id, tag_line, posicao } = req.body;


      // Verifica se este usuário já não tem um perfil de jogador cadastrado.
      const perfilExistente = await Jogador.findOne({ where: { usuario_id } });

      if (perfilExistente) {
        // Se ele já tem um perfil, retorna um erro claro.
        return res.status(400).json({ error: "Você já possui um perfil de jogador cadastrado." });
      }
      // --- FIM DA VALIDAÇÃO ---


      // Se não houver perfil, o código continua e cria um novo.
      const novoJogador = await Jogador.create({
        apelido,
        riot_id,
        tag_line,
        posicao,
        usuario_id: usuario_id
      });

      return res.status(201).json(novoJogador);

    } catch (err) {
      console.error("Erro ao criar perfil de jogador:", err);

      // Este catch ainda pode pegar um erro se o 'apelido' for uma chave UNIQUE no banco
      // e alguém tentar usar um já existente.
      if (err.name === 'SequelizeUniqueConstraintError') {
           return res.status(400).json({ error: "Este apelido já está em uso." });
      }

      return res.status(500).json({ error: "Ocorreu um erro ao salvar o perfil." });
    }
  },


  // ... podemos adicionar outros métodos aqui no futuro (listar, editar, etc.)
};