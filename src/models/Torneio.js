const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Torneio = sequelize.define('Torneio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  formato: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  premiacao: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  url_imagem_banner: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  data_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  data_fim: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  criado_por: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Não definido'
  }
}, {
  tableName: 'torneios',
  timestamps: false
});

// --- AJUSTE FEITO AQUI ---
Torneio.associate = (models) => {
  // Relação Muitos-para-Muitos: Um torneio tem muitas equipes participantes
  Torneio.belongsToMany(models.Equipe, {
    // A propriedade 'through' agora é um objeto para podermos passar mais opções
    through: {
      model: 'torneio_equipes',
      timestamps: false
    },
    foreignKey: 'torneio_id',
    as: 'equipes'
  });

  // Relação 1-para-Muitos: Um torneio tem muitas partidas
  Torneio.hasMany(models.Partida, {
    foreignKey: 'torneio_id',
    as: 'partidas'
  });

  // Relação 1-para-1: Um torneio pertence a um usuário criador
  Torneio.belongsTo(models.Usuario, {
    foreignKey: 'criado_por',
    as: 'criador'
  });
};

module.exports = Torneio;