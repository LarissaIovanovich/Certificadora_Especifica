
const { Usuario } = require('../models');
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
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
      }

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas' }); // Mensagem genérica por segurança
      }

      const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' }); // Mensagem genérica por segurança
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: usuario.id, papel: usuario.papel, nome_usuario: usuario.nome_usuario }, // Payload com o nome do usuário
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Retorna o token e algumas informações úteis do usuário
      return res.json({
        message: "Autenticado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome_usuario: usuario.nome_usuario,
          email: usuario.email,
          papel: usuario.papel
        }
      });

    } catch (err) {
      console.error("Erro no login:", err)
      return res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
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
  }
};