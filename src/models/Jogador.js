const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Jogador = sequelize.define('Jogador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Um jogador pode não estar vinculado a um usuário do sistema atualmente, isso será alterado posteriormente, vamos deixar assim para testes.
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  apelido: {
    type: DataTypes.STRING(100),
    allowNull: false // O apelido é obrigatório
  },
  riot_id: {
    type: DataTypes.STRING(100),
    allowNull: true 
  },
  tag_line: {
    type: DataTypes.STRING(10),
    allowNull: true 
  },
  equipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Um jogador pode ser criado inicialmente sem estar vinculado a uma equipe
    references: {
      model: 'equipes', 
      key: 'id'
    }
  },
  posicao: {
    type: DataTypes.STRING(50),
    allowNull: false // A posição é obrigatória
  }
}, {
  timestamps: false, 
  tableName: 'jogadores'
});

// --- ASSOCIAÇÃO ADICIONADA ---
// Define a relação entre Jogador e Equipe
Jogador.associate = (models) => {
  Jogador.belongsTo(models.Equipe, {
    foreignKey: 'equipe_id', // A chave estrangeira nesta tabela (jogadores)
    as: 'equipe' // Um apelido para a relação
  });

  // Também podemos definir a relação com o usuário
  Jogador.belongsTo(models.Usuario, { 
    foreignKey: 'usuario_id',
    as: 'usuario'
  });
};

module.exports = Jogador;