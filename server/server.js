const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');
const toneAnalyzer = require('./helpers/toneAnalyzer');
const wordAnalyzer = require('./helpers/fillerWords').fillerWords;
const personalityInsight = require('./helpers/personalityInsight');
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
var checkAthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.get('/api/users', (req, res) => {
  res.sendStatus(200);
});

app.get('/api/dashboard', checkAthentication, (req, res) => {
  res.sendStatus(200);
});


app.get('/api/prompts', (req, res) => {
  const tag = req.query.tags;
  let query = { tags: tag };
  if (tag === 'all') {
    query = {};
  }
  db.getPrompts(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/api/ibmtone', (req, res) => {
  toneAnalyzer(req.body.data.text)
    .then((tone) => {
      res.send(tone);
    });
});

app.post('/api/wordanalysis', (req, res) => {
  wordAnalyzer(req.body.data.text, (analysis) => {
    res.send(JSON.stringify(analysis));
  }, req.body.data.fillers);
});

app.post('/api/insight', (req, res) => {
  personalityInsight(req.body.data.text)
    .then((personality) => {
      res.send(personality);
    });
});

app.post('/api/cloudinary', (req, res) => {
  console.log(req.body.video);
  res.end();
});

module.exports = app;
