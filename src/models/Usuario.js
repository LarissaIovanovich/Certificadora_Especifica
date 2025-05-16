const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('usuarios', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome_usuario: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha_hash: { type: DataTypes.STRING, allowNull: false },
  papel: { type: DataTypes.STRING },
}, {
  timestamps: true,
  tableName: 'usuarios',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = Usuario;