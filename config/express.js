/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const app = express();

module.exports = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/product', require('../core/routes/product.routes'));
  return app;
};
