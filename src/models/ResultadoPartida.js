const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ResultadoPartida = sequelize.define('resultados_partida', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  partida_id: { type: DataTypes.INTEGER },
  jogador_id: { type: DataTypes.INTEGER },
  abates: { type: DataTypes.INTEGER },
  mortes: { type: DataTypes.INTEGER },
  assistencias: { type: DataTypes.INTEGER },
  agente_usado: { type: DataTypes.STRING },
  mvp: { type: DataTypes.BOOLEAN }
}, { timestamps: false, tableName: 'resultados_partida' });

module.exports = ResultadoPartida;