const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware');
const usersRoutes = require('./routes/usersRoutes');
const equipesRoutes = require('./routes/equipesRoutes');
const jogadoresRoutes = require('./routes/jogadoresRoutes');
const partidasRoutes = require('./routes/partidasRoutes');
const torneiosRoutes = require('./routes/torneiosRoutes');
const resultadosRoutes = require('./routes/resultadosRoutes');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
  }));
  
// Middleware
app.use(bodyParser.json());
// app.use(authMiddleware);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/equipes', equipesRoutes);
app.use('/api/jogadores', jogadoresRoutes);
app.use('/api/partidas', partidasRoutes);
app.use('/api/torneios', torneiosRoutes);
app.use('/api/resultados', resultadosRoutes);

module.exports = app;