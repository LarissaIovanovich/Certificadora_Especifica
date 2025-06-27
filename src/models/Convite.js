const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Convite = sequelize.define('Convite', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'equipes',
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pendente', 'aceito'),
        defaultValue: 'pendente'
    },
}, {
    tableName: 'convites',
    timestamps: false
});

module.exports = Convite;