const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS,GET,POST,PUT,PATCH,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type',
    'Authorization'
  );
  next();
});

const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');

dotenv.config({ path: './config/.env' });

app.use('/product', productRouter);
app.use('/auth', authRouter);

app.use((error, req, res, next) => {
  const data = error.data;
  const message = error.message;
  const status = error.status;
  res.status(status).json({ message: message, data: data });
  next();
});

mongoose
  .connect(process.env.MONGOURI)
  .then((result) => {
    app.listen(process.env.PORT, (req, res, next) => {
      console.log(`Server is Running At PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
