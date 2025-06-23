const app = require('./src/app');
const db = require('./src/models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }).then(() => {
  console.log('Conexão com o banco de dados e sincronia dos models bem-sucedida!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Erro na inicialização do servidor:', err);
});