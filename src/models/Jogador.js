const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Jogador = sequelize.define('jogadores', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER },
  apelido: { type: DataTypes.STRING },
  riot_id: { type: DataTypes.STRING },
  tag_line: { type: DataTypes.STRING },
  equipe_id: { type: DataTypes.INTEGER },
  posicao: { type: DataTypes.STRING }
}, { timestamps: false, tableName: 'jogadores' });

module.exports = Jogador;