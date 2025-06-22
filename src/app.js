const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// --- 1. Importação de Todas as Rotas ---

const usersRoutes = require('./routes/usersRoutes');
const equipesRoutes = require('./routes/equipesRoutes');
const jogadoresRoutes = require('./routes/jogadoresRoutes');
const partidasRoutes = require('./routes/partidasRoutes');
const torneiosRoutes = require('./routes/torneiosRoutes');
const resultadosRoutes = require('./routes/resultadosRoutes');

const app = express();

// --- 2. Middlewares Globais ---
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(bodyParser.json());
// Linha para servir imagens estáticas (como logos de times da pasta 'public')
app.use(express.static('public')); 


// --- 3. Rotas da API ---
app.use('/api/users', usersRoutes);
app.use('/api/equipes', equipesRoutes);
app.use('/api/jogadores', jogadoresRoutes);
app.use('/api/partidas', partidasRoutes);
app.use('/api/torneios', torneiosRoutes);
app.use('/api/resultados', resultadosRoutes);


// --- 4. Servir o Frontend 
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


module.exports = app;