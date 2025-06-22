const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Equipe = sequelize.define('Equipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tag: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  url_logo: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  criado_por: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true, // <<< AJUSTE 1: Garante a regra de 1 equipe por usuário
    references: { // <<< AJUSTE 2: Declara a chave estrangeira
      model: 'usuarios',
      key: 'id'
    }
  }
}, {
  tableName: 'equipes',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false
});

// --- ASSOCIAÇÃO COMPLETA ---
Equipe.associate = (models) => {
  // Relação 1-para-Muitos: Uma Equipe tem muitos Jogadores
  Equipe.hasMany(models.Jogador, {
    foreignKey: 'equipe_id',
    as: 'jogadores'
  });

  // Relação Muitos-para-Muitos: Uma Equipe pode estar em muitos Torneios
  Equipe.belongsToMany(models.Torneio, {
    through: 'torneio_equipes',
    foreignKey: 'equipe_id',
    as: 'torneios'
  });
  
  // Relação 1-para-1: Uma Equipe pertence a um Usuário criador
  Equipe.belongsTo(models.Usuario, {
    foreignKey: 'criado_por',
    as: 'criador'
  });
};

module.exports = Equipe;