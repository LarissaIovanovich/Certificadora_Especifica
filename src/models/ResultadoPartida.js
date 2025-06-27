const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ResultadoPartida = sequelize.define('ResultadoPartida', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  partida_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'partidas',
      key: 'id'
    }
  },
  jogador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jogadores',
      key: 'id'
    }
  },
  abates: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Por padrão, um jogador começa com 0 abates, assim como também tem os outros status zerados
  },
  mortes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  assistencias: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  agente_usado: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  mvp: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Por padrão, um jogador não é o MVP
  }
}, {
  tableName: 'resultados_partida', 
  timestamps: false
});

// 3. Definição das associações
ResultadoPartida.associate = (models) => {
  // Um resultado pertence a uma partida
  ResultadoPartida.belongsTo(models.Partida, {
    foreignKey: 'partida_id',
    as: 'partida'
  });

  // Um resultado pertence a um jogador
  ResultadoPartida.belongsTo(models.Jogador, {
    foreignKey: 'jogador_id',
    as: 'jogador'
  });
};

module.exports = ResultadoPartida;