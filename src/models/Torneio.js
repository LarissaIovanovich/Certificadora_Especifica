const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Torneio = sequelize.define('torneios', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING },
  descricao: { type: DataTypes.TEXT },
  formato: { type: DataTypes.STRING },
  data_inicio: { type: DataTypes.DATEONLY },
  data_fim: { type: DataTypes.DATEONLY },
  criado_por: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING }
}, { timestamps: false, tableName: 'torneios' });

module.exports = Torneio;