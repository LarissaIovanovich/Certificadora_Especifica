const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const listEndpoints = require('express-list-endpoints')

// --- 1. Importação de Todas as Rotas ---
const usersRoutes = require('./routes/usersRoutes');
const equipesRoutes = require('./routes/equipesRoutes');
const jogadoresRoutes = require('./routes/jogadoresRoutes');
const partidasRoutes = require('./routes/partidasRoutes');
const torneiosRoutes = require('./routes/torneiosRoutes');
const resultadosRoutes = require('./routes/resultadosRoutes');

const app = express();

// Request logging
app.use(morgan('combined'));

// --- 2. Middlewares Globais ---
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Linha para servir imagens estáticas (como logos de times da pasta 'public')
app.use('/img', express.static(path.resolve(__dirname, "public/img")));

// --- 3. Rotas da API ---
app.use('/api/users', usersRoutes);
app.use('/api/equipes', equipesRoutes);
app.use('/api/jogadores', jogadoresRoutes);
app.use('/api/partidas', partidasRoutes);
app.use('/api/torneios', torneiosRoutes);
app.use('/api/resultados', resultadosRoutes);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

console.log('--- ROTAS REGISTRADAS NO EXPRESS ---');
console.log(listEndpoints(app));
console.log('------------------------------------');

// --- 4. Servir o Frontend 
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


module.exports = app;