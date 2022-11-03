const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

app.use(express.json());

dotenv.config({ path: './config/.env' });

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
