const { Usuario, Jogador, Equipe } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../utils/helpers');

module.exports = {
  // --- MÉTODO DE CADASTRO ---
  async register(req, res) { // 2. Renomeado de 'create' para 'register'
    try {
      //Recebendo 'senha' em texto puro
      const { nome_usuario, email, senha } = req.body;

      // Validações
      if (!nome_usuario || !email || !senha) {
        return res.status(400).json({ error: "Nome de usuário, e-mail e senha são obrigatórios." });
      }
      if (!helpers.validateEmail(email)) {
        return res.status(400).json({ error: 'Formato de e-mail inválido' });
      }
      if (senha.length < 8) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' });
      }

      // Verificar se o usuário já existe
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ error: "Este e-mail já está em uso." });
      }

      // 4. Criptografando a variável 'senha'
      const salt = await bcrypt.genSalt(10);
      const senha_hash = await bcrypt.hash(senha, salt);

      // Criar o usuário no banco de dados
      const novoUsuario = await Usuario.create({
        nome_usuario,
        email,
        senha_hash, // Salvando o hash, não a senha original
        papel: 'usuario'
      });

      // 5. Garantindo que o hash da senha não seja retornado na resposta
      novoUsuario.senha_hash = undefined;

      res.status(201).json({
        message: "Usuário criado com sucesso!",
        usuario: novoUsuario
      });

    } catch (err) {

      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email ou nome de usuário já existe' });
      }
      console.error("Erro no registro:", err);
      res.status(400).json({ error: "Ocorreu um erro ao registrar o usuário." });
    }
  },

  // --- MÉTODO DE LOGIN (JÁ ESTAVA ÓTIMO, APENAS POLIMENTO) ---
  async login(req, res) {
    try {
      console.log('\n--- NOVA TENTATIVA DE LOGIN ---'); // Separador para clareza

      // 1. O que o servidor está recebendo?
      console.log('Dados recebidos no corpo da requisição:', req.body);

      const { email, senha } = req.body;

      if (!email || !senha) {
        console.log('Erro: Email ou senha ausentes.');
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
      }

      // 2. Estamos buscando o usuário corretamente?
      console.log('Buscando usuário com o email:', email);
      const usuario = await Usuario.findOne({ where: { email } });

      // 3. O usuário foi encontrado? E qual é o hash dele?
      if (!usuario) {
        console.log('Resultado da busca: Usuário NÃO encontrado.');
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      console.log('Resultado da busca: Usuário encontrado.');
      // Usamos toJSON() para ver os dados puros do banco
      console.log('Dados do usuário:', usuario.toJSON());
      console.log('Hash da senha do banco:', usuario.senha_hash);

      // 4. A comparação da senha está funcionando?
      console.log('Comparando a senha fornecida com o hash do banco...');
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);
      console.log('O resultado da comparação (isPasswordValid) é:', isPasswordValid); // ESTE É O PONTO CHAVE

      if (!isPasswordValid) {
        console.log('Conclusão: Senha inválida.');
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      console.log('Conclusão: Senha VÁLIDA. Gerando token...');

      // Busca o perfil do jogador (caso necessário)
      let perfilJogador = null;
      if (usuario.dataValues.papel === 'jogador') {
        perfilJogador = await Jogador.findOne({ where: { usuario_id: usuario.id } });

        // Anexa perfilJogador ao usuário
        if (perfilJogador) usuario.perfil_jogador = perfilJogador;
      }

      let perfilOrganizador = null;
      if (usuario.dataValues.papel === 'organizador') {
        // busca a equipe criada por este usuário (1 para 1)
        perfilOrganizador = await usuario.getEquipe_criada();

        // Anexa perfilOrganizador ao usuário
        if (perfilOrganizador) usuario.perfil_organizador = perfilOrganizador;
      }

      // Gera o token JWT (sem alterações)
      const token = jwt.sign(
        { id: usuario.id, papel: usuario.papel, nome_usuario: usuario.nome_usuario },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Autenticado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome_usuario: usuario.nome_usuario,
          email: usuario.email,
          papel: usuario.papel,
          ...(perfilJogador && { perfil_jogador: perfilJogador.toJSON() }),
          ...(perfilOrganizador && { perfil_organizador: perfilOrganizador.toJSON() })
        }
      });
    } catch (err) {
      console.error("ERRO CRÍTICO NO LOGIN:", err)
      return res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
    }
  },

  async refreshToken(req, res) {
    try {
      const user = req.user;

      // Busca o usuário atualizado
      const usuario = await Usuario.findByPk(user.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Busca perfis se necessário
      let perfilJogador = null;
      if (usuario.papel === 'jogador') {
        perfilJogador = await Jogador.findOne({ where: { usuario_id: usuario.id } });
      }
      let perfilOrganizador = null;
      if (usuario.papel === 'organizador') {
        perfilOrganizador = await usuario.getEquipe_criada();
      }

      // Gera novo token
      const token = jwt.sign(
        { id: usuario.id, papel: usuario.papel, nome_usuario: usuario.nome_usuario },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Token renovado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome_usuario: usuario.nome_usuario,
          email: usuario.email,
          papel: usuario.papel,
          ...(perfilJogador && { perfil_jogador: perfilJogador.toJSON() }),
          ...(perfilOrganizador && { perfil_organizador: perfilOrganizador.toJSON() })
        }
      });
    } catch (err) {
      console.error("Erro ao renovar token:", err);
      return res.status(500).json({ error: "Erro ao renovar token." });
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

  async getById(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Não encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createProfile(req, res) {
    try {
      // 1. Pegar os dados do corpo da requisição
      const { apelido, riot_id, tag_line, posicao } = req.body;

      // 2. O ID do usuário vem do token JWT, que o nosso authMiddleware já validou
      // O middleware adiciona o objeto 'user' ao 'req'
      const usuario_id = req.user.id;

      // 3. (Opcional, mas recomendado) Verificar se este usuário já não tem um perfil
      const perfilExistente = await Jogador.findOne({ where: { usuario_id } });
      if (perfilExistente) {
        return res.status(400).json({ error: 'Este usuário já possui um perfil de jogador.' });
      }

      // 4. Criar o perfil do jogador no banco de dados
      const novoPerfil = await Jogador.create({
        apelido,
        riot_id: `${riot_id}#${tag_line}`, // Concatenando para salvar no formato completo
        tag_line,
        posicao,
        usuario_id // Associando o perfil ao usuário logado
      });

      // 5. Retornar uma resposta de sucesso
      return res.status(201).json(novoPerfil);

    } catch (err) {
      console.error("Erro ao criar perfil de jogador:", err);
      return res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
    }
  },

  async edit(req, res) {
    try {
      const usuarioId = req.user.id;
      const { nome_usuario, email, senha, papel } = req.body;
      const usuario = await Usuario.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (nome_usuario && nome_usuario != usuario.nome_usuario) {
        // valida nome_usuario
        const isNicknameTaken = await Usuario.findOne({ where: { nome_usuario } });

        if (isNicknameTaken) {
          return res.status(400).json({ error: "Este nome_usuario já está em uso." });
        }

        usuario.nome_usuario = nome_usuario;
      }

      if (email) {
        // valida e-mail
        if (!helpers.validateEmail(email)) {
          return res.status(400).json({ error: 'Formato de e-mail inválido' });
        }

        usuario.email = email;
      }

      if (senha) {
        // valida senha
        if (senha.length < 8) {
          return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' });
        }

        const salt = await bcrypt.genSalt(10);
        usuario.senha_hash = await bcrypt.hash(senha, salt);
      }

      if (papel && (!usuario.papel || usuario.papel === 'usuario') && (papel === 'jogador' || papel === 'organizador')) {
        // permite SOMENTE caso usuário não tenha papel definido (ou seja papel 'usuario') e mudança seja para 'jogador' ou 'organizador'
        usuario.papel = papel;
      }

      await usuario.save();

      // não retorna o hash da senha
      delete usuario.dataValues.senha_hash;

      return res.json({ message: 'Usuário atualizado com sucesso.', usuario });
    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      return res.status(500).json({ error: 'Erro ao editar usuário.' });
    }
  },
};