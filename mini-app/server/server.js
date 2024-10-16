const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./models');
const User = require('./models/user');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

sequelize.sync().then(() => {
  console.log('База данных синхронизирована');
});

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

