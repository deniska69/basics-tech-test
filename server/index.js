const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const usersRouter = require('./routes/users.routes');

const corsMiddleware = require('./middleware/cors.middleware');
const PORT = config.get('serverPort');
const URL_DB = config.get('dbUrl');

const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'));
app.use('/api', usersRouter);

const start = async () => {
  try {
    await mongoose.connect(URL_DB);

    app.listen(PORT, () => {
      console.log("\nBack-Сервер 'basics_tech_test' запущен [", new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }), '(МСК)]\nПорт: ', PORT, ' \n');

      var twirlTimer = (function () {
        var P = ['\\', '|', '/', '-'];
        var x = 0;
        return setInterval(function () {
          process.stdout.write('\r' + P[x++]);
          x &= 3;
        }, 250);
      })();
    });
  } catch (e) {}
};

start();
