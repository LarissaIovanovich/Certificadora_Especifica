const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', { // 1. Nome do Model padronizado
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome_usuario: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true // Adiciona uma validação de formato de e-mail
    }
  },
  senha_hash: {
    type: DataTypes.STRING, // O tamanho pode variar, então não vou especificar 
    allowNull: false
  },
  papel: { 
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'usuario' // 2. Valor padrão para novos usuários
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

// 3. Definição das associações
Usuario.associate = (models) => {
  // Um Usuário pode ter um perfil de Jogador (1-para-1)
  Usuario.hasOne(models.Jogador, {
    foreignKey: 'usuario_id',
    as: 'perfil_jogador'
  });

// Um Usuário pode criar UMA Equipe (1-para-1)
Usuario.hasOne(models.Equipe, {
  foreignKey: 'criado_por',
  as: 'equipe_criada' // singular
});

  // Um Usuário pode criar vários Torneios (1-para-Muitos)
  Usuario.hasMany(models.Torneio, {
    foreignKey: 'criado_por',
    as: 'torneios_criados'
  });
};

module.exports = Usuario;