const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/',authRouter);
mongoose
  .connect(`${process.env.DB_CONNECT}`)
  .then((result) => app.listen(process.env.PORT))
  .catch(err => console.error(err));
