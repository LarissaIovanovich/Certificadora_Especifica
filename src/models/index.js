const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');

const db = {};
const modelsDir = __dirname; 

// Lê todos os arquivos do diretório de models
fs.readdirSync(modelsDir)

  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')

  .forEach(file => {

    const model = require(path.join(modelsDir, file));

    db[model.name] = model;
  });

// Executa o método 'associate' de cada model, se ele existir
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona a instância do sequelize e o construtor ao objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta o objeto 'db' configurado
module.exports = db;