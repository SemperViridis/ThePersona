const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');
const toneAnalyzer = require('./helpers/toneAnalyzer');

const app = express();


app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api/users', (req, res) => {
  res.sendStatus(200);
});

app.post('/api/ibmtone', (req, res) => {
  console.log('REQ.BODY.DATA.TEXT:', req.body.data.text);
  toneAnalyzer(req.body.data.text)
    .then((tone) => {
      console.log('Watson tone:', tone);
      res.send(tone);
    });
});

module.exports = app;
