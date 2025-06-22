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
    type: DataTypes.STRING(500), // Aumentado para acomodar URLs mais longas
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
    references: { // Adicionada a referência para a chave estrangeira
      model: 'usuarios',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Não definido' // Valor padrão para status
  }
}, {
  tableName: 'torneios',
  timestamps: false
});

// 2. Definição completa das associações
Torneio.associate = (models) => {
  // Relação Muitos-para-Muitos: Um torneio tem muitas equipes participantes
  Torneio.belongsToMany(models.Equipe, {
    through: 'torneio_equipes',
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