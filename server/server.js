const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');
const toneAnalyzer = require('./helpers/toneAnalyzer');
const app = express();
const sequelize = require('../database/index.js').sequelize;
const User = require('../database/models/User.js');
const passport = require('passport');
const social = require('./passport/authRoute.js')(app, passport);


// app.use((req, res, next)=>{
//   if (req.user) {  
//   debugger;
//   }
//   next();
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));


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
