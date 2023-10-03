const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const socketIO = require('socket.io');

const authRouter = require('./routes/authRoutes');
const reservationRouter = require('./routes/reservationRoutes');

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/',authRouter);
app.use('/',reservationRouter);

require('./middleware/setInterval');


mongoose
  .connect(`${process.env.DB_CONNECT}`)
  .then((result) => {
    // Express sunucusunu Socket.io ile başlatın
    const server = require('http').createServer(app);
    const io = socketIO(server);

    // Socket.io ile ilgili işlemleri burada gerçekleştirin
    io.on('connection', (socket) => {
      console.log('Kullanıcı bağlandı.');

      socket.on('message', (data) => {
        console.log('Gelen mesaj:', data);
        // Gelen mesajı işleme kodunu burada ekleyin
      });

      socket.on('disconnect', () => {
        console.log('Kullanıcı bağlantıyı kesti.');
      });
    });

    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));