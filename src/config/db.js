require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados SQL foi bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados SQL:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };