const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TorneioEquipe = sequelize.define('torneio_equipes', {
  torneio_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  equipe_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  status_inscricao: {
    type: DataTypes.STRING(50),
    allowNull: true,
  }
}, {
  tableName: 'torneio_equipes',
  timestamps: false,
});

module.exports = TorneioEquipe;