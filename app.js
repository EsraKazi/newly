const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const authRouter = require('./routes/authRoutes');
const reservationRouter = require('./routes/reservationRoutes');

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/',authRouter);
app.use('/',reservationRouter);


mongoose
  .connect(`${process.env.DB_CONNECT}`)
  .then((result) => app.listen(process.env.PORT))
  .catch(err => console.error(err));
