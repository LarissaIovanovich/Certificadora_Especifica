const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Partida = sequelize.define('Partida', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  torneio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'torneios',
      key: 'id'
    }
  },
  equipe_a_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'equipes',
      key: 'id'
    }
  },
  equipe_b_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'equipes',
      key: 'id'
    }
  },
  equipe_vencedora_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'equipes',
      key: 'id'
    }
  },
  agendada_para: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'agendada'
  },
  pontuacao_a: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pontuacao_b: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mapa: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'partidas', 
  timestamps: false
});

Partida.associate = (models) => {

  Partida.belongsTo(models.Torneio, {
    foreignKey: 'torneio_id',
    as: 'torneio'
  });

 
  Partida.belongsTo(models.Equipe, {
    foreignKey: 'equipe_a_id',
    as: 'equipeA'
  });

  Partida.belongsTo(models.Equipe, {
    foreignKey: 'equipe_b_id',
    as: 'equipeB'
  });

  Partida.belongsTo(models.Equipe, {
    foreignKey: 'equipe_vencedora_id',
    as: 'vencedor'
  });
  

  Partida.hasMany(models.ResultadoPartida, { 
    foreignKey: 'partida_id',
    as: 'resultados' 
  });
};

module.exports = Partida;
