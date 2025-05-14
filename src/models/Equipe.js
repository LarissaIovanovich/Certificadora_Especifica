const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Equipe = sequelize.define('equipes', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  criado_por: { type: DataTypes.INTEGER }
}, { timestamps: false, tableName: 'equipes' });

module.exports = Equipe;