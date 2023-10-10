const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
require('dotenv').config();

const authRouter = require('./routes/authRoutes');
const reservationRouter = require('./routes/reservationRoutes');

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Use your routers after middleware setup
app.use('/', authRouter);
app.use('/', reservationRouter);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('newReservation', (reservation) => {
    console.log('Yeni rezervasyon alındı:', reservation);
    io.emit('newReservation', reservation); // Tüm bağlı istemcilere yeni rezervasyonu gönder
});

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Define emitReservationUpdate before the Socket.IO code
function emitReservationUpdate(reservation) {
  console.log('Reservation updated:', reservation); 
  io.emit('reservationUpdate', reservation);
}

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    server.listen(process.env.PORT);
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .catch((err) => console.error(err));

module.exports = { io, emitReservationUpdate };
