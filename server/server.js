const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');
const toneAnalyzer = require('./helpers/toneAnalyzer');
const wordAnalyzer = require('./helpers/fillerWords');

const app = express();


app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));
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

app.post('/api/wordanalysis', (req, res) => {
  console.log('REQ.BODY:', req.body);
  var analysis = wordAnalyzer(req.body.data.text);
  console.log('speech analysis:', analysis);
  var test = {data:'this thing is this thing'}
  res.send(test);
});


module.exports = app;
