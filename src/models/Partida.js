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
    allowNull: false, // Uma partida deve pertencer a um torneio
    references: {
      model: 'torneios',
      key: 'id'
    }
  },
  equipe_a_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Partida deve ter uma equipe A
    references: {
      model: 'equipes',
      key: 'id'
    }
  },
  equipe_b_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Partida deve ter uma equipe B
    references: {
      model: 'equipes',
      key: 'id'
    }
  },
  equipe_vencedora_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Pode ser nulo até a partida acabar
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

// 3. Definição das associações
Partida.associate = (models) => {
  // Uma partida pertence a um torneio
  Partida.belongsTo(models.Torneio, {
    foreignKey: 'torneio_id',
    as: 'torneio'
  });

  // Múltiplas associações com a mesma tabela Equipe, usando apelidos (as)
  Partida.belongsTo(models.Equipe, {
    foreignKey: 'equipe_a_id',
    as: 'equipeA' // nome para a equipe A
  });

  Partida.belongsTo(models.Equipe, {
    foreignKey: 'equipe_b_id',
    as: 'equipeB' // nome para a equipe B
  });

  Partida.belongsTo(models.Equipe, {
    foreignKey: 'equipe_vencedora_id',
    as: 'vencedor' // nome para a equipe vencedora
  });
  
 
  Partida.hasOne(models.ResultadoPartida, { 
    foreignKey: 'partida_id',
    as: 'resultado'
  });
};


module.exports = Partida;