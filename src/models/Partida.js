const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Partida = sequelize.define('partidas', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  torneio_id: { type: DataTypes.INTEGER },
  equipe_a_id: { type: DataTypes.INTEGER },
  equipe_b_id: { type: DataTypes.INTEGER },
  equipe_vencedora_id: { type: DataTypes.INTEGER },
  agendada_para: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING },
  pontuacao_a: { type: DataTypes.INTEGER },
  pontuacao_b: { type: DataTypes.INTEGER },
  mapa: { type: DataTypes.STRING }
}, { timestamps: false, tableName: 'partidas' });

module.exports = Partida;