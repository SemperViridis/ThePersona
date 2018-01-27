const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

const app = express();

app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.get('/api/users', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
